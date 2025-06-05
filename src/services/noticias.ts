import axios from './axios'
import type { Noticia } from '@/types';

export const obtenerNoticiasPorFecha = async (fecha: string): Promise<Noticia[]> => {
    const res = await axios.get<Noticia[]>(`/publicacion/GetPublicacionesByFecha?fecha=${fecha}`);
    return res.data;
  };
  
  export const crearNoticia = async (noticia: any): Promise<Noticia> => {
    const res = await axios.post<Noticia>('/publicacion', noticia);
    return res.data;
  };
  
  export const actualizarNoticia = async (id: number, noticia: any) => {
    const res = await axios.put(`/publicacion`, noticia);
    return res.data;
  };