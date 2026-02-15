import { useEffect, useState } from 'react';

function App() {
  const API_KEY = '8ca42f5f084ccade5b045c88b96cb475';

  const [city, setCity] = useState('Buenos Aires');
  const [queryCity, setQueryCity] = useState('Buenos Aires');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (q) => {
    try {
      setLoading(true);
      setError(null);
      setData(null);

      const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
        q
      )}&cnt=5&appid=${API_KEY}&units=metric&lang=es`;

      const res = await fetch(URL);
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.message || res.statusText || 'Error al obtener datos');
      }

      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(queryCity);
  }, [queryCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return setError('Ingresa el nombre de una ciudad');
    setQueryCity(city.trim());
  };

  const formattedDate = (() => {
    const d = new Date();
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  })();

  const formattedTime = (() => {
    const d = new Date();
    return `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
  })();

  return (
    <main className="bg-[url(src/assets/background.jpeg)] h-screen w-screen bg-cover flex flex-col">
      <div className="grid grid-cols-5 grid-rows-5 gap-4 m-auto mt-10 max-w-5xl w-[95%]">
        <div className="col-span-3 flex flex-col items-center justify-center border-2 border-white rounded-lg p-6 bg-black/30">
          
          <form onSubmit={handleSubmit} className="w-full flex gap-3 items-center">
            <input
              aria-label="Ciudad"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Ingresa una ciudad (ej. Madrid)"
              className="flex-1 p-2 rounded-md bg-white/80 text-black"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md" type="submit">
              Buscar
            </button>
          </form>
        </div>

        <div className="col-span-2 col-start-4 flex flex-row items-center justify-center border-2 border-white rounded-lg bg-black/30 text-white">
          <div className="">{formattedTime}</div>
          <div className="">{formattedDate}</div>

          {data && (
            <div className="mt-4 text-center">
              
            </div>
          )}
        </div>

        <div className="col-span-3 row-start-2 flex flex-col items-center justify-center border-2 border-white rounded-lg bg-black/25 text-white">
          {data ? (
            <>
              <div className="flex justify-center items-center text-sm opacity-80">
                <h2 className="text-2xl font-semibold">{data.city.name}, {data.city.country}</h2>
              </div>
            </>
          ) : (
            <div className="text-white/60">Selecciona una ciudad para ver el clima</div>
          )}
        </div>

        <div className="col-span-2 col-start-4 row-start-2 flex flex-col items-center justify-center border-2 border-white rounded-lg bg-black/25 text-white">
          {data && Array.isArray(data.list) && data.list.length > 0 ? (
            <div className="text-2xl font-semibold">{Math.round(data.list[0].main.temp)}°C</div>
          ) : (
            <div className="text-white/60">— °C</div>
          )}
        </div>

        <div className="col-span-2 row-start-3 flex flex-col items-center justify-center border-2 border-white rounded-lg bg-black/25 text-white">6</div>

        <div className="col-start-3 row-start-3 flex flex-col items-center justify-center border-2 border-white rounded-lg bg-black/25 text-white">7</div>

        <div className="col-span-2 col-start-4 row-start-3 flex flex-col items-center justify-center border-2 border-white rounded-lg bg-black/25 text-white">8</div>

        <div className="col-span-5 row-span-2 row-start-4 flex flex-col items-center justify-center border-2 border-white rounded-lg bg-black/25 text-white py-6">
          <div className="w-full text-white">
            {loading && <div>⏳ Cargando datos...</div>}
            {error && <div className="text-red-300">⚠️ {error}</div>}
            {data && (
              <div className="flex flex-col items-center"> <h1 className='text-2xl'>Próximas horas</h1>
                <div className="mt-4 grid grid-cols-5 gap-3">
                  {data.list.map((item) => (
                    <div key={item.dt} className="bg-white/10 p-3 rounded-md text-center">
                      <div className="font-semibold">{new Date(item.dt * 1000).toLocaleString('es-AR', { weekday: 'short', hour: '2-digit', minute: '2-digit' })}</div>
                      <img
                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                        alt={item.weather[0].description}
                        className="mx-auto"
                        width={64}
                        height={64}
                      />
                      <div className="mt-1 text-lg">{Math.round(item.main.temp)}°C</div>
                      <div className="text-sm text-white/80 capitalize">{item.weather[0].description}</div>
                      <div className="text-xs mt-1">Hum: {item.main.humidity}% • Viento: {Math.round(item.wind.speed)} m/s</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div></div>
      </div>
    </main>
  );
}

export default App;
