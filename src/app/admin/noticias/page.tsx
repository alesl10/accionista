'use client'

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    textoBreve: string,
    textoLargo: string,
    seccion: number,
    subseccion: number,
    diasPublicados: number
};

const secciones = [
    "Publicaciones",
    "Jurisprudencia",
    "Legislacion",
    "AFIP",
    "ANSES",
    "INAES",
    "IGJ",
    "C.N.V.",
    "Espacios Academicos",
    "Servicios"
];
const subsecciones = [
    "AGENCIA DE RECAUDACIÓN Y CONTROL ADUANERO",
    "COMISIÓN NACIONAL DE VALORES",
    "CONVOCATORIA A ASAMBLEA",
];

export default function NoticiaForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

    return (
        <div className=" mx-auto w-full container  p-8  ">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Crear Nueva Noticia</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div className="flex gap-4 w-full">

                    {/* Sección */}
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Sección
                        </label>
                        <select
                            {...register("seccion", { required: true })}
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                            defaultValue=""
                        >
                            <option value="" disabled>Seleccione una sección...</option>
                            {secciones.map((seccion, index) => (
                                <option key={index} value={index + 1}>{seccion}</option>
                            ))}
                        </select>
                    </div>

                    {/* Subsección */}
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Subsección
                        </label>
                        <select
                            {...register("seccion", { required: true })}
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                            defaultValue=""
                        >
                            <option value="" disabled>Seleccione una subsección...</option>
                            {subsecciones.map((subseccion, index) => (
                                <option key={index} value={index + 1}>{subseccion}</option>
                            ))}
                        </select>
                    </div>

                </div>






                {/* Texto Breve */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Título breve
                    </label>
                    <input
                        type="text"
                        placeholder="Ingrese un título corto..."
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("textoBreve", { required: true })}
                    />
                </div>

                {/* Texto Largo */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Texto largo
                    </label>
                    <textarea
                        rows={5}
                        placeholder="Escriba el cuerpo completo de la noticia..."
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("textoLargo", { required: true })}
                    />
                    {errors.textoLargo && (
                        <span className="text-red-500 text-sm">Este campo es obligatorio.</span>
                    )}
                </div>

                <div className="flex justify-between items-center gap-4">
                    <label className="flex items-center gap-2 text-md font-medium text-gray-700">
                        Días publicado:
                        <input
                            type="number"
                            min={1}
                            defaultValue={1}
                            className="w-20 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("diasPublicados", { required: true })}
                        />
                    </label>

                    <button
                        type="submit"
                        className="bg-blue-300 hover:bg-primary text-primary hover:text-white font-semibold py-2 px-4 rounded-md transition duration-200 cursor-pointer"
                    >
                        Guardar Noticia
                    </button>
                </div>
            </form>
        </div>
    );
}
