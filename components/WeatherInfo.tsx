import React, { ChangeEvent } from "react";
import { useState } from "react";
import { WEATHER_INFO_FONT } from "@/app/styling";

export default function WeatherInfo(props: WeatherData): JSX.Element {
    return (
        <div className="mt-20 bg-blue-400 text-center w-40 mx-auto p-5">
            <p className={WEATHER_INFO_FONT}>{props.weather}</p>
            <p className={WEATHER_INFO_FONT}>{props.temperature} ˚C</p>
            <p className={WEATHER_INFO_FONT}>{props.cityName}</p>
        </div >
    )
}