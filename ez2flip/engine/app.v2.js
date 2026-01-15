/* ================================
   PDF.js worker
================================ */
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

/* ================================
   Configurações básicas
================================ */
const pdfUrl = './assets/sample.pdf';
const container = document.getElementById('flipbook');
const isMobile = window.innerWidth < 768;

/* ================================
   PageFlip (1 página por padrão)
================================ */
const pageFlip = new St.PageFlip(container, {
  width: isMobile ? 360 : 520,
  height: isMobile ? 560 : 740,
  size: 'stretch',
  maxShadowOpacity: 0.2,
  showCover: true,
  mobileScrollSupport: false,
  useMouseEvents: true,
  swipeDistance: 30,
});

/* ================================
   Renderização do PDF
================================ */
pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
  const pages = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    pages.push(
      pdf.getPage(i).then(page => {
        const viewport = page.getViewport({
          scale: isMobile ? 2.6 : 2.3
        });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        return page.render({
          canvasContext: context,
          viewport: viewport
        }).promise.then(() => canvas);
      })
    );
  }

  Promise.all(pages).then(canvases => {
    pageFlip.loadFromHTML(canvases);
  });
});

/* ================================
   Leitura imersiva
================================ */
const controls = document.getElementById('controls');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const backBtn = document.getElementById('backBtn');

let controlsVisible = false;

// Toggle controles ao tocar
container.addEventListener('click', () => {
  controlsVisible = !controlsVisible;
  controls.classList.toggle('hidden', !controlsVisible);
});

// Fullscreen
fullscreenBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// Voltar para biblioteca
backBtn.addEventListener('click', () => {
  window.location.href = '/learning-table/';
});
