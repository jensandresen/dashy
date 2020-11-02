/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export default function Title({ children }) {
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
