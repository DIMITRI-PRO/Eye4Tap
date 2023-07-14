import * as React from "react";

const SvgTerminal = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="terminal_svg__feather terminal_svg__feather-terminal"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="m4 17 6-6-6-6M12 19h8" />
  </svg>
);
export default SvgTerminal;
