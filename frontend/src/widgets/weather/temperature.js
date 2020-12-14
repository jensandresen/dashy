import React from "react";
import { PowerOf } from "components/text";

export default function Temperature({ temperature }) {
  return (
    <span>
      {(temperature || 0).toFixed(0)}
      <PowerOf>o</PowerOf>
    </span>
  );
}
