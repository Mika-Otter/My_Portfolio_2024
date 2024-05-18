import * as React from "react";
export const ArrowSVG = ({ color }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 36 24"
        fill="none"
        preserveAspectRatio="xMaxYMin"
        className="responsive-svg"
    >
        <path
            fill={color}
            d="M35.164 13.062a1.5 1.5 0 0 0 0-2.122l-9.546-9.546a1.5 1.5 0 1 0-2.122 2.122L31.982 12l-8.486 8.485a1.5 1.5 0 1 0 2.122 2.122l9.546-9.546ZM-.002 13.5h34.105v-3H-.002v3Z"
        />
    </svg>
);
