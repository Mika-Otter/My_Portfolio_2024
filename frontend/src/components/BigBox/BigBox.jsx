import React, { useEffect } from "react";
import { useBackgroundHeight } from "../../context/BackgroundHeightContext";
import s from "./BigBox.module.scss";

export default function BigBox({ children }) {
    const backgroundheight = useBackgroundHeight();

    // useEffect(() => {
    //     console.log(backgroundheight);
    // }, [backgroundheight]);
    return (
        <>
            <div className={s.bigbox} style={{ height: `${backgroundheight}px` }}>
                {children}
            </div>
        </>
    );
}
