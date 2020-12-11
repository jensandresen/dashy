/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useEffect, useState } from "react";
import { Big, PowerOf, Title } from "components/text";
import { Columns, Column } from "components/layout";
import moment from "moment";
import WeatherIcon from "./weather-icon";

import "weather-underground-icons";

function Temperature({ temperature }) {
  return (
    <span>
      {(temperature || 0).toFixed(0)}
      <PowerOf>o</PowerOf>
    </span>
  );
}

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

function DayView({ date, iconCode }) {
  const dayNames = ["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"];
  const getDayName = () => {
    let index = moment(date).day();
    if (index === 0) {
      index = 8;
    }
    return dayNames[index - 1];
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
        <WeatherIcon iconCode={iconCode} size="3rem;" />
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
              <Temperature temperature={15} />
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
              <Temperature temperature={4} />
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
              34%
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
              3 m/s
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

  const days = [
    {
      date: new Date(),
      iconCode: 1,
    },
    {
      date: new Date(),
      iconCode: 2,
    },
    {
      date: new Date(),
      iconCode: 3,
    },
    {
      date: new Date(),
      iconCode: 4,
    },
    {
      date: new Date(),
      iconCode: 5,
    },
  ].map((day) => {
    return (
      <Column
        key={day.date.getTime()}
        css={css`
          border-left: 1px solid white;
        `}
      >
        <DayView {...day} />
      </Column>
    );
  });

  return (
    <div>
      <Columns>{days}</Columns>
      <div>
        <i className="wu wu-white wu-32 wu-chancerain"></i>
        <i className="wu wu-128 wu-white wu-day wu-chanceflurries"></i>
      </div>
    </div>
  );
}
