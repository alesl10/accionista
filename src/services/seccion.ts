import axios from './axios'
import type { Seccion } from '@/types/seccion'

export const getSeccion = async (): Promise<Seccion[]> => {
  try {
    const response = await axios.get<Seccion[]>('/seccion');
    return response.data;
  } catch (error) {
    console.error('No se obtuvieron las secciones', error);
    throw error;
  }
};