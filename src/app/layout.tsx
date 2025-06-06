import type { Metadata } from "next";
import { Rokkitt, Roboto } from "next/font/google";
import "./globals.css";
import Header from '../components/Header'
import Footer from '../components/Footer.jsx'



const roboto = Roboto({
  subsets:['latin'],
  display: 'swap',
  weight:['100','200','300','400','500','600','700','800','900']
})

export const metadata: Metadata = {
  title: "Inicio | El Accionista",
  description: "Diario El Accionista",
  keywords: ["el accionista", "accionista", "diario", "publicaciones", "edicto", "boletin oficial", "igj"],
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
        className={`${roboto.className} antialiased flex flex-col min-h-screen `}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
