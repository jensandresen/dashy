import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import moment from "moment";

let cachedData = null;

function getDataDirPath() {
  return process.env.DATA_DIR || path.resolve(process.cwd(), "data");
}

function getDataFilePath() {
  const dataDir = getDataDirPath();
  return path.resolve(dataDir, "weather.json");
}

function getData() {
  const filePath = getDataFilePath();
  const content = fs.readFileSync(filePath, { encoding: "utf8" });
  return JSON.parse(content);
}

function getCachedData() {
  if (!cachedData) {
    cachedData = getData();
  }

  return cachedData;
}

function getUrl() {
  const dataDirPath = getDataDirPath();
  const filePath = path.join(dataDirPath, "weather-service-url.txt");

  const exists = fs.existsSync(filePath);
  if (exists) {
    const content = fs.readFileSync(filePath, { encoding: "utf8" });
    return content.trim();
  }

  return null;
}

function downloadData() {
  const url = getUrl();
  if (!url) {
    return;
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const content = JSON.stringify(data, null, 2);
      const filePath = getDataFilePath();
      fs.writeFileSync(filePath, content, { encoding: "utf8" });
      cachedData = data;
    });
}

// setup automatic download of new weather information every 5 min.
setInterval(downloadData, 1000 * 60 * 5);
downloadData();

export function getTemperature() {
  const data = getCachedData();
  return data.current.temp;
}

export function getFeelsLikeTemperature() {
  const data = getCachedData();
  return data.current.feels_like;
}

export function getSunUp() {
  const data = getCachedData();
  return moment.unix(data.current.sunrise);
}

export function getSunDown() {
  const data = getCachedData();
  return moment.unix(data.current.sunset);
}

export function getPressure() {
  const data = getCachedData();
  return data.current.pressure;
}

export function getHumidity() {
  const data = getCachedData();
  return data.current.humidity;
}

export function getWindSpeed() {
  const data = getCachedData();
  return data.current.wind_speed;
}

export function getIconCode() {
  const data = getCachedData();
  const weather = data.current.weather;

  if (!weather || weather.length !== 1) {
    return -1;
  }

  const code = weather[0].icon || "";

  switch (code.toLowerCase()) {
    case "01d":
      return 1; // sunny
    case "01n":
      return 2; // clear night
    case "02d":
      return 3; // cloudy with sun
    case "02n":
      return 4; // cloudy with moon
    case "03d":
    case "03n":
    case "04d":
    case "04n":
      return 5; // cloudy
    case "09d":
    case "09n":
    case "10d":
    case "10n":
      return 6; // rainy
    case "11d":
    case "11n":
      return 7; // Cloudy With Rain And Lightning
    case "13d":
    case "13n":
      return 8; // snowy
    case "50d":
    case "50n":
      return 9; // SunnyWithWind
    default:
      return -1;
  }
}
