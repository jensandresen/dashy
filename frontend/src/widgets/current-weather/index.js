/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useEffect, useState } from "react";
import { Title, Big, PowerOf } from "components/text";
import { Columns, Column } from "components/layout";
import moment from "moment";

import {
  Sunny,
  ClearNight,
  CloudyWithSun,
  CloudyWithMoon,
  Cloudy,
  Rainy,
  CloudyWithRainAndLightning,
  Snowy,
  SunnyWithWind,
  // CloudyWithLightning,
} from "./icons";

function SunUpDown({ up, down }) {
  return (
    <Title>
      <span>Sol op: {up}</span>
      <span>Sol Ned: {down}</span>
    </Title>
  );
}

function Temperature({ temperature }) {
  return (
    <span>
      {(temperature || 0).toFixed(0)}
      <PowerOf>o</PowerOf>
    </span>
  );
}

function WeatherIcon({ iconCode }) {
  const width = "6rem";

  switch (iconCode) {
    case 1:
      return <Sunny width={width} />;
    case 2:
      return <ClearNight width={width} />;
    case 3:
      return <CloudyWithSun width={width} />;
    case 4:
      return <CloudyWithMoon width={width} />;
    case 5:
      return <Cloudy width={width} />;
    case 6:
      return <Rainy width={width} />;
    case 7:
      return <CloudyWithRainAndLightning width={width} />;
    case 8:
      return <Snowy width={width} />;
    case 9:
      return <SunnyWithWind width={width} />;
    default:
      return null;
  }
}

function DayStats({ sunUp, sunDown, wind, pressure, humidity }) {
  const stats = [
    {
      key: "Sol op",
      value: moment(sunUp).format("H:mm"),
    },
    {
      key: "Sol ned",
      value: moment(sunDown).format("H:mm"),
    },
    {
      key: "Vind",
      value: `${(wind || 0).toFixed(2)} m/s`,
    },
    {
      key: "Tryk",
      value: `${(pressure || 0).toFixed(0)} hPa`,
    },
    {
      key: "Fugtighed",
      value: `${(humidity || 0).toFixed(0)} %`,
    },
  ];

  return (
    <table
      css={css`
        width: 100%;
        height: 100%;
        border: none;
        text-align: left;
        font-size: 0.8rem;
        font-family: monospace;
        font-size: 0.8rem;
        line-height: 0.8rem;
        padding-top: 0.5rem;
        color: #aaa;
      `}
    >
      <tbody>
        {stats.map((x, i) => (
          <tr key={i}>
            <td>{x.key}</td>
            <td
              css={css`
                text-align: right;
              `}
            >
              {x.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
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

  const { temperature, feelsLikeTemperature, iconCode } = weatherInfo;

  const elements = (
    <div>
      <Columns height="10rem">
        <Column>
          <WeatherIcon iconCode={iconCode} />
        </Column>
        <Column>
          <div
            css={css`
              text-align: center;
            `}
          >
            <Big>
              <Temperature temperature={temperature} />
            </Big>
            <div
              css={css`
                position: relative;
                top: -1rem;
                color: #aaa;
                font-style: italic;
              `}
            >
              (<span>føles som</span>&nbsp;
              <Temperature temperature={feelsLikeTemperature} />
              C)
            </div>
          </div>
        </Column>
        <Column>
          <DayStats {...weatherInfo} />
        </Column>
      </Columns>
    </div>
  );

  return (
    <div
      css={css`
        text-align: right;
      `}
    >
      {elements}
    </div>
  );
}
