import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

export default function Sidebar({ side = "left", children }) {
  const leftStyle = side == "left" ? "0" : "unset";
  const rightStyle = side == "right" ? "0" : "unset";

  const Bar = styled.div`
    position: absolute;
    top: 0;
    left: ${leftStyle};
    right: ${rightStyle};
    width: 20rem;
    bottom: 0;
    // border: 1px solid orange;
  `;

  return <Bar>{children}</Bar>;
}
