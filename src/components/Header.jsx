'use client'

import Link from "next/link";

const Header = () => {

  return (
    
    <div className="shadow-sm shadow-gray-600">
   
     <header className="w-full  flex justify-between items-center px-4 md:px-10 bgHeader text-gray-200 pb-1 relative">
        <div
          onClick={() => setViewMenu(!viewMenu)}
          className="bg-[#8EC5FF] rounded-xl px-2 cursor-pointer hover:saturate-50"
          role="button"
          aria-label="Toggle menu"
          >
        </div>

        {/* Título central */}
        <Link href={'/'}>
        <div className="flex gap-2 justify-end items-end">
          <div className="flex flex-col -space-y-3 leading-none">
            <span className="font-semibold text-md ">DIARIO</span>
            <div className='flex flex-col -space-y-5 leading-none items-center'>
              <h1 className="text-8xl font-black tracking-tighter font-rokkit  ">
                EL ACCIONISTA
              </h1>
              <span className="text-md text-center w-full  text-gray-200  font-semibold  ">
                JURISPRUDENCIA - DOCTRINA - LEGISLACION - IMPUESTOS - SOCIEDADES
                ANONIMAS
              </span>
            </div>
          </div>
          
          <div className="flex flex-col items-center leading-none tracking-tighter -space-y-3">
              <p className="text-8xl text-[#D4AF37] font-bold  ">80</p>
              <p className="text-3xl text-[#D4AF37] font-bold ">AÑOS</p>
          </div>
        </div>
        </Link>


        {/* Div vacío para mantener equilibrio visual */}
        <div className="w-[50px] md:w-[64px]">
       
        </div>
        <span className="text-base md:text-md absolute text-end bottom-0 right-2 font-semibold">
            AÑO: LXXX | Edición N° 20872
          </span>
      </header>
   
    </div>
  );
};

export default Header;