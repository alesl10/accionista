'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import NoticiaPreview from '../components/Noticia';
import type { Noticia } from '../types/noticia';
import { agruparNoticias } from '../utils/index';
import NoticiasSkeleton from './NoticiasSkeleton';

export default function ContenedorNoticias() {
  const searchParams = useSearchParams();
  const fechaParam = searchParams.get('fecha') || new Date().toISOString().split('T')[0];

  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNoticias() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `http://localhost:5079/api/Publicacion/GetPublicacionesByFecha?fecha=${fechaParam}`,
          { cache: 'no-store' }
        );
        if (!res.ok) throw new Error('Error al obtener las noticias');
        const data = await res.json();
        const noticiasData: Noticia[] = data.map((item: any) => item.publicacion);
        setNoticias(noticiasData);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchNoticias();
  }, [fechaParam]);

  if (loading) return <NoticiasSkeleton/>;
  if (error) return <div>Error: {error}</div>;

  const agrupadas = agruparNoticias(noticias);

  return (
    <div className="w-full flex flex-col gap-5 max-w-4xl mx-auto">
      {agrupadas.map((grupo) => (
        <div key={`${grupo.seccion}-${grupo.subseccion}`}>
          <h4 className="bg-secondary text-white p-2 text-xl rounded-md font-medium text-start shadow-md shadow-gray-600">
            {grupo.seccion.toUpperCase()} / {grupo.subseccion.toUpperCase()}
          </h4>

          {grupo.noticias.map((n) => (
            <div key={n.id}>
              <NoticiaPreview
                id={n.id}
                fecha={n.fecha}
                titulo={n.textoBreve}
                cuerpo={n.textoLargo}
                resolucion="Resolución General 5685/2025"
              />
              <div className="border-blue-950/60 border-b-1 mx-5 my-4" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}