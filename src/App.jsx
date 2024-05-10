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
import AudioPlayer from "./components/Audio/Audio";
import Wind from "./components/Game/Environnement/Wind/Wind";
import Loader from "./components/Loader/Loader";
import Menu from "./components/Menu/Menu";

export default function App() {
    const [mapRow, setMapRow] = useState({ row: 0, precedentRow: 0 });
    const backgroundHeight = useBackgroundHeight();
    const [isPlayed, setIsPlayed] = useState(false);
    const [toExp, setToExp] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [activeSound, setActiveSound] = useState(false);
    const [isMenu, setIsMenu] = useState(false);

    const firstEnter = () => {
        setActiveSound(true);
    };

    const handleMenu = () => {
        setIsMenu((prev) => !prev);
        console.log(isMenu);
    };

    const playMode = () => {
        setIsPlayed(true);
    };
    const viewMode = () => {
        setIsPlayed(false);
    };

    const goToExp = () => {
        setToExp(true);
    };
    // useEffect(() => {
    //     console.log(window.innerHeight, window.innerWidth);
    // }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsLoading(true);
            setWindowWidth(window.innerWidth);
            window.location.reload();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // useEffect(() => {
    //     setIsLoading(false);
    // }, [windowWidth]);

    return (
        <>
            {isLoading ? <Loader firstEnter={firstEnter} /> : null}

            <PlayView playMode={playMode} viewMode={viewMode} isPlayed={isPlayed} />
            <Logo />
            <Navbar activeSound={activeSound} handleMenu={handleMenu} />
            <Menu isMenu={isMenu} handleMenu={handleMenu} />
            <BackgroundHeightProvider>
                <BigBox backgroundheight={backgroundHeight}>
                    <div className="windcanvas">
                        <Wind />
                    </div>
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
