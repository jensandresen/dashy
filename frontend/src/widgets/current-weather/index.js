/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React, { useEffect, useState } from "react";
import { Title, Big, PowerOf } from "components/text";

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
    fetch("api/weather/current")
      .then((response) => response.json())
      .then((data) => setWeatherInfo(data));
  }, []);

  return (
    <div
      css={css`
        text-align: right;
      `}
    >
      <Temperature temperature={weatherInfo.temperature} />
      {/* <SunUpDown up={weatherInfo.sunUp} down={weatherInfo.sunDown} /> */}
    </div>
  );
}
