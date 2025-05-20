import "../globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NavBarAdmin from '../../components/Admin/NavBarAdmin'


export const metadata = {
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
        <div className="flex flex-col min-h-screen">
          <Header />

          <div className="grow flex gap-2 bg-gray-100  ">
            <NavBarAdmin />
            <div className="p-2 grow">
            {children}
            </div>
          </div>

          <Footer />
        </div>
  );
}
