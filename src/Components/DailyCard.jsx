function DailyCard({ weatherData }) {
  if (!weatherData) return null;

  return (
    <div className="flex flex-col items-center mt-6 bg-white/30 p-4 rounded-xl w-3/4 md:w-1/2">
      <h2 className="text-2xl mb-4">Pronóstico Diario</h2>
      <div className="flex justify-between w-full">
        {weatherData.list.map((day, index) => (
          <div key={index} className="flex flex-col items-center">
            <p className="mb-2">{new Date(day.dt_txt).toLocaleDateString('es-ES', { weekday: 'short' })}</p>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt={day.weather[0].description}
            />
            <p className="mt-2">{day.main.temp.toFixed(1)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DailyCard;