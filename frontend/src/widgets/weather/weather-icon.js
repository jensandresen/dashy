import React from "react";
import "weather-underground-icons";

export default function WeatherIcon({ iconCode, size = "6rem" }) {
  const width = size;

  switch (iconCode) {
    case 1:
      return <i className="wu wu-128 wu-white wu-day wu-sunny"></i>;
    case 2:
      return <i className="wu wu-128 wu-white wu-night wu-sunny"></i>;
    case 3:
      return <i className="wu wu-128 wu-white wu-day wu-mostlycloudy"></i>;
    case 4:
      return <i className="wu wu-128 wu-white wu-night wu-mostlysunny"></i>;
    case 5:
      return <i className="wu wu-128 wu-white wu-day wu-cloudy"></i>;
    case 6:
      return <i className="wu wu-128 wu-white wu-day wu-rain"></i>;
    case 7:
      return <i className="wu wu-128 wu-white wu-day wu-tstorms"></i>;
    case 8:
      return <i className="wu wu-128 wu-white wu-day wu-snow"></i>;
    case 9:
      return <i className="wu wu-128 wu-white wu-day wu-partlycloudy"></i>;
    default:
      return null;
  }
}
