import type { Noticia, Subseccion } from '../types/index'


// Limpieza de HTML
export const cleanHTML = (html: string) => html.replace(/<\/?[^>]+(>|$)/g, '');

export type NoticiaAgrupada = {
  seccion: string;
  subseccion: string;
  noticias: Noticia[];
};

export function agruparNoticias(noticias: Noticia[]): NoticiaAgrupada[] {
  const mapa = new Map<string, NoticiaAgrupada>();

  for (const noticia of noticias) {
    const key = `${noticia.seccion.nombre}::${noticia.subseccion.nombre}`;

    if (!mapa.has(key)) {
      mapa.set(key, {
        seccion: noticia.seccion.nombre,
        subseccion: noticia.subseccion.nombre,
        noticias: [],
      });
    }

    mapa.get(key)!.noticias.push(noticia);
  }

  return Array.from(mapa.values()).sort((a, b) =>
    a.seccion.localeCompare(b.seccion) || a.subseccion.localeCompare(b.subseccion)
  );
}