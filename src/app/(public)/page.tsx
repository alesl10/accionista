import NoticiaPreview from '../../components/Noticia';
import noticiasData from '../../data/noticiasReal.json';
import ArticuloAcademico from '../../components/ArticuloAcademico.jsx'
import { getSeccion } from '@/services/seccion';

// Tipos
type Noticia = {
  id: string | number;
  fecha: string;
  textoBreve: string;
  textoLargo: string;
};

type Subseccion = {
  subseccion_nombre: string;
  noticias: Noticia[];
};

// Limpieza de HTML
const cleanHTML = (html: string) => html.replace(/<\/?[^>]+(>|$)/g, '');

export default async function Home() {
  const subsecciones: Subseccion[] = noticiasData;
  const secciones = await getSeccion()
  console.log(secciones)


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
                  titulo={cleanHTML(n.textoBreve)}
                  cuerpo={n.textoLargo}
                  resolucion="Resolución General 5685/2025"
                />
                <div className="border-blue-950/60 border-b-1 mx-5 my-4" />
              </div>
            ))}
          </div>
        ))}

        <h4 className='text-center font-semibold text-2xl text-primary px-4 py-2 bg-blue-300/50 border border-primary m-auto shadow-md shadow-gray-600 rounded-lg'>Articulos Académicos</h4>
        <div className='flex flex-wrap gap-5  justify-center mb-4 '>
          <ArticuloAcademico link={'localhost'} titulo={'Apuntes sobre la firma en la mediación'} autor={'Dra. Viviana V. Gómez'} />
          <ArticuloAcademico link={'localhost'} titulo={'Apuntes sobre la firma en la mediación'} autor={'Dra. Viviana V. Gómez'} />
          <ArticuloAcademico link={'localhost'} titulo={'Apuntes sobre la firma en la mediación'} autor={'Dra. Viviana V. Gómez'} />
          <ArticuloAcademico link={'localhost'} titulo={'Apuntes sobre la firma en la mediación'} autor={'Dra. Viviana V. Gómez'} />
        </div>
      </div>

    </div>
  );
}
