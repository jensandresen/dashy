/** @jsx jsx */
import { css, jsx } from "@emotion/core";
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
        <hr
          css={css`
            border: none;
            border-bottom: 1px solid #aaa;
          `}
        />
        <Widgets.HourlyWeather />
        <hr
          css={css`
            border: none;
            border-bottom: 1px solid #aaa;
          `}
        />
        <Widgets.UpcommingWeather />
      </Column>
    </Columns>
  );
}
