'use client';

import WeatherInfo from '@/components/WeatherInfo';
import Head from 'next/head';
import Image from "next/image";
import { useState } from 'react';

export default function Home() {
  const [weatherInfo, setWeatherInfo] = useState({
    cityName: "Toronto",
    temperature: 22,
    weather: "Sunny"
  })

  function weatherUpdate(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault()
    console.log("INFO: weatherUpdate function triggered.")
  }

  return (
    <div className="">
      <main className="bg-blue-100 h-screen">
        <div className="flex justify-center md:justify-end ">
          <div className="w-36 border-8 border-gray-600 mt-5 md:mr-20 text-center">
            <p>Switch Toggle</p>
          </div>
        </div>

        {/* Application Name */}
        <div className="text-center mb-5 mt-40 text-2xl font-bold">
          <h1>The Weather App</h1>
        </div>

        {/* Input Box */}
        <div className="w-80 ml-auto mr-auto flex items-center">
          <input placeholder="Name of the city" className="w-80 border-8 border-black text-center rounded-lg text-xl p-2"></input>
          <div className="ml-2" onClick={weatherUpdate}>
            <Image
              className="cursor-pointer"
              src="/search.png" // add another search icon in white
              alt="search icon logomark"
              width={40}
              height={40}
            />
          </div>
        </div>

        {/* Weather Information of the city */}
        <WeatherInfo
          cityName={weatherInfo.cityName}
          temperature={weatherInfo.temperature}
          weather={weatherInfo.weather}
        />
      </main>
    </div>
  );
}
