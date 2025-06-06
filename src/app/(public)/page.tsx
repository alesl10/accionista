import ContenedorNoticias from '../../components/ContenedorNoticias';
import ArticuloAcademico from '../../components/ArticuloAcademico';

export default function Home() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl flex flex-col gap-5">
          <ContenedorNoticias />

        {/* Artículos académicos */}
        <h4 className="text-center font-semibold text-2xl text-primary px-4 py-2 bg-blue-300/50 border border-primary m-auto shadow-md shadow-gray-600 rounded-lg">
          Artículos Académicos
        </h4>
        <div className="flex flex-wrap gap-5 justify-center mb-4">
          {[...Array(4)].map((_, i) => (
            <ArticuloAcademico
              key={i}
              link={'localhost'}
              titulo={'Apuntes sobre la firma en la mediación'}
              autor={'Dra. Viviana V. Gómez'}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
