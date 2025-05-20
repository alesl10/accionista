import type { Metadata } from "next";
import { Rokkitt } from "next/font/google";
import "../globals.css";
import Header from '../../components/Header.jsx'
import Footer from '../../components/Footer.jsx'
import AsideRight from '../../components/AsideRight.jsx'
import AsideLeft from '../../components/AsideLeft.jsx'
import Visitante from '../../components/Visitante.jsx'
import Image from "next/image";

const rookit = Rokkitt({
  variable: '--font-rokkit',
  subsets: ['latin']
})


export const metadata = {
  title: "Inicio | El Accionista",
  description: "Diario El Accionista",
  keywords: ["el accionista", "accionista", "diario","publicaciones", "edicto", "boletin oficial", "igj"],
  authors: [{ name: "El accionista" }],
  openGraph: {
    title: "Inicio | El Accionista",
    description: "Diario El Accionista",
    url: "https://misitio.com",
    siteName: "Diario El Accionista",
    images: [
      {
        url: "https://misitio.com/og-image.jpg",
        width: 800,
        height: 600,
      },
    ],
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${rookit.variable} antialiased `}
      >
        <Header />

        <div className="pt-5 relative flex justify-center gap-2 w-full 2xl:w-4/5 m-auto p-2">
          {/* <!-- Aside izquierdo con ancho fijo --> */}
          <div className=" hidden lg:flex w-[200px] pt-5 shrink-0  flex-col gap-10">
            <AsideLeft />
            <div className="flex flex-col items-start gap-2  ">
              <h6 className="text-center text-primary font-medium text-lg w-full">Socios Amigos</h6>
              <Image src={'/REGALERIA_EMPRESARIAL.jpg'} alt="Imagen publicitaria" width={200} height={100} className="saturate-50 rounded-2xl" />
            </div>
          </div>

          {/* <!-- Contenido principal, centrado y limitado --> */}
          <div className="flex-1 flex justify-center px-2">
            {children}
          </div>

          {/* Aside derecho con ancho fijo  */}
          <div className="w-[250px] shrink-0">
            <AsideRight />
          </div>

        </div>
        <Visitante />
        <Footer />
      </body>
    </html>
  );
}
