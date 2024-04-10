import React, { useEffect } from "react";
import { useBackgroundHeight } from "../context/BackgroundHeightContext";

export default function BigBox({ children }) {
    const backgroundheight = useBackgroundHeight();

    useEffect(() => {
        console.log(backgroundheight);
    }, [backgroundheight]);
    return (
        <>
            <div className="bigbox" style={{ height: `${backgroundheight}px` }}>
                {children}
            </div>
        </>
    );
}
