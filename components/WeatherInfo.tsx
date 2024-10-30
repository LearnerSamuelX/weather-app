import React, { ChangeEvent } from "react";
import { useState } from "react";
import { WEATHER_INFO_FONT } from "@/app/styling";
import Image from "next/image";

export default function WeatherInfo(props: WeatherData): JSX.Element {
    return (
        <div className="mt-20 border-blue-200 bg-blue-200 rounded-lg text-center w-40 mx-auto p-5">
            <div className="w-20 mx-auto">
                <Image
                    className="cursor-pointer"
                    src={props.weather}
                    alt="search icon logomark"
                    width={80}
                    height={80}
                />
            </div>
            <p className={WEATHER_INFO_FONT}>{props.temperature}˚C</p>
            <p className={WEATHER_INFO_FONT}>{props.cityName}</p>
        </div >
    )
}