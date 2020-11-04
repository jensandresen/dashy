/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React, { useEffect, useState } from "react";
import { Title, Big, PowerOf } from "components/text";

import {
  Cloudy,
  Rainy,
  CloudyWithLightning,
  ClearNight,
  CloudyWithMoon,
  CloudyWithRainAndLightning,
  CloudyWithSun,
  Snowy,
  Sunny,
  SunnyWithWind,
} from "./icons";

function SunUpDown({ up, down }) {
  return (
    <Title>
      <span>Sol op: {up}</span>
      <span>Sol Ned: {down}</span>
    </Title>
  );
}

function Temperature({ temperature, iconUrl }) {
  return (
    <Big>
      {(temperature || 0).toFixed(0)}
      <PowerOf>o</PowerOf>
    </Big>
  );
}

export default function CurrentWeather() {
  const [weatherInfo, setWeatherInfo] = useState({});

  useEffect(() => {
    const update = () =>
      fetch("api/weather/current")
        .then((response) => response.json())
        .then((data) => setWeatherInfo(data));

    const handle = setInterval(update, 1000 * 60 * 2);
    update();

    return () => clearInterval(handle);
  }, []);

  return (
    <div
      css={css`
        text-align: right;
      `}
    >
      <Temperature temperature={weatherInfo.temperature} />
      {/* <Cloudy width="6rem" /> */}
      {/* <Rainy width="6rem" /> */}
      {/* <CloudyWithLightning width="6rem" />
      <ClearNight width="6rem" />
      <CloudyWithMoon width="6rem" />
      <CloudyWithRainAndLightning width="6rem" />
      <CloudyWithSun width="6rem" />
      <Snowy width="6rem" />
      <Sunny width="6rem" />
      <SunnyWithWind width="6rem" /> */}

      {/* <SunUpDown up={weatherInfo.sunUp} down={weatherInfo.sunDown} /> */}
    </div>
  );
}
