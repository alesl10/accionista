// components/WeatherWidget.tsx
import Image from 'next/image';

export default function WeatherWidget({ data }) {
  const {
    location: { name, region, country, localtime },
    current: {
      temp_c,
      condition,
      wind_kph,
      humidity,
      feelslike_c,
    },
  } = data;

  
  return (
    <div className="max-w-sm w-full bg-white rounded-2xl text-primary shadow-md shadow-gray-600 p-4 ">
      <span className="text-xl font-bold text-gray-800">{name}</span>
      <p className="text-sm text-gray-600">{country}</p>

      <div className="flex items-center gap-4">
        <img src={`https:${condition.icon}`} alt={condition.text} />
        <div>
          <p className="text-4xl font-semibold">{temp_c}°C</p>
          {/* <p className="text-sm text-gray-600">{condition.text}</p> */}
        </div>
      </div>

      <div className="text-sm text-gray-700 ">
        <p><strong>Sensación térmica:</strong> {feelslike_c}°C</p>
        <p><strong>Humedad:</strong> {humidity}%</p>
        <p><strong>Viento:</strong> {wind_kph} km/h</p>
      </div>
    </div>
  );
}