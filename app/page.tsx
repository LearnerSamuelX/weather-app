'use client';

import WeatherInfo from '@/components/WeatherInfo';
import Head from 'next/head';
import Image from "next/image";
import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import {
  APPLICATION_TITLE_DAY,
  APPLICATION_TITLE_NIGHT,
  BACKGROUND_COLOR_DAY,
  BACKGROUND_COLOR_NIGHT,
  INPUT_BOX_BORDER_DAY,
  INPUT_BOX_BORDER_NIGHT,
  SEARCH_BUTTON_BG_DAY,
  SEARCH_BUTTON_BG_NIGHT,
  SWITCH_TOGGLE_DAY,
  SWITCH_TOGGLE_NIGHT
} from './styling';

export default function Home() {

  const [rawCityName, setCityName] = useState<string>("")
  const [renew, setRenew] = useState<string>("")
  const [error, setError] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [weatherInfo, setWeatherInfo] = useState<WeatherCardData>({
    cityName: "N/A",
    temperature: -100,
    weather: "N/A",
    theme: true
  })

  // states for theme changing
  const [theme, setTheme] = useState<boolean>(true) // true -> day; false -> night

  useEffect(() => {
  }, [renew])


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
        setRenew((prev) => {
          return prev = cityName
        })

        setLoaded((prev) => {
          return prev = true
        })

        setError((prev) => {
          return prev = false
        })

        return prev
      })
    }).catch((err) => {
      console.log(err)
      setLoaded((prev) => {
        return prev = false
      })

      setError((prev) => {
        return prev = true
      })

    })
  }

  function textValue(event: ChangeEvent<HTMLInputElement>) {
    setCityName((prev) => {
      prev = event.target.value
      return prev
    })
  }

  function nameProcessor(cityName: string) {
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

  function themeChanger() {
    if (theme) {
      // change it to night theme
      setTheme((prev) => {
        return prev = false
      })
    } else {
      // change it to day theme
      setTheme((prev) => {
        return prev = true
      })
    }
  }

  return (
    <div className="">
      <main className={theme ? BACKGROUND_COLOR_DAY : BACKGROUND_COLOR_NIGHT}>
        <div className="flex justify-center md:justify-end ">
          <div className={theme ? SWITCH_TOGGLE_DAY : SWITCH_TOGGLE_NIGHT} onClick={themeChanger}>
            {theme ? <p className="text-black">night</p> : <p className="text-white">day</p>}
          </div>
        </div>

        {/* Application Name */}
        <div className={theme ? APPLICATION_TITLE_DAY : APPLICATION_TITLE_NIGHT}>
          <h1>The Weather App</h1>
        </div>

        {/* Input Box */}
        <div className="w-80 ml-auto mr-auto flex items-center">
          <input
            placeholder="Name of the city"
            className={theme ? INPUT_BOX_BORDER_DAY : INPUT_BOX_BORDER_NIGHT}
            onChange={textValue}
          ></input>
          <div className={theme ? SEARCH_BUTTON_BG_DAY : SEARCH_BUTTON_BG_NIGHT} onClick={weatherUpdate}>
            <p>Search</p>
          </div>
        </div>

        {/* Weather Information of the city */}
        <div>
          {
            error ?
              <div className='text-center text-xl mt-5 text-red-500 font-bold'>
                <p>Invalid city name, try again</p>
              </div> : <></>
          }
          {
            loaded ? <div>
              <WeatherInfo
                cityName={weatherInfo.cityName}
                temperature={weatherInfo.temperature}
                weather={weatherInfo.weather} // pass icon code in it
                theme={theme}
              />
            </div> : <></>
          }
        </div>
      </main >
    </div >
  );
}
