import { useState, useEffect } from 'react';
import WeatherData from './Components/WeatherData.jsx';
import Humidity from './Components/Humidity.jsx';
import InputSearch from './Components/InputSearch.jsx';
import Wind from './Components/Wind.jsx';
import DailyCard from './Components/DailyCard.jsx';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async (city) => {
    const API_KEY = '8ca42f5f084ccade5b045c88b96cb475';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=5&appid=${API_KEY}&units=metric&lang=es`;

    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData('london');
  }, []);

  return (
    <>
      <main className='bg-[url(src/assets/background.jpeg)] h-screen w-screen bg-cover flex flex-col'>
        <section className='w-3/4 md:max-w-[700px] h-3/4 backdrop-blur-sm drop-shadow-black drop-shadow-lg justify-center m-auto rounded-2xl bg-black/5 p-4'>
          <InputSearch onSearch={fetchWeatherData} />
          <div className='flex flex-col mt-9 items-center text-[30px]'>
            {loading ? (
              <p>Cargando...</p>
            ) : weatherData ? (
              <>
                <WeatherData weatherData={weatherData} />
                <Humidity weatherData={weatherData} />
                  <Wind weatherData={weatherData} />
                  <DailyCard weatherData={weatherData} />
              </>
            ) : (
              <p>No hay datos disponibles</p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
