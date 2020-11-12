import React from "react";
import styled from "@emotion/styled";

export function Columns({ height = null, children }) {
  const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: flex-start;
    align-content: space-between;
    height: ${height ? height : "unset"};
  `;

  return <Container>{children}</Container>;
}

export function Column({ children }) {
  const Container = styled.div`
    flex-grow: 1;
    margin-left: 0.5rem;
    margin-right: 0.5rem;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }

    // border: 1px dashed pink;
  `;

  return <Container>{children}</Container>;
}
