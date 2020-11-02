import { getVersion } from "./system";
import { getTemperature } from "./weather";

export default function registerRoutes(app) {
  app.get("/api/system/version", (req, res) => {
    res.send({
      version: getVersion(),
    });
  });

  app.get("/api/weather/current", (req, res) => {
    res.send({
      temperature: getTemperature(),
      sunUp: "?",
      sunDown: "?",
    });
  });
}
