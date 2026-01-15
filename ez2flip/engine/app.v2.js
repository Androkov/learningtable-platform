/* ================================
   PDF.js worker
================================ */
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

/* ================================
   Configurações
================================ */
const pdfUrl = './assets/sample.pdf';
const container = document.getElementById('flipbook');
const isMobile = window.innerWidth < 768;

/* ================================
   PageFlip — SINGLE PAGE REAL
================================ */
const pageFlip = new St.PageFlip(container, {
  width: isMobile ? 380 : 600,
  height: isMobile ? 620 : 820,
  size: 'stretch',
  usePortrait: true,        // 🔑 força uma página
  showCover: false,
  maxShadowOpacity: 0.15,
  mobileScrollSupport: false,
  swipeDistance: 20,
  disableFlipByClick: false
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
          scale: isMobile ? 3.0 : 2.6   // 🔥 texto GRANDE
        });

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        return page.render({
          canvasContext: ctx,
          viewport
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

container.addEventListener('click', () => {
  controlsVisible = !controlsVisible;
  controls.classList.toggle('hidden', !controlsVisible);
});

fullscreenBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

backBtn.addEventListener('click', () => {
  window.location.href = '/learning-table/';
});
