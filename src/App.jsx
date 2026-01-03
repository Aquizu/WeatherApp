import React, { useEffect, useState } from 'react';
import searchIcon from './assets/search.svg';
import locationIcon from './assets/location.svg';
import windIcon from './assets/wind.svg';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [, setLoading] = useState(false);

  function searchCity() {
    const cityInput = document.getElementById('cityName');
    const city = cityInput.value.trim();
    
    if (city) {
      fetchWeatherData(city);
    }
  }

  async function fetchWeatherData(city) {
    const API_KEY = '8ca42f5f084ccade5b045c88b96cb475';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`;

    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWeatherData('london');
  }, []);

  return (
    <>
      <main className='bg-[url(src/assets/background.jpeg)] h-screen w-screen bg-cover flex flex-col'>
        <section className='w-1/2 backdrop-blur-sm drop-shadow-black drop-shadow-lg flex flex-col items-center justify-center m-auto rounded-2xl bg-black/5 p-4'>
          <div className='w-full flex justify-center m-auto p-4'>
            <div className='flex items-center border rounded-3xl px-2 py-1'>
              <input className='bg-inherit py-1 px-2' required id="cityName" type="text" placeholder="Search for a city..." />
              <button className='' onClick={searchCity}><img src={searchIcon} alt="Search Icon" /></button>
            </div>
          </div>
          <div className='flex text-center flex-col items-center justify-center p-4'>
              <>
                <div className='flex'><img src={locationIcon} alt="Location" /><h1 className='capitaliza text-[34px]'>{weatherData.name}</h1></div>
                <h1 className='text-[30px]'>{weatherData.main.temp}°C</h1>
                <h2 className='capitalize'>{weatherData.weather[0].description}</h2>
                <h3>Humedad: {weatherData.main.humidity}%</h3>
                <div className='flex'><img src={windIcon} alt="Wind Icon" /><h3>{weatherData.wind.speed} km/h</h3></div>
              </>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
