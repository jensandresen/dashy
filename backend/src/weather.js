import fs from "fs";
import path from "path";
import fetch from "node-fetch";

function getDataFilePath() {
  const dataDir = process.env.DATA_DIR || path.resolve(process.cwd(), "data");
  return path.resolve(dataDir, "weather.json");
}

function getData() {
  const filePath = getDataFilePath();
  const content = fs.readFileSync(filePath, { encoding: "utf8" });
  return JSON.parse(content);
}

function downloadData() {
  const url = process.env.WEATHER_DATA_URL;
  if (!url) {
    return;
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const content = JSON.stringify(data, null, 2);
      const filePath = getDataFilePath();
      fs.writeFileSync(filePath, content, { encoding: "utf8" });
    });
}

// setup automatic download of new weather information every 5 min.
setInterval(downloadData, 1000 * 60 * 5);
downloadData();

export function getTemperature() {
  const data = getData();
  return data.current.temp;
}
