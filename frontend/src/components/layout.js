import React from "react";
import styled from "@emotion/styled";

export function Columns({ children }) {
  const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: flex-start;
    align-content: space-between;
  `;

  return <Container>{children}</Container>;
}

export function Column({ children }) {
  const Container = styled.div`
    flex-grow: 1;
  `;

  return <Container>{children}</Container>;
}
