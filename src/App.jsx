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
import CanvasTest from "./components/CanvasTest";
// import Test from "./components/Test";

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
    const [RoomLevel, setRoomLevel] = useState(1);

    const changeRoom = () => {
        setRoomLevel(2);
    };

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

    useGSAP(() => {
        if (RoomLevel) {
            gsap.set(overlayRef.current, {
                zIndex: 9000,
            });
            gsap.to(overlayRef.current, {
                opacity: 1,
            });
        }
        setTimeout(() => {
            gsap.to(overlayRef.current, {
                opacity: 0,
            });
            gsap.set(overlayRef.current, {
                zIndex: -3,
            });
        }, 1500);
    }, [RoomLevel]);

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
                        <CanvasTest
                            mapRow={mapRow}
                            setMapRow={setMapRow}
                            isPlayed={isPlayed}
                            toExp={toExp}
                            changetoExp={changetoExp}
                            RoomLevel={RoomLevel}
                            changeRoom={changeRoom}
                        />
                    </div>

                    <section className="main__section">
                        <div className="title">
                            <Title />
                        </div>
                        <div className="wrapper"></div>
                        <div className="content">
                            {!isPlayed && <Projects goToExp={goToExp} changeRoom={changeRoom} />}
                        </div>
                    </section>
                </BigBox>
            </BackgroundHeightProvider>
        </>
    );
}
