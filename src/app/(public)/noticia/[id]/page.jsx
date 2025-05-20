// app/(public)/noticia/[id]/page.tsx
import subsecciones from '../../../../data/noticiasReal.json';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function NoticiaDetails({ params }) {
  const resolvedParams = await params;
  // Combina todas las noticias de todas las subsecciones
  const todasLasNoticias = subsecciones.flatMap((s) => s.noticias || []);
  const noticia = todasLasNoticias.find((n) => String(n.id) === resolvedParams.id);

  if (!noticia) return notFound();

  const { textoLargo, textoBreve, resolucion } = noticia;
  const cleanTextoBreve = textoBreve?.replace(/<[^>]*>?/gm, '');

  return (
    <div className="col-span-8 bg-white/80 gap-2">
      <h4 className="w-full bg-[#0F4679] text-white p-1 text-xl rounded-md font-medium text-center shadow-md shadow-gray-600">
        {noticia.subseccion}
      </h4>

      <article className="w-full flex flex-col gap-3 m-auto text-shadow-md p-5">
        {cleanTextoBreve && (
          <p className="text-justify whitespace-pre-wrap font-semibold">{cleanTextoBreve}</p>
        )}
        {textoLargo && (
          <p className="text-justify whitespace-pre-wrap">{textoLargo}</p>
        )}

        <div className="w-full flex justify-between mt-4">
          <span className="text-sm text-gray-500">{resolucion}</span>
          <Link
            href="/"
            className="text-[#20609b] font-medium tracking-tight underline"
          >
            Volver
          </Link>
        </div>

        <div className="border-blue-950 border-b-4 w-3/6 m-auto mt-6"></div>
      </article>
    </div>
  );
}