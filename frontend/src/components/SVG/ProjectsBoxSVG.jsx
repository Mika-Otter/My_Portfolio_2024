import * as React from "react";
export const ProjectsBoxSVG = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1447 571"
        fill="none"
        preserveAspectRatio="xMaxYMin"
        className="responsive-svg"
        {...props}
    >
        <clipPath filter="url(#a)" id="projectMask" clipPathUnits="objectBoundingBox">
            <path d="M0.515,1 h-0.483 l-0.032,-0.084 V0.195 L0.041,0.092 h0.409 l0.036,-0.091 H0.975 l0.026,0.067 v0.751 l-0.031,0.079 H0.555 L0.515,1" />
        </clipPath>
        <defs>
            <filter
                id="a"
                width={1460.5}
                height={584.5}
                x={-6.5}
                y={-6.5}
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feGaussianBlur in="BackgroundImageFix" stdDeviation={3.5} />
                <feComposite
                    in2="SourceAlpha"
                    operator="in"
                    result="effect1_backgroundBlur_32_852"
                />
                <feBlend in="SourceGraphic" in2="effect1_backgroundBlur_32_852" result="shape" />
            </filter>
        </defs>
    </svg>
);
