import React from 'react';
import Link from 'next/link';

type NoticiaPreviewProps = {
    id: string | number;
    titulo: string;
    cuerpo: string;
    resolucion: string;
    fecha: string;
};

const NoticiaPreview: React.FC<NoticiaPreviewProps> = ({ id, titulo, cuerpo, resolucion, fecha }) => {
    const preview = cuerpo.length > 100 ? cuerpo.slice(0, 100) + '...' : cuerpo;

    return (
        <article className="w-full flex flex-col gap-2 m-auto text-shadow-md px-5 py-4">
            <p className="text-justify whitespace-pre-wrap font-semibold text-lg">{titulo}</p>
            <p className="text-justify whitespace-pre-wrap text-sm">{preview}</p>
            <div className="w-full flex justify-between">
                <span className="font-extralight text-gray-400">{resolucion}</span>
                <Link href={`/noticia/${id}`} className="text-[#20609b] font-semibold tracking-tighter">
                    Ver nota completa
                </Link>
            </div>
        </article>
    );
};

export default NoticiaPreview;