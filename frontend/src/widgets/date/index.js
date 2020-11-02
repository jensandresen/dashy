/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { css, jsx } from "@emotion/core";
import { Title, Big, PowerOf } from "components/text";

const dayLabels = [
  "Søndag",
  "Mandag",
  "Tirsdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lørdag",
];
const monthLabels = [
  "Januar",
  "Februar",
  "Marts",
  "April",
  "Maj",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "December",
];

function Time({ now }) {
  const pretty = (number) => (number >= 10 ? "" + number : "0" + number);

  const hourLabel = pretty(now.getHours());
  const minuteLabel = pretty(now.getMinutes());
  const seconds = pretty(now.getSeconds());

  return (
    <div>
      <Big>
        {`${hourLabel}:${minuteLabel}`}
        <PowerOf>{seconds}</PowerOf>
      </Big>
    </div>
  );
}

function Day({ now }) {
  const dayName = dayLabels[now.getDay()];
  const monthName = monthLabels[now.getMonth()];
  return (
    <Title>
      {dayName}, d. {now.getDate()}. {monthName.toLowerCase()}
    </Title>
  );
}

export default function DateAndTime() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const handle = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(handle);
  }, []);

  return (
    <div>
      <Time now={date} />
      <Day now={date} />
    </div>
  );
}
