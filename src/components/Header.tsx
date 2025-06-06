import Link from "next/link";
import { Rokkitt } from 'next/font/google'

const rookit = Rokkitt({
  subsets: ['latin'],
  weight: ['400', '700','900'],
  display: 'swap',
});

// Función para convertir números a romanos
function toRoman(num: number): string {
  const romanMap: [number, string][] = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ];
  let result = '';
  for (const [value, numeral] of romanMap) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }
  return result;
}

const Header = () => {
  const fechaActual = new Date();
  const fundacion = new Date("1945-05-17");

  // Cálculo de años cumplidos
  const cumpleEsteAnio = new Date(fechaActual.getFullYear(), 4, 17);
  let años = fechaActual.getFullYear() - fundacion.getFullYear();
  if (fechaActual < cumpleEsteAnio) años--;

  const añoRomano = toRoman(años);

  // Simulamos número de edición, este vendría desde props o base de datos
  const numeroEdicion = 20872;

  return (
    <div className="shadow-sm shadow-gray-600">
      <header className="w-full flex justify-between items-center px-4 md:px-10 bgHeader text-gray-200 pb-1 relative">
        <div></div>

        <Link href={'/'}>
          <div className="flex gap-2 justify-end items-end">
            <div className="flex flex-col -space-y-3 leading-none">
              <span className="font-semibold text-md">DIARIO</span>
              <div className='flex flex-col -space-y-5 leading-none items-center'>
                <h1 className={`text-8xl font-black tracking-tighter ${rookit.className}`}>
                  EL ACCIONISTA
                </h1>
                <span className="text-md text-center w-full text-gray-200 font-semibold">
                  JURISPRUDENCIA - DOCTRINA - LEGISLACION - IMPUESTOS - SOCIEDADES
                  ANONIMAS
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center leading-none tracking-tighter -space-y-3">
              <p className="text-8xl text-[#D4AF37] font-bold">{años}</p>
              <p className="text-3xl text-[#D4AF37] font-bold">AÑOS</p>
            </div>
          </div>
        </Link>

        <div className="w-[50px] md:w-[64px]"></div>

        <span className="text-base md:text-md absolute text-end bottom-0 right-2 font-semibold">
          AÑO: {añoRomano} | Edición N° {numeroEdicion}
        </span>
      </header>
    </div>
  );
};

export default Header;
