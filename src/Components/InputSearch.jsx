function InputSearch({ onSearch }) {
  function handleSearch() {
    const cityInput = document.getElementById('cityName');
    const city = cityInput.value.trim();
    
    if (city) {
      onSearch(city);
      cityInput.value = '';
    }
  }

  return (
    <div className=''>
      <div className='flex justify-between md:justify-between border rounded-3xl px-2 py-1'>
        <input className='py-1 px-2' required id="cityName" type="text" placeholder="Search for a city..." />
        <button className='' onClick={handleSearch}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
        </button>
      </div>
    </div>
  );
}

export default InputSearch;