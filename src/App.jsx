import { useEffect, useState } from "react";
import Canvas from "./components/Canvas";
import "./assets/styles/global.scss";
import Title from "./components/Title/Title";
import { BackgroundHeightProvider, useBackgroundHeight } from "./context/BackgroundHeightContext";
import BigBox from "./components/BigBox";
import Projects from "./components/Projects/Projects";
import Navbar from "./components/Navbar/Navbar";
import Logo from "./components/Logo/Logo";
import PlayView from "./components/PlayView/PlayView";

export default function App() {
    const [mapRow, setMapRow] = useState({ row: 0, precedentRow: 0 });
    const backgroundHeight = useBackgroundHeight();
    const [isPlayed, setIsPlayed] = useState(false);
    const [toExp, setToExp] = useState(false);

    const playMode = () => {
        setIsPlayed(true);
    };
    const viewMode = () => {
        setIsPlayed(false);
    };

    const goToExp = () => {
        setToExp(true);
    };
    useEffect(() => {
        console.log(window.innerHeight, window.innerWidth);
    }, []);
    return (
        <>
            <PlayView playMode={playMode} viewMode={viewMode} isPlayed={isPlayed} />
            <Logo />
            <Navbar />
            <BackgroundHeightProvider>
                <BigBox backgroundheight={backgroundHeight}>
                    <div className="canvas">
                        <Canvas
                            mapRow={mapRow}
                            setMapRow={setMapRow}
                            isPlayed={isPlayed}
                            toExp={toExp}
                        />
                    </div>
                    <section className="main__section">
                        <div className="title">
                            <Title />
                        </div>
                        <div className="wrapper"></div>
                        <div className="content">{!isPlayed && <Projects goToExp={goToExp} />}</div>
                    </section>
                </BigBox>
            </BackgroundHeightProvider>
        </>
    );
}
