'use client';

import { useEffect, useRef, useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function EditorPDF() {
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);
  const [fabricClasses, setFabricClasses] = useState(null);

  useEffect(() => {
    async function loadFabric() {
      const fabricModule = await import('fabric');
      // Extraemos las clases que vamos a usar
      const { Canvas, Text, Textbox,  } = fabricModule;

      if (!canvasRef.current) return;

      const canvas = new Canvas(canvasRef.current, {
        width: 612,
        height: 1008,
        backgroundColor: '#fff',
      });

      setFabricCanvas(canvas);
      setFabricClasses({ Canvas, Text, Textbox });

      return () => {
        canvas.dispose();
      };
    }

    loadFabric();
  }, []);

  const renderizarEnCanvas = (data) => {
    if (!fabricCanvas || !fabricClasses) return;

    fabricCanvas.clear();

    const { Text, Textbox } = fabricClasses;

    const titulo = new Text(data.tituloDiario, {
      left: 50,
      top: 40,
      fontSize: 24,
      fontWeight: 'bold',
    });
    fabricCanvas.add(titulo);

    let y = 100;
    data.secciones.forEach((sec) => {
      const seccion = new Text(sec.nombre, {
        left: 50,
        top: y,
        fontSize: 18,
        underline: true,
      });
      fabricCanvas.add(seccion);
      y += 30;

      sec.noticias.forEach((noticia) => {
        const tituloNoticia = new Textbox(noticia.titulo, {
          left: 50,
          top: y,
          width: 500,
          fontSize: 16,
          fontWeight: 'bold',
        });
        fabricCanvas.add(tituloNoticia);
        y += 24;

        const cuerpo = new Textbox(noticia.cuerpo, {
          left: 50,
          top: y,
          width: 500,
          fontSize: 14,
        });
        fabricCanvas.add(cuerpo);
        y += cuerpo.getScaledHeight() + 20;
      });
    });

    fabricCanvas.renderAll();
  };

  const cargarJSON = () => {
    const datos = {
      tituloDiario: 'DIARIO EL ACCIONISTA',
      secciones: [
        {
          nombre: 'Sección 1',
          noticias: [
            {
              titulo: 'Noticia 1',
              cuerpo: 'Este es el cuerpo de la noticia 1.',
            },
            {
              titulo: 'Noticia 2',
              cuerpo: 'Este es el cuerpo de la noticia 2.',
            },
          ],
        },
      ],
    };
    renderizarEnCanvas(datos);
  };

  const exportarPDF = async () => {
    if (!fabricCanvas) return;
    const dataUrl = fabricCanvas.toDataURL({ format: 'png' });

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([612, 1008]);
    const pngImage = await pdfDoc.embedPng(dataUrl);
    const { width, height } = pngImage.scale(1);
    page.drawImage(pngImage, {
      x: 0,
      y: 0,
      width,
      height,
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'diario.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Editor de Diario PDF</h1>
      <div className="flex gap-4">
        <button onClick={cargarJSON} className="bg-blue-600 text-white px-4 py-2 rounded">
          Cargar JSON
        </button>
        <button onClick={exportarPDF} className="bg-green-600 text-white px-4 py-2 rounded">
          Exportar PDF
        </button>
      </div>
      <canvas ref={canvasRef} className="border border-gray-400" />
    </div>
  );
}
