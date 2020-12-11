import React from "react";
import Widgets from "./widgets";
import { Columns, Column } from "components/layout";

export default function App() {
  return (
    <Columns>
      <Column>
        <Widgets.Time />
      </Column>
      <Column></Column>
      <Column></Column>
      <Column>
        <Widgets.CurrentWeather />
        <Widgets.UpcommingWeather />
      </Column>
    </Columns>
  );
}
