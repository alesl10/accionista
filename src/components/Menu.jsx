import { MdMenuOpen } from "react-icons/md";


const Menu = ({ viewMenu, setViewMenu }) => {
    return (
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transform ${
          viewMenu ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out border-r-2 border-gray-200`}
      >
        
        <div className="bg-[#0F4679] text-white pl-6 p-4 py-3 text-2xl font-semibold flex gap-4 items-center">
          Menú Principal
          <div className='cursor-pointer' onClick={()=> setViewMenu(!viewMenu)}>
            <MdMenuOpen className=" size-10 hover:text-gray-400"/>
          </div>
        </div>

        <nav className="flex flex-col px-2 text-[#0F4679] font-medium  text-lg">
          <a onClick={()=> console.log('Inicio')} className="hover:bg-blue-600/20  hover:text-blue-600 px-2 py-1 rounded cursor-pointer">Publicaciones</a>
          <a onClick={()=> console.log('Inicio')} className="hover:bg-blue-600/20  hover:text-blue-600 px-2 py-1 rounded cursor-pointer">Jurisprudencia</a>
          <a onClick={()=> console.log('Inicio')} className="hover:bg-blue-600/20  hover:text-blue-600 px-2 py-1 rounded cursor-pointer">Legislacion</a>
          <a onClick={()=> console.log('Inicio')} className="hover:bg-blue-600/20  hover:text-blue-600 px-2 py-1 rounded cursor-pointer">AFIP</a>
          <a onClick={()=> console.log('Inicio')} className="hover:bg-blue-600/20  hover:text-blue-600 px-2 py-1 rounded cursor-pointer">ANSES</a>
          <a onClick={()=> console.log('Inicio')} className="hover:bg-blue-600/20  hover:text-blue-600 px-2 py-1 rounded cursor-pointer">INAES</a>
          <a onClick={()=> console.log('Inicio')} className="hover:bg-blue-600/20  hover:text-blue-600 px-2 py-1 rounded cursor-pointer">IGJ</a>
          <a onClick={()=> console.log('Inicio')} className="hover:bg-blue-600/20  hover:text-blue-600 px-2 py-1 rounded cursor-pointer">C.N.V.</a>
          <a onClick={()=> console.log('Inicio')} className="hover:bg-blue-600/20  hover:text-blue-600 px-2 py-1 rounded cursor-pointer">Espacios Academicos</a>
          <a onClick={()=> console.log('Inicio')} className="hover:bg-blue-600/20  hover:text-blue-600 px-2 py-1 rounded cursor-pointer">Servicios</a>
      
        </nav>

      </aside>
    )
  }
  
  export default Menu