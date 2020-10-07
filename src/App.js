import React from "react";
import Widgets from "./widgets";
import Sidebar from "components/sidebar";

export default function App() {
  return (
    <div className="App">
      <Sidebar side="left">
        <Widgets.Time />
      </Sidebar>

      <Sidebar side="right">{/* <Widgets.CurrentWeather /> */}</Sidebar>
    </div>
  );
}
