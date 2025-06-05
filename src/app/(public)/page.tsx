import NoticiaPreview from '../../components/Noticia';
import ArticuloAcademico from '../../components/ArticuloAcademico.jsx';
import { agruparNoticias } from '../../utils/index';
import type { Noticia } from '../../types/noticia';

export default async function Home({ searchParams }: { searchParams?: { fecha?: string } }) {
  const fecha = searchParams?.fecha || new Date().toISOString().split('T')[0];

  const res = await fetch(`http://localhost:5079/api/Publicacion/GetPublicacionesByFecha?fecha=${fecha}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Error al obtener las noticias');
  }

  const data = await res.json();

  // Extraer solo los objetos `publicacion`
  const noticias: Noticia[] = data.map((item: any) => item.publicacion);
  
  const agrupadas = agruparNoticias(noticias);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl flex flex-col gap-5">
        {agrupadas.map((grupo, i) => (
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

        <h4 className="text-center font-semibold text-2xl text-primary px-4 py-2 bg-blue-300/50 border border-primary m-auto shadow-md shadow-gray-600 rounded-lg">
          Artículos Académicos
        </h4>
        <div className="flex flex-wrap gap-5 justify-center mb-4">
          {[...Array(4)].map((_, i) => (
            <ArticuloAcademico
              key={i}
              link={'localhost'}
              titulo={'Apuntes sobre la firma en la mediación'}
              autor={'Dra. Viviana V. Gómez'}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
