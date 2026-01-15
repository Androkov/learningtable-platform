/* ================================
   PDF.js worker (obrigatório)
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
   Inicializa PageFlip (mobile-first)
================================ */
const pageFlip = new St.PageFlip(container, {
  width: isMobile ? 360 : 480,
  height: isMobile ? 560 : 680,
  size: 'stretch',
  maxShadowOpacity: 0.25,
  showCover: true,
  mobileScrollSupport: false,
  useMouseEvents: true,
  swipeDistance: 30,
});

/* ================================
   Carrega PDF e renderiza páginas
================================ */
pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
  const pagePromises = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    pagePromises.push(
      pdf.getPage(i).then(page => {
        const viewport = page.getViewport({
          scale: isMobile ? 2.6 : 2.2
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

  Promise.all(pagePromises).then(canvases => {
    pageFlip.loadFromHTML(canvases);
  });
}).catch(err => {
  console.error('Erro ao carregar PDF:', err);
});
