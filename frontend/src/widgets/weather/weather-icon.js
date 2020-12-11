import React from "react";
import "weather-underground-icons";

function getSizeClass(size) {
  switch (size) {
    case "small":
      return "wu-32";
    case "medium":
      return "wu-64";
    case "large":
      return "wu-128";
    case "xlarge":
      return "wu-256";
    default:
      return "wu-128";
  }
}

export default function WeatherIcon({ iconCode, size = "large" }) {
  const sizeClass = getSizeClass(size);

  switch (iconCode) {
    case 1:
      return <i className={`wu ${sizeClass} wu-white wu-day wu-sunny`}></i>;
    case 2:
      return <i className={`wu ${sizeClass} wu-white wu-night wu-sunny`}></i>;
    case 3:
      return (
        <i className={`wu ${sizeClass} wu-white wu-day wu-mostlycloudy`}></i>
      );
    case 4:
      return (
        <i className={`wu ${sizeClass} wu-white wu-night wu-mostlysunny`}></i>
      );
    case 5:
      return <i className={`wu ${sizeClass} wu-white wu-day wu-cloudy`}></i>;
    case 6:
      return <i className={`wu ${sizeClass} wu-white wu-day wu-rain`}></i>;
    case 7:
      return <i className={`wu ${sizeClass} wu-white wu-day wu-tstorms`}></i>;
    case 8:
      return <i className={`wu ${sizeClass} wu-white wu-day wu-snow`}></i>;
    case 9:
      return (
        <i className={`wu ${sizeClass} wu-white wu-day wu-partlycloudy`}></i>
      );
    default:
      return null;
  }
}
