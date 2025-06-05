
import WeatherWidget from "./WeatherComponents";
import NavLinks from "./NavLinks"; // CSR
import { headers } from 'next/headers';

export default async function AsideLeft() {
  let weatherData = null;
const apiKey = process.env.WEATHER_API_KEY

//   try {
//     const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Buenos Aires&aqi=no`, {
//   next: { revalidate: 1800 }, 
// });
//     if (!res.ok) throw new Error("Error clima");
//     weatherData = await res.json();
//   } catch (e) {
//     console.error("Error al cargar clima", e);
//   }

  const headersList = await headers(); 
  const currentPath = headersList.get("x-next-url") || "/";

  return (
    <aside className="flex flex-col gap-6">
      <NavLinks currentPath={currentPath} />
      {/* {weatherData ? (
        <WeatherWidget data={weatherData} />
      ) : (
        <div className="text-sm text-gray-500 text-center">
          No se pudo cargar el clima.
        </div>
      )} */}
    </aside>
  );
}
