import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { Loader2, AlertCircle } from 'lucide-react';

// Configure worker using CDN to avoid build issues in this environment
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist.${pdfjsLib.version}/build/pdf.worker.min.js`;

const PDFRenderer = ({ 
  pdfUrl, 
  pageNumber, 
  scale = 1.0, 
  onDocumentLoadSuccess, 
  onLoadError 
}) => {
  const canvasRef = useRef(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rendering, setRendering] = useState(false);
  const renderTaskRef = useRef(null);

  // Load PDF Document
  useEffect(() => {
    const loadPdf = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const doc = await loadingTask.promise;
        
        setPdfDoc(doc);
        setLoading(false);
        
        if (onDocumentLoadSuccess) {
          onDocumentLoadSuccess({ numPages: doc.numPages });
        }
      } catch (err) {
        console.error('Error loading PDF:', err);
        setError('Failed to load PDF document. Please check your connection or try again later.');
        setLoading(false);
        if (onLoadError) onLoadError(err);
      }
    };

    if (pdfUrl) {
      loadPdf();
    }
  }, [pdfUrl]);

  // Render Page
  useEffect(() => {
    const renderPage = async () => {
      if (!pdfDoc || !canvasRef.current) return;

      try {
        setRendering(true);

        // Cancel previous render task if it exists
        if (renderTaskRef.current) {
          await renderTaskRef.current.cancel().catch(() => {});
        }

        const page = await pdfDoc.getPage(pageNumber);
        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;

        await renderTask.promise;
        setRendering(false);
      } catch (err) {
        if (err.name !== 'RenderingCancelledException') {
          console.error('Error rendering page:', err);
          setError('Error rendering page.');
        }
        setRendering(false);
      }
    };

    renderPage();
  }, [pdfDoc, pageNumber, scale]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-amber-500" />
        <p>Loading document...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-red-500 p-6 text-center">
        <AlertCircle className="w-10 h-10 mb-4" />
        <p className="max-w-md">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center transition-opacity duration-200" style={{ opacity: rendering ? 0.7 : 1 }}>
      <canvas 
        ref={canvasRef} 
        className="shadow-lg rounded-lg bg-white max-w-full h-auto"
      />
    </div>
  );
};

export default PDFRenderer;
