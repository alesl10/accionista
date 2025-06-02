import NoticiaPreview from '../../components/Noticia';
import ArticuloAcademico from '../../components/ArticuloAcademico.jsx';
import { agruparPorSubseccion } from '../../utils/index';
import type { RawNoticia } from '../../types/index';


export default async function Home({ searchParams }: { searchParams: { fecha?: string } }) {
  const resolvedSearchParams = await searchParams;
  const fecha = resolvedSearchParams.fecha || new Date().toISOString().split('T')[0];
  
  // console.log(fecha)
  const res = await fetch(`http://localhost:5079/api/publicacion/publicaciones/${fecha}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Error al obtener las secciones');
  }

  const noticias: RawNoticia[] = await res.json();
  const subsecciones = agruparPorSubseccion(noticias);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl flex flex-col gap-5">
        {subsecciones.map((s) => (
          <div key={s.subseccion_nombre}>
            <h4 className="bg-secondary text-white p-2 text-xl rounded-md font-medium text-start shadow-md shadow-gray-600">
              {s.subseccion_nombre.toUpperCase()}
            </h4>

            {s.noticias.map((n) => (
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
        <div className="flex flex-wrap gap-5 justify-center mb-4 ">
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
