import * as React from "react";
export const LogoSVG = ({ props, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1957 1956"
    preserveAspectRatio="xMaxYMin"
    className="responsive-svg"
    fill="none"
    {...props}
  >
    <path
      fill={color}
      fillRule="evenodd"
      d="M1.005 0H.002v1630H0v326h1956v-326H326.002V326H1957V0H1.005ZM1467 489v326H815.003v652h-326V815H815V489h652Z"
      clipRule="evenodd"
    />
  </svg>
);
