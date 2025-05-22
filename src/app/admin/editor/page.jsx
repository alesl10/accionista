'use client';

import { useRef } from 'react';
import html2pdf from 'html2pdf.js';
// Asegúrate de que la ruta a tu archivo JSON sea correcta
import subseccion from '../../../data/noticiasReal.json'; 

// Limpieza de HTML si los títulos vienen con etiquetas
const cleanHTML = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

export default function Page() {
  const containerRef = useRef();

  const exportarPDF = () => {
    
    const opt = {
      margin: 0,
      filename: `diario_${new Date().toISOString().slice(0, 10)}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, logging: true, useCORS: true }, // Añadido logging y useCORS para depuración
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
      // pagebreak: { mode: ['css', 'legacy'] }, // Esto se usa si tienes elementos con 'page-break-before', etc.
      // Si el contenido es largo y quieres que html2pdf maneje los saltos de página automáticamente,
      // es mejor no tener una altura fija en el contenedor principal del PDF.
    };
    html2pdf().set(opt).from(containerRef.current).save();
  };

  // Asegúrate de que subseccion[1] y subseccion[1].noticias existan antes de renderizar
  const noticiasParaMostrar = subseccion[0]?.noticias || [];

  return (
    <div className="space-y-4 p-4 z-20">
      <button onClick={()=> exportarPDF()} className="bg-green-600 text-white px-4 py-2 rounded">
        Exportar como PDF
      </button>

      {/* IMPORTANTE: Se ha eliminado la altura fija (h-[1122px]) del div 'pdf-page'.
        Esto permite que el contenido se extienda a lo largo de varias páginas en el PDF si es necesario,
        y que html2pdf.js gestione los saltos de página automáticamente.
        Si deseas una sola página A4, deberás asegurarte de que todo el contenido quepa dentro de esa altura.
      */}
      <div
        ref={containerRef}
        className="pdf-page w-[793px]  p-6 border shadow text-sm bg-gray-200"
        style={{ fontFamily: 'serif' }} // 'serif' es una fuente genérica. Asegúrate de que 'font-rokkit' esté configurado en Tailwind.
      >
        {/* Encabezado */}
        <div className="flex gap-2 justify-center text-blue-900">
          <div className="flex flex-col justify-end -space-y-3 leading-none">
            <span className="font-semibold text-md">DIARIO</span>
            <div className="flex flex-col -space-y-4 leading-none">
              <h1 className="text-7xl font-black tracking-tighter" style={{ fontFamily: 'Rokkit, serif' }}>
                EL ACCIONISTA
              </h1>
              <span className="text-xs text-center max-w-full bg-blue-900 text-white px-2">
                JURISPRUDENCIA - DOCTRINA - LEGISLACION - IMPUESTOS - SOCIEDADES ANONIMAS
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center leading-none tracking-tighter -space-y-3">
            <p className="text-7xl text-blue-300 font-bold">80</p>
            <p className="text-2xl text-blue-300 font-bold">AÑOS</p>
          </div>
        </div>

        {/* Subencabezado */}
        <div className="flex justify-between w-full items-center border-y-2 border-blue-900 text-xs mt-4 py-1">
          <div className="text-[10px] flex flex-col">
            <span>Atención al público:</span>
            <span>San Martín 50 - 7ºp.-OF.146-CABA </span>
          </div>

          <div className="font-semibold">
            <span>Buenos Aires, jueves 22 de mayo de 2025</span>
          </div>

          <div>
            <span>AÑO LXXX - Nº 20.866</span>
          </div>
        </div>

        {/* Noticias en columnas */}
        <div
          className="mt-6 bg-gray-200 text-black"
          style={{
            columnCount: 3,
            columnGap: '2rem',
            // Es importante que el contenido dentro de este div no tenga alturas fijas
            // y que los elementos individuales (noticias) usen break-inside: avoid
          }}
        >
          {noticiasParaMostrar.map((n, i) => (
            <div
              key={i}
              style={{ breakInside: 'avoid', marginBottom: '1rem' }} // Asegura un margen inferior
              className="mb-4" // Tailwind mb-4 es 1rem, así que el style es redundante si usas Tailwind
            >
              <h2 className="font-bold">{cleanHTML(n.textoBreve)}</h2>
              <p className="text-xs text-justify whitespace-pre-wrap">{n.textoLargo}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
