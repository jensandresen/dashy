/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useEffect, useState } from "react";
import { Big } from "components/text";
import { Columns, Column } from "components/layout";
import moment from "moment";
import WeatherIcon from "./weather-icon";
import Temperature from "./temperature";

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
          <WeatherIcon iconCode={iconCode} size="large" />
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
