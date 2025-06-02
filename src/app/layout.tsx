import type { Metadata } from "next";
import { Rokkitt } from "next/font/google";
import "./globals.css";
import Header from '../components/Header'
import Footer from '../components/Footer.jsx'

const rookit = Rokkitt({
  variable: '--font-rokkit',
  subsets: ['latin']
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
        className={`${rookit.variable} antialiased flex flex-col min-h-screen `}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
