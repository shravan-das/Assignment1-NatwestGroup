import React, { useEffect, useState } from 'react';
import { useDate } from '../Utils/useDate';
import sun from '../assets/icons/sun.png';
import cloud from '../assets/icons/cloud.png';
import fog from '../assets/icons/fog.png';
import rain from '../assets/icons/rain.png';
import snow from '../assets/icons/snow.png';
import storm from '../assets/icons/storm.png';
import wind from '../assets/icons/windy.png';
import '../index.css';

const WeatherCard = ({
  temperature,
  windspeed,
  humidity,
  place,
  heatIndex,
  iconString,
  conditions,
  recentSearches
}) => {
  const [unit, setUnit] = useState('Celsius');
  const [temperatureValue, setTemperatureValue] = useState(temperature);
  const { time } = useDate();

  useEffect(() => {
    if (unit === 'Celsius') {
      setTemperatureValue(temperature);
    } else {
      setTemperatureValue(((temperatureValue * 9) / 5 + 32).toFixed(2)); // Convert Celsius to Fahrenheit
    }
    
  }, [unit, temperature]);

  const toggleUnit = () => {
    setUnit(unit === 'Celsius' ? 'Fahrenheit' : 'Celsius');
  };

  const getIcon = () => {
    if (iconString) {
      if (iconString.toLowerCase().includes('cloud')) {
        return cloud;
      } else if (iconString.toLowerCase().includes('rain')) {
        return rain;
      } else if (iconString.toLowerCase().includes('clear')) {
        return sun;
      } else if (iconString.toLowerCase().includes('thunder')) {
        return storm;
      } else if (iconString.toLowerCase().includes('fog')) {
        return fog;
      } else if (iconString.toLowerCase().includes('snow')) {
        return snow;
      } else if (iconString.toLowerCase().includes('wind')) {
        return wind;
      }
    }
    return sun; 
  };

  const icon = getIcon();

  return (
    <div className='w-[22rem] min-w-[22rem] h-[40rem] glassCard p-4'>
    <div className='flex w-full justify-center items-center gap-4 mt-12 mb-4'>
      <img src={icon} alt="weather_icon" />
      <p className='font-bold text-5xl flex justify-center items-center'>{temperatureValue}&deg;{unit.charAt(0)}</p>
    </div>
    <div className='font-bold flex justify-center items-center'>
      <button onClick={toggleUnit} className='ml-2 focus:outline-none bg-blue-500 text-white px-3 py-1 rounded-md'>Switch</button>
    </div>
  
    <div className='font-bold text-center text-xl'>
      {place}
    </div>
    <div className='w-full flex justify-between items-center mt-4'>
      <p className='flex-1 text-center p-2'>{new Date().toDateString()}</p>
      <p className='flex-1 text-center p-2'>{time}</p>
    </div>
    <div className='w-full flex justify-between items-center mt-4 gap-4'>
      <p className='flex-1 text-center p-2 font-bold bg-blue-600 shadow rounded-lg'>Wind Speed <p className='font-normal'>{windspeed} km/h</p></p>
      <p className='flex-1 text-center p-2 font-bold rounded-lg bg-green-600'>Humidity <p className='font-normal'>{humidity} gm/m&#179;</p></p>
    </div>
    <div className='w-full p-3 mt-4 flex justify-between items-center'>
      <p className='font-semibold text-lg'>Heat Index</p>
      <p className='text-lg'>{heatIndex ? heatIndex : 'N/A'}</p>
    </div>
    <hr className='bg-slate-600' />
    <div className='w-full p-4 flex justify-center items-center text-3xl font-semibold'>
      {conditions}
    </div>
    <div className="recent-searches mt-4">
      <h2 className="font-bold text-xl mb-2">Recent Searches</h2>
      <ul className="flex flex-wrap gap-4 text-black">
        {recentSearches?.map((search, index) => (
          <li key={index} className="list-none font-semibold">{search}</li>
        ))}
      </ul>
    </div>
  </div>
  
  )
}

export default WeatherCard;
