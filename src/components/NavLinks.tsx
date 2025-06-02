// components/NavLinks.tsx (Client Component)
'use client';

import { useMemo } from 'react';
import {
  MdHome, MdDescription, MdGavel, MdLibraryBooks, MdBusiness, MdAccountBalance,
  MdPeople, MdHowToVote, MdVerifiedUser, MdSchool, MdBuild
} from 'react-icons/md';

export default function NavLinks({ currentPath }: { currentPath: string }) {
  const linkClass = (href: string) =>
    `flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-blue-600/20 hover:text-blue-600 ${
      currentPath === href ? 'bg-blue-100 text-blue-800 font-semibold' : ''
    }`;

  return (
    <nav className="flex flex-col px-2 text-[#0F4679] font-semibold text-lg">
      <a href="/" className={linkClass('/')}>
        <MdHome /> Inicio
      </a>
      <hr className="my-3 border-blue-200" />
      <a href="/publicaciones" className={linkClass('/publicaciones')}>
        <MdDescription /> Publicaciones
      </a>
      <a href="/jurisprudencia" className={linkClass('/jurisprudencia')}>
        <MdGavel /> Jurisprudencia
      </a>
      <a href="/legislacion" className={linkClass('/legislacion')}>
        <MdLibraryBooks /> Legislación
      </a>
      <hr className="my-3 border-blue-200" />
      <a href="/igj" className={linkClass('/igj')}>
        <MdBusiness /> IGJ
      </a>
      <a href="/afip" className={linkClass('/afip')}>
        <MdAccountBalance /> AFIP
      </a>
      <a href="/anses" className={linkClass('/anses')}>
        <MdPeople /> ANSES
      </a>
      <a href="/inaes" className={linkClass('/inaes')}>
        <MdHowToVote /> INAES
      </a>
      <a href="/cnv" className={linkClass('/cnv')}>
        <MdVerifiedUser /> C.N.V.
      </a>
      <hr className="my-3 border-blue-200" />
      <a href="/academicos" className={linkClass('/academicos')}>
        <MdSchool /> Espacios Académicos
      </a>
      <a href="/servicios" className={linkClass('/servicios')}>
        <MdBuild /> Servicios
      </a>
    </nav>
  );
}
