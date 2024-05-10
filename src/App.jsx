import { useEffect, useState, useRef } from "react";
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
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function App() {
    const [mapRow, setMapRow] = useState({ row: 0, precedentRow: 0 });
    const backgroundHeight = useBackgroundHeight();
    const [isPlayed, setIsPlayed] = useState(false);
    const [toExp, setToExp] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [activeSound, setActiveSound] = useState(false);
    const [isMenu, setIsMenu] = useState(false);
    const overlayRef = useRef();

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

    const changetoExp = () => {
        setToExp(false);
    };
    useEffect(() => {
        // console.log("bidon bidon", toExp);
    }, [toExp]);
    // useEffect(() => {
    //     console.log(window.innerHeight, window.innerWidth);
    // }, []);

    // useGSAP(() => {
    //     if (toExp) {
    //         gsap.set(overlayRef.current, {
    //             zIndex: 10000,
    //         });
    //         gsap.to(overlayRef.current, {
    //             opacity: 1,
    //         });
    //     }
    //     setTimeout(() => {
    //         gsap.to(overlayRef.current, {
    //             opacity: 0,
    //         });
    //         gsap.set(overlayRef.current, {
    //             zIndex: -3,
    //         });
    //     }, 500);
    // }, [toExp]);

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
            <div className="overlay" ref={overlayRef}></div>
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
                            changetoExp={changetoExp}
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
