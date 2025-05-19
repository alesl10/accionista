'use client'

import { usePathname } from 'next/navigation'

const NavBarAdmin = () => {
  const pathname = usePathname();

  const linkClass = (href) =>
    `flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-blue-600/20 hover:text-blue-600 ${
      pathname === href ? 'bg-blue-100 text-blue-800 font-semibold' : ''
    }`;

  return (
    <aside className="flex flex-col gap-6">
      <nav className="flex flex-col px-2 text-[#0F4679] font-semibold text-lg">
     <a href="" className={linkClass('/publicaciones')}></a>
     <a href="" className={linkClass('/publicaciones')}></a>
     <a href="" className={linkClass('/publicaciones')}></a>   
     
      </nav>
    </aside>
  );
}

export default NavBarAdmin;