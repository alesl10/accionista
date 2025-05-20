
export default function Footer() {
  return (
    <footer className="bg-[#1d2e5b] text-white text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6 grid md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-semibold text-lg">El Accionista</h4>
          <p className="mt-2 text-gray-300">
            Jurisprudencia, doctrina, legislación, impuestos y sociedades anónimas.
          </p>
          <p className="mt-2 text-xs text-gray-400">Fundado en 1945</p>
        </div>

        <div>
          <h4 className="font-semibold text-lg">Contacto</h4>
          <ul className="mt-2 text-gray-300 space-y-1">
            <li>San Martín 50 Piso 4, Of. 34/36 (1004) CABA</li>
            <li>Tel: 4343-9950 / 4331-1883</li>
            <li>
              <a href="mailto:info@diarioelaccionista.com.ar" className="hover:underline">
                info@diarioelaccionista.com.ar
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg">Información legal</h4>
          <p className="mt-2 text-gray-300">
            Registro Prop. Intelectual RL-2022-73519248-APN-DNDA#MJ
          </p>
          <p className="text-gray-300">Miembro de ADEPA</p>
          <p className="text-gray-300">I.S.S.N. 0327-6325</p>
        </div>
      </div>

      <div className="text-center py-4 border-t-2 border-white/20 text-gray-400 ">
        &copy; {new Date().getFullYear()} El Accionista. Todos los derechos reservados.
      </div>
    </footer>
  );
}