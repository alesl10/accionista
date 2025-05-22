'use client'

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

interface Usuario {
    name: string;
    password: string;
}

const Logueo = () => {
    const { register, reset } = useForm<Usuario>();
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem("usuario");
        if (storedUser) {
            setUsuario(JSON.parse(storedUser));
        }
    }, []);


    return (
        <div className="grow flex gap-2 bg-gray-100">
            <div className="p-2 grow">

                <div className="grow flex flex-col  h-full items-center justify-center">
                    <form className=" p-10 rounded-2xl border-2 border-blue-300  bg-primary flex flex-col items-center gap-2 text-primary shadow-md shadow-gray-600" >
                        <span className="font-semibold text-blue-300">Iniciar sesión</span>
                        <input className="bg-white text-yellow-950 rounded-md  px-2 py-1 w-full font-sans" type="text" placeholder="Usuario" {...register("name")} />
                        <input className="bg-white text-yellow-950 rounded-md  px-2 py-1 w-full font-sans" type="password" placeholder="Contraseña" {...register("password")} />
                        <button className=" cursor-pointer px-4 py-1 bg-green-700 text-white rounded-full mt-2 hover:bg-white hover:text-green-700 transition" type="submit">Ingresar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Logueo;