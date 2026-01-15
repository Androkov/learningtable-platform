pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

const pdfUrl = './assets/sample.pdf';
const viewer = document.getElementById('pdf-viewer');

pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
  for (let i = 1; i <= pdf.numPages; i++) {
    pdf.getPage(i).then(page => {
      const viewport = page.getViewport({ scale: 2.8 });
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

function goBack() {
  window.location.href = '/learning-table/';
}

function goFlip() {
  window.location.href = './flip.html';
}
