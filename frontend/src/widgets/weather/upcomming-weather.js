/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useEffect, useState } from "react";
import { Title } from "components/text";
import { Columns, Column } from "components/layout";
import moment from "moment";
import Temperature from "./temperature";
import WeatherIcon from "./weather-icon";

function Section({ children }) {
  return (
    <div
      css={css`
        margin-bottom: 0.5rem;
        &:last-child {
          margin-bottom: 0;
        }
      `}
    >
      {children}
    </div>
  );
}

function DayView({
  date,
  iconCode,
  rainProbability,
  wind,
  temperature,
  temperatureNight,
}) {
  const dayNames = ["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"];
  const getDayName = () => {
    let index = moment(date).day();
    if (index === 0) {
      index = 7;
    }

    index--;
    return dayNames[index];
  };

  return (
    <div
      css={css`
        // border-left: 1px solid #eee;
        text-align: center;
      `}
    >
      <Section>
        <Title>{getDayName()}</Title>
      </Section>

      <Section>
        <WeatherIcon iconCode={iconCode} size="medium" />
      </Section>

      <Section>
        <Columns>
          <Column>
            <div
              css={css`
                font-size: 2rem;
                text-align: right;
              `}
            >
              <div
                css={css`
                  font-size: 0.8rem;
                  margin-bottom: 0.5rem;
                `}
              >
                Dag
              </div>
              <Temperature temperature={temperature} />
            </div>
          </Column>
          <Column>
            <span
              css={css`
                font-size: 1.25rem;
                color: #bbb;
              `}
            >
              <div
                css={css`
                  font-size: 0.8rem;
                  margin-bottom: 0.5rem;
                `}
              >
                Nat
              </div>
              <Temperature temperature={temperatureNight} />
            </span>
          </Column>
        </Columns>
      </Section>
      <Section>
        <Columns>
          <Column>
            <div
              css={css`
                font-size: 0.8rem;
                text-align: right;
              `}
            >
              <div
                css={css`
                  font-size: 0.8rem;
                  margin-bottom: 0.5rem;
                `}
              >
                Regn
              </div>
              {rainProbability * 100}%
            </div>
          </Column>
          <Column>
            <div
              css={css`
                font-size: 0.8rem;
                text-align: left;
              `}
            >
              <div
                css={css`
                  font-size: 0.8rem;
                  margin-bottom: 0.5rem;
                `}
              >
                Vind
              </div>
              {wind} m/s
            </div>
          </Column>
        </Columns>
      </Section>
    </div>
  );
}

export default function UpcommingWeather() {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const update = () =>
      fetch("api/weather/upcomming")
        .then((response) => response.json())
        .then((data) => setWeather(data));

    const handle = setInterval(update, 1000 * 60 * 2);
    update();

    return () => clearInterval(handle);
  }, []);

  const days = (weather.days || []).slice(1, 6).map((day, index) => {
    return (
      <Column
        key={day.date}
        css={css`
          border-left: 1px solid white;
        `}
      >
        <DayView {...day} />
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
      <Columns>{days}</Columns>
    </div>
  );
}
