const pdfUrl = '/ez2flip/engine/assets/sample.pdf';

const container = document.getElementById('flipbook');

const pageFlip = new St.PageFlip(container, {
  width: 400,
  height: 600,
  size: 'stretch',
  maxShadowOpacity: 0.5,
  showCover: true,
});

pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
  const pages = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    pages.push(
      pdf.getPage(i).then(page => {
        const viewport = page.getViewport({ scale: 1.5 });
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
