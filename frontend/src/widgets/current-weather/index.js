import React, { useEffect, useState } from "react";
import Title from "components/title";

function SunUpDown({ up, down }) {
    return <Title>
        <span>Sol op: {up}</span>
        <span>Sol Ned: {down}</span>
    </Title>;
}

function Temperature({ temperature, iconUrl }) {
    return         <h1 style={{
        fontSize: "6rem",
        lineHeight: "6rem",
    }}>
        <img style={{
            height: "6rem",
            display: "inline-block"
        }} src={iconUrl} alt="icon" />
        <span>
            {temperature}
            <span style={{
                fontSize: "3rem",
                top: "-2rem",
                position: "relative",
                marginLeft: "0.25rem",                    
            }}>o</span>
        </span>
    </h1>;
}

export default function CurrentWeather() {
    const [ weatherInfo, setWeatherInfo ] = useState({});

    useEffect(() => {
        fetch("/weather.json")
            .then(response => response.json())
            .then(data => setWeatherInfo(data));
    }, []);

    return <div>
        <Temperature temperature={weatherInfo.currentTemperature} iconUrl={weatherInfo.iconUrl} />
        <SunUpDown up={weatherInfo.sunUp} down={weatherInfo.sunDown} />
    </div>
}