import React, { useEffect, useState } from "react";
import Widgets from "./widgets";
import Sidebar from "components/sidebar";
import { subscribe } from "./domain-events";

export default function App() {
  const [number, setNumber] = useState("?");

  useEffect(() => {
    const unsubscribe = subscribe("new random number", ({ value }) =>
      setNumber(value)
    );
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <Sidebar side="left">
        <Widgets.Time />

        <div>
          <br />
          <br />
          <br />
          <h1>{number}</h1>
        </div>
      </Sidebar>

      <Sidebar side="right">{/* <Widgets.CurrentWeather /> */}</Sidebar>
    </div>
  );
}
