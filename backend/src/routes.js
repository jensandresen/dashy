import { getVersion } from "./system";
import {
  getTemperature,
  getIconCode,
  getFeelsLikeTemperature,
  getHumidity,
  getPressure,
  getSunDown,
  getSunUp,
  getWindSpeed,
  getUpcomming,
  getHourly,
} from "./weather";

export default function registerRoutes(app) {
  app.get("/api/system/version", (req, res) => {
    res.send({
      version: getVersion(),
    });
  });

  app.get("/api/weather/current", (req, res) => {
    res.send({
      temperature: getTemperature(),
      feelsLikeTemperature: getFeelsLikeTemperature(),
      sunUp: getSunUp(),
      sunDown: getSunDown(),
      pressure: getPressure(),
      humidity: getHumidity(),
      wind: getWindSpeed(),
      iconCode: getIconCode(),
    });
  });

  app.get("/api/weather/upcomming", (req, res) => {
    res.send({
      days: getUpcomming(),
    });
  });

  app.get("/api/weather/hourly", (req, res) => {
    res.send({
      hours: getHourly(),
    });
  });
}
