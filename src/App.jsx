import { useEffect, useState } from "react";
import Canvas from "./components/Canvas";
import "./assets/styles/global.scss";
import Title from "./components/Title/Title";
import { BackgroundHeightProvider, useBackgroundHeight } from "./context/BackgroundHeightContext";
import BigBox from "./components/BigBox";

export default function App() {
    const [mapRow, setMapRow] = useState({ row: 0, precedentRow: 0 });
    const backgroundHeight = useBackgroundHeight();

    return (
        <>
            <BackgroundHeightProvider>
                <BigBox backgroundheight={backgroundHeight}>
                    <div className="canvas">
                        <Canvas mapRow={mapRow} setMapRow={setMapRow} />
                    </div>
                    <section className="main__section">
                        <div className="title">
                            <Title />
                        </div>
                        <div className="wrapper"></div>
                        <div className="content">
                            <div className="content__box"></div>
                        </div>
                    </section>
                </BigBox>
            </BackgroundHeightProvider>
        </>
    );
}
