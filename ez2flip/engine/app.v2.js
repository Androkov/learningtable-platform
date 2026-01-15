/* ================================
   PDF.js worker
================================ */
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

/* ================================
   Configuração
================================ */
const pdfUrl = './assets/sample.pdf';
const container = document.getElementById('flipbook');
const isMobile = window.innerWidth < 768;

/* ================================
   PageFlip — LEITOR REAL (não livro)
================================ */
const pageFlip = new St.PageFlip(container, {
  width: container.clientWidth,
  height: container.clientHeight,
  size: 'stretch',
  usePortrait: true,
  showCover: false,
  drawShadow: false,
  maxShadowOpacity: 0,
  mobileScrollSupport: false,
  swipeDistance: 20,
});

/* ================================
   Renderização do PDF (GRANDE)
================================ */
pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
  const pages = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    pages.push(
      pdf.getPage(i).then(page => {
        const viewport = page.getViewport({
          scale: isMobile ? 3.4 : 3.0   // 🔥 agora sim
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

let visible = false;

container.addEventListener('click', () => {
  visible = !visible;
  controls.classList.toggle('hidden', !visible);
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
