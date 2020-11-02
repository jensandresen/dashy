import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import "./index.css";
import App from "./App";

let appVersion = null;
setInterval(() => {
  fetch("api/system/version")
    .then((response) => response.json())
    .then((data) => {
      if (data && data.version) {
        if (!appVersion) {
          appVersion = data.version;
        } else {
          if (appVersion != data.version) {
            window.location.href = "/";
          }
        }
      }
    });
}, 1000 * 60);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
