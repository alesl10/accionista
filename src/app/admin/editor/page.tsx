'use client';

import { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';

type Noticia = {
  id: number;
  textoBreve: string;
  textoLargo: string;
  fecha: string;
  seccion: { id: number; nombre: string };
  subseccion: { id: number; nombre: string };
};

type SubseccionAgrupada = {
  subseccion_id: number;
  subseccion_nombre: string;
  noticias: Noticia[];
};

export default function DiarioEditor() {
  const [agrupadas, setAgrupadas] = useState<SubseccionAgrupada[]>([]);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obtenerNoticias = async () => {
      try {
        const res = await fetch('http://localhost:5079/api/publicacion/publicaciones/2025-02-06');
        const noticias: Noticia[] = await res.json();

        const agrupadasMap = new Map<number, SubseccionAgrupada>();
        for (const noticia of noticias) {
          const id = noticia.subseccion.id;
          const nombre = noticia.subseccion.nombre;
          if (!agrupadasMap.has(id)) {
            agrupadasMap.set(id, {
              subseccion_id: id,
              subseccion_nombre: nombre,
              noticias: [],
            });
          }
          agrupadasMap.get(id)?.noticias.push(noticia);
        }

        setAgrupadas(Array.from(agrupadasMap.values()));
      } catch (err) {
        console.error('Error cargando noticias:', err);
      }
    };
    obtenerNoticias();
  }, []);

  const generarPDF = async () => {
    const html = editorRef.current?.innerHTML;
    const res = await fetch('/api/generar-diario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html }),
    });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Vista previa editable del Diario</h1>

      <div
  ref={editorRef}
  contentEditable
  suppressContentEditableWarning
  className="bg-white text-black border p-10 overflow-auto"
  style={{
    fontFamily: 'serif',
    width: '216mm',
    height: '356mm',
    columnCount: 3,
    columnGap: '20px',
    lineHeight: '1.4',
  }}
>
  <div className="text-center mb-4" style={{ breakInside: 'avoid' }}>
    <h1 className="text-4xl font-bold">DIARIO EL ACCIONISTA</h1>
    <p className="text-sm mt-2">Fecha: {dayjs().format('DD/MM/YYYY')}</p>
    <p className="text-sm">Año LXXX - Nº 1245</p>
  </div>

  {agrupadas.map((sub) => (
    <div key={sub.subseccion_id} style={{ breakInside: 'avoid' }}>
      <h2 className="text-lg font-bold underline mb-2">{sub.subseccion_nombre}</h2>
      {sub.noticias.map((noticia) => (
        <div key={noticia.id} className="noticia mb-4" style={{ breakInside: 'avoid' }}>
          <div className="text-xs text-gray-600 mb-1">
            {dayjs(noticia.fecha).format('DD/MM/YYYY')}
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: noticia.textoBreve }}
            className="font-semibold mb-1"
          />
          <p>{noticia.textoLargo}</p>
        </div>
      ))}
    </div>
  ))}
</div>




      <button onClick={generarPDF} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Generar PDF
      </button>
    </div>
  );
}
