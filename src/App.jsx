import { useEffect, useState } from "react";
import Canvas from "./components/Canvas";
import "./assets/styles/global.scss";
import Title from "./components/Title/Title";
import { BackgroundHeightProvider } from "./context/BackgroundHeightContext";

export default function App() {
    const [mapRow, setMapRow] = useState({ row: 0, precedentRow: 0 });
    const {setBackgroundHeight}

    return (
        <>
            <BackgroundHeightProvider>
                <main>
                    <div className="canvas">
                        <Canvas mapRow={mapRow} setMapRow={setMapRow} />
                    </div>
                    <section>
                        <div className="title">
                            <Title />
                        </div>
                        <div className="wrapper"></div>
                        <div className="content">
                            <div className="content__box"></div>
                        </div>
                    </section>
                </main>
            </BackgroundHeightProvider>
        </>
    );
}
