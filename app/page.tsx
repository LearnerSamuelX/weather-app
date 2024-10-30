'use client';

import WeatherInfo from '@/components/WeatherInfo';
import Head from 'next/head';
import Image from "next/image";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {

  const [rawCityName, setCityName] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [weatherInfo, setWeatherInfo] = useState<WeatherData>({
    cityName: "N/A",
    temperature: -100,
    weather: "N/A"
  })

  useEffect(() => {
  }, [])


  function weatherUpdate(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault()
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API
    const cityName = nameProcessor(rawCityName)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    axios.get(url).then((response) => {

      setError((prev) => {
        return prev = false
      })

      const weatherData = response.data
      const currentCityName = weatherData.name
      const currentTemp = Math.round(weatherData.main.temp - 273.15)
      const weatherIconCode = "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"

      setWeatherInfo((prev) => {
        prev.cityName = currentCityName
        prev.temperature = currentTemp
        prev.weather = weatherIconCode
        setLoaded((prev) => {
          return prev = true
        })
        return prev
      })


    }).catch((err) => {
      console.log(err)
      setError((prev) => {
        return prev = true
      })
    })

  }

  function nameProcessor(cityName = "los angeles") {
    const result: string[] = []
    for (let i = 0; i < cityName.length; i++) {
      const curr = cityName[i]
      if (curr === " ") {
        result.push("%20")
      } else {
        result.push(curr)
      }
    }
    return result.join("")
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
              src="/search.png"
              alt="search icon logomark"
              width={40}
              height={40}
            />
          </div>
        </div>

        {/* Weather Information of the city */}
        <div>
          {
            error ?
              <div className='text-center text-xl mt-5 text-red-500'>
                <p>Error: Invalid city name! </p>
              </div> : <></>
          }
          {
            loaded ? <div>
              <WeatherInfo
                cityName={weatherInfo.cityName}
                temperature={weatherInfo.temperature}
                weather={weatherInfo.weather} // pass icon code in it
              />
            </div> : <></>
          }
        </div>
      </main >
    </div >
  );
}
