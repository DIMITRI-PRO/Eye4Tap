import * as React from "react";

const SvgArrowLeftCircle = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="arrow-left-circle_svg__feather arrow-left-circle_svg__feather-arrow-left-circle"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle cx={12} cy={12} r={10} />
    <path d="m12 8-4 4 4 4M16 12H8" />
  </svg>
);
export default SvgArrowLeftCircle;
