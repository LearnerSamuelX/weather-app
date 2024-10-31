import { WEATHER_CARD_BG_DAY, WEATHER_CARD_BG_NIGHT, WEATHER_INFO_FONT } from "@/app/styling";
import Image from "next/image";

export default function WeatherInfo(props: WeatherCardData): JSX.Element {
    return (
        <div className={props.theme ? WEATHER_CARD_BG_DAY : WEATHER_CARD_BG_NIGHT}>
            <div className="w-20 mx-auto">
                <Image
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