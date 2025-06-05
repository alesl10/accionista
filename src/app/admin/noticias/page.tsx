'use client';

import { useEffect, useState } from 'react';
import { FaRegCalendarAlt } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { agruparNoticias, NoticiaAgrupada } from '@/utils/index';
import { obtenerNoticiasPorFecha, crearNoticia, actualizarNoticia } from '@/services/noticias';
import { Noticia, SeccionSubseccion } from '@/types/noticia';
import { getSeccionSubseccion } from '@/services/seccion';
import DatePicker from 'react-multi-date-picker';

export default function EditorDashboard() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState<number | null>(null);
  const [seccionSubseccion, setSeccionSubseccion] = useState<SeccionSubseccion[]>([]);
  const [fechas, setFechas] = useState<any>([]);
  const [loadingNoticias, setLoadingNoticias] = useState(true);

  const { register, handleSubmit, reset, setValue } = useForm<any>({
    defaultValues: {
      textoBreve: '',
      textoLargo: '',
      textoAdicional: '',
      idSeccSubsec: 0,
    },
  });

  const cargarNoticias = async () => {
    setLoadingNoticias(true);
    try {
      const fechaHoy = new Date().toISOString().split('T')[0];
      const data = await obtenerNoticiasPorFecha(fechaHoy);
      const noticias: Noticia[] = data.map((item: any) => item.publicacion);
      setNoticias(noticias);
    } catch (error) {
      console.error('Error al cargar noticias:', error);
    } finally {
      setLoadingNoticias(false);
    }
  };

  const cargarSecciones = async () => {
    const data = await getSeccionSubseccion();
    setSeccionSubseccion(data);
  };

  useEffect(() => {
    cargarNoticias();
    cargarSecciones();
  }, []);

  const onSubmit = async (data: any) => {
    const fechasPublicacion = fechas.map((f: any) => ({
      id: 0,
      fecha_Publicacion: f.toDate().toISOString().split('T')[0],
    }));

    const payload = {
      ...data,
      fechasPublicacion,
    };

    try {
      if (editando && idEditando != null) {
        await actualizarNoticia(idEditando, payload);

        // Actualizar noticia en el estado local
        setNoticias((prevNoticias) =>
          prevNoticias.map((n) =>
            n.id === idEditando
              ? {
                ...n,
                ...data,
                subseccion: seccionSubseccion.find((s) => s.id === payload.idSeccSubsec)!,
                fechasPublicacion: fechas.map((f: any) => f.toDate()),
              }
              : n
          )
        );
      } else {
        const nuevaNoticia = await crearNoticia(payload);
        console.log(nuevaNoticia)

        
        // Agregar nueva noticia al estado local
        setNoticias((prevNoticias) => [
          ...prevNoticias,
          {
            ...nuevaNoticia,
            fechasPublicacion: fechas.map((f: any) => f.toDate()),
          },
        ]);
      }

      reset();
      setFechas([]);
      setEditando(false);
      setIdEditando(null);
    } catch (error) {
      console.error('Error al guardar noticia:', error);
    }
  };


  const handleEditar = (noticia: Noticia) => {
    reset({
      textoBreve: noticia.textoBreve,
      textoLargo: noticia.textoLargo,
      textoAdicional: noticia.textoAdicional,
      idSeccSubsec: noticia.subseccion.id,
    });

    setFechas(noticia.fechasPublicacion.map((f) => new Date(f)));
    setEditando(true);
    setIdEditando(noticia.id);
  };

  const noticiasAgrupadas: NoticiaAgrupada[] = agruparNoticias(noticias);

  return (
    <div className="flex w-full h-screen  gap-6">


      {/* Formulario a la izquierda */}
      <div className="w-1/2 p-4">
        <h2 className="text-xl font-bold mb-4">
          {editando ? 'Editar Noticia' : 'Agregar Noticia'}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input {...register('textoBreve')} className="border p-2 rounded" placeholder="Texto Breve" required />
          <textarea {...register('textoLargo')} className="border p-2 rounded" placeholder="Texto Largo" required />
          {/* <textarea {...register('textoAdicional')} className="border p-2 rounded" placeholder="Texto Adicional" /> */}

          <select
            {...register('idSeccSubsec', { valueAsNumber: true })}
            className="border p-2 rounded"
            required
          >
            <option value="">Seleccione Sección/Subsección</option>
            {seccionSubseccion.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nombreSeccion} / {s.nombreSubseccion}
              </option>
            ))}
          </select>
          <div>
            <label className="font-semibold mb-2 block">Fechas de Publicación</label>
            <DatePicker
              multiple
              value={fechas}
              onChange={setFechas}
              format="YYYY-MM-DD"
              render={(value, openCalendar) => (
                <div
                  className="flex items-start border border-gray-300 rounded px-3 py-2 cursor-pointer w-full bg-white"
                  onClick={openCalendar}
                >
                  <FaRegCalendarAlt className="text-gray-500 mr-3" />
                  <input
                    type="text"
                    value={value}
                    readOnly
                    className="flex-1 outline-none bg-transparent"
                    placeholder="Seleccionar fechas"
                  />
                </div>
              )}
            />
          </div>

          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              {editando ? 'Actualizar' : 'Agregar'}
            </button>

            {editando && (
              <button
                type="button"
                onClick={() => {
                  reset();
                  setFechas([]);
                  setEditando(false);
                  setIdEditando(null);
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancelar edición
              </button>
            )}
          </div>
        </form>
      </div>







      {/* Noticias a la derecha */}
      <div className="w-1/2 overflow-y-auto border-l p-4 bg-blue-700/20">
        <h2 className="text-xl font-bold mb-4 ">Noticias del día</h2>

        {loadingNoticias ? (
          <p className="text-center text-gray-500">Cargando noticias...</p>
        ) : noticiasAgrupadas.length === 0 ? (
          <p className="text-center text-gray-500">No hay noticias cargadas para hoy.</p>
        ) : (
          noticiasAgrupadas.map((grupo, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-semibold text-blue-700">
                {grupo.seccion} / {grupo.subseccion}
              </h3>
              {grupo.noticias.map((n) => (
                <div
                  key={n.id}
                  className="p-2 border rounded mb-2 bg-white group transition-all duration-300"
                >
                  <h4 className="font-medium">{n.textoBreve}</h4>
                  <p className="text-sm">{n.textoLargo}</p>

                  <div
                    className="flex justify-end opacity-0 transform translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                  >
                    <button
                      onClick={() => handleEditar(n)}
                      className="text-blue-500 mt-1 underline cursor-pointer"
                    >
                      Editar
                    </button>
                  </div>
                </div>

              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
