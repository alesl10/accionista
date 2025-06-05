export type Seccion = {
    id: number;
    nombre: string;
  };
  
  export type Subseccion = {
    id: number;
    nombre: string;
  };
  
  export type Noticia = {
    id: number;
    textoBreve: string;
    textoLargo: string;
    textoAdicional: string;
    fecha: string;
    seccion: Seccion;
    subseccion: Subseccion;
    fechasPublicacion: string[];
  };

  export type SeccionSubseccion = {
    id: number;
    idSeccion:number;
    idSubSeccion:number;
    nombreSeccion:string;
    nombreSubseccion:string;
  }