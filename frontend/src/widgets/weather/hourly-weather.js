/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useEffect, useState } from "react";
import { Title, PowerOf } from "components/text";
import { Columns, Column } from "components/layout";
import moment from "moment";
import Temperature from "./temperature";
import WeatherIcon from "./weather-icon";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTint, faWind } from "@fortawesome/free-solid-svg-icons";

export default function HourlyWeather({}) {
  const [hours, setHours] = useState([]);

  useEffect(() => {
    const updater = () =>
      fetch("api/weather/hourly")
        .then((response) => response.json())
        .then((data) => data.hours || [])
        .then((items) => items.slice(0, 10))
        .then((items) => setHours(items));

    updater();

    const handle = setInterval(updater, 1000 * 60 * 2);
    return () => clearInterval(handle);
  }, []);

  const columns = hours.map((x) => {
    return (
      <Column>
        <center>
          <div>
            {moment(x.date).format("HH")}
            <PowerOf>00</PowerOf>
          </div>
          <div>
            <WeatherIcon iconCode={x.iconCode} size="small" />
          </div>
          <div>
            <Temperature temperature={x.temperature} />
          </div>
        </center>
      </Column>
    );
  });

  return (
    <div
      css={css`
        margin-top: 2rem;
        margin-bottom: 2rem;
      `}
    >
      <Columns>{columns}</Columns>
    </div>
  );
}
