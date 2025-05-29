// Tipos
export type Noticia = {
    id: string | number;
    fecha: string;
    textoBreve: string;
    textoLargo: string;
};

export type RawNoticia = Noticia & {
    subseccion: {
        id: number;
        nombre: string;
    };
};

export type Subseccion = {
    subseccion_nombre: string;
    noticias: Noticia[];
};
