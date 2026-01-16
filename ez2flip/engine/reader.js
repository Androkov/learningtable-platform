/* =========================
   PDF.js worker
========================= */
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

/* =========================
   Configuração
========================= */
const pdfUrl = './assets/sample.pdf';
const viewer = document.getElementById('pdf-viewer');

/* =========================
   Renderização contínua
========================= */
pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    pdf.getPage(pageNum).then(page => {
      const viewport = page.getViewport({ scale: 1.4 });

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      page.render({
        canvasContext: ctx,
        viewport
      });

      viewer.appendChild(canvas);
    });
  }
});

/* =========================
   Navegação
========================= */
function goBack() {
  window.location.href = '/learning-table/';
}
