import type { RawNoticia, Noticia, Subseccion } from '../types/index'


// Limpieza de HTML
export const cleanHTML = (html: string) => html.replace(/<\/?[^>]+(>|$)/g, '');

export function agruparPorSubseccion(noticias: RawNoticia[]): Subseccion[] {
  const agrupado: Record<string, Noticia[]> = {};

  for (const n of noticias) {
    const nombre = n.subseccion.nombre;
    if (!agrupado[nombre]) agrupado[nombre] = [];
    agrupado[nombre].push({
      id: n.id,
      fecha: n.fecha,
      textoBreve: n.textoBreve,
      textoLargo: n.textoLargo
    });
  }

  return Object.entries(agrupado).map(([subseccion_nombre, noticias]) => ({
    subseccion_nombre,
    noticias,
  }));
}