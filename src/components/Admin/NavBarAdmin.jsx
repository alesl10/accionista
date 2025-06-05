'use client'

import { usePathname } from 'next/navigation'
import Link from "next/link";
import { MdDashboard, MdArticle, MdCampaign, MdPeople } from "react-icons/md";

const NavBarAdmin = () => {
  const pathname = usePathname();

  const linkClass = (href) =>
    `flex items-center gap-2 px-2 py-1 rounded cursor-pointer  hover:bg-blue-600/20 hover:text-blue-600 ${
      pathname === href ? 'bg-blue-100 text-blue-800 font-semibold' : ''
    }`;

  return (
    <aside className="w-64 bg-gray-200 text-primary p-4 shadow-lg flex flex-col">
    <h2 className="text-xl font-bold mb-6 border-b pb-2">Panel de Admin</h2>

    <nav className="flex flex-col gap-4 ">
      <Link href="/admin/secciones" className={linkClass('/admin/secciones')}>
        <MdDashboard />
        Gestor de Secciones
      </Link>
      <Link href="/admin/noticias" className={linkClass('/admin/noticias')}>
        <MdArticle />
        Gestor de Noticias
      </Link>
      <Link href="/admin/publicidad" className={linkClass('/admin/publicidad')}>
        <MdCampaign />
        Gestor de Publicidad
      </Link>
      <Link href="/admin/usuarios" className={linkClass('/admin/usuarios')}>
        <MdPeople />
        Gestor de Usuarios
      </Link>
    </nav>
    
    <Link href="/" className="text-lg w-full font-bold  ">
    <div className='w-full border-t pt-2'>
      Web principal
    </div>
    </Link>
  </aside>
  );
}

export default NavBarAdmin;