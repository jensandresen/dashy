/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export function Title({ children }) {
  return (
    <div
      css={css`
        font-size: 1.5rem;
        line-height: 1.5rem;
      `}
    >
      {children}
    </div>
  );
}

export function Big({ children }) {
  return (
    <span
      css={css`
        font-size: 6rem;
        line-height: 6rem;
      `}
    >
      {children}
    </span>
  );
}

export function PowerOf({ children }) {
  return (
    <span
      css={css`
        font-size: 0.25em;
        margin-left: 0.1em;
        position: relative;
        top: -2em;
        text-transform: uppercase;
      `}
    >
      {children}
    </span>
  );
}
