import axios from './axios'
import type { Seccion } from '@/types/seccion'

export const getSeccion = async (): Promise<Seccion[]> => {
    try {
        const response = await axios.get('/seccion')
        return response.data
    } catch (error) {
        console.error(' No se obtuvieron las secciones')
        throw error
    }
}