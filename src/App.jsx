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
import Contact from "./components/Contact/Contact";
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
    const overlayOneRef = useRef();
    const overlayTwoRef = useRef();
    const overlayThreeRef = useRef();
    const overlayFourRef = useRef();
    const [RoomLevel, setRoomLevel] = useState(1);
    const [nextLevel, setNextLevel] = useState(false);
    const [goToHome, setGoToHome] = useState(false);
    const [transition, setTransition] = useState(false);
    const [contact, setContact] = useState(false);

    const handleContact = () => {
        setContact(true);
    };

    const handleTransition = () => {
        setTransition((prev) => !prev);
    };

    const handleNextLevel = () => {
        setNextLevel((prev) => !prev);
        handleTransition();
    };
    const changeRoomOne = () => {
        setRoomLevel(1);
        window.scrollTo(0, 0);
    };
    const changeRoom = () => {
        setRoomLevel(2);
    };

    const handleGoToHome = () => {
        handleTransition();
        setGoToHome((prev) => !prev);
        playMode();

        setTimeout(() => {
            viewMode();
        }, 2000);
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
        if (transition === true) {
            gsap.set(overlayRef.current, {
                zIndex: 9000,
            });

            const tl = gsap.timeline();

            tl.to(
                overlayOneRef.current,
                {
                    x: "100%",
                    duration: 0.9,
                    ease: "power3.inOut",
                },
                0
            )
                .to(
                    overlayTwoRef.current,
                    {
                        x: "100%",
                        duration: 0.9,
                        ease: "power3.inOut",
                        delay: 0.2,
                    },
                    0
                )
                .to(
                    overlayThreeRef.current,
                    {
                        x: "100%",
                        duration: 0.9,
                        ease: "power3.inOut",
                        delay: 0.4,
                    },
                    0
                )
                .to(
                    overlayFourRef.current,
                    {
                        x: "100%",
                        duration: 0.9,
                        ease: "power3.inOut",
                        delay: 0.6,
                    },
                    0
                )
                .to(
                    overlayOneRef.current,
                    {
                        x: "200%",
                        duration: 0.9,
                        ease: "power3.inOut",
                    },
                    2
                )
                .to(
                    overlayTwoRef.current,
                    {
                        x: "200%",
                        duration: 0.9,
                        ease: "power3.inOut",
                        delay: 0.2,
                    },
                    2
                )
                .to(
                    overlayThreeRef.current,
                    {
                        x: "200%",
                        duration: 0.9,
                        ease: "power3.inOut",
                        delay: 0.4,
                    },
                    2
                )
                .to(
                    overlayFourRef.current,
                    {
                        x: "200%",
                        duration: 0.9,
                        ease: "power3.inOut",
                        delay: 0.6,
                    },
                    2
                );
            handleTransition();
            setTimeout(() => {
                gsap.set(overlayRef.current, {
                    zIndex: -3,
                });
                gsap.set(overlayOneRef.current, {
                    x: "-100%",
                });
                gsap.set(overlayTwoRef.current, {
                    x: "-100%",
                });
                gsap.set(overlayThreeRef.current, {
                    x: "-100%",
                });
                gsap.set(overlayFourRef.current, {
                    x: "-100%",
                });
            }, 3500);
        }
    }, [transition]);

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
            <div className="overlay" ref={overlayRef}>
                <div className="overlay-div" ref={overlayOneRef}></div>
                <div className="overlay-div" ref={overlayTwoRef}></div>
                <div className="overlay-div" ref={overlayThreeRef}></div>
                <div className="overlay-div" ref={overlayFourRef}></div>
            </div>
            {isLoading ? <Loader firstEnter={firstEnter} /> : null}
            <PlayView playMode={playMode} viewMode={viewMode} isPlayed={isPlayed} />
            <Logo />
            <Navbar
                activeSound={activeSound}
                handleMenu={handleMenu}
                handleTransition={handleTransition}
            />
            <Menu
                isMenu={isMenu}
                handleMenu={handleMenu}
                handleGoToHome={handleGoToHome}
                handleTransition={handleTransition}
                contact={contact}
                handleContact={handleContact}
            />
            {contact ? <Contact /> : null}

            <BackgroundHeightProvider>
                <BigBox backgroundheight={backgroundHeight}>
                    {RoomLevel === 1 ? (
                        <div className="windcanvas">
                            <Wind />
                        </div>
                    ) : null}

                    <div className="canvas">
                        <CanvasTest
                            mapRow={mapRow}
                            setMapRow={setMapRow}
                            isPlayed={isPlayed}
                            toExp={toExp}
                            changetoExp={changetoExp}
                            RoomLevel={RoomLevel}
                            changeRoom={changeRoom}
                            nextLevel={nextLevel}
                            handleNextLevel={handleNextLevel}
                            goToHome={goToHome}
                            handleGoToHome={handleGoToHome}
                            changeRoomOne={changeRoomOne}
                        />
                    </div>

                    <section className="main__section">
                        <div className="title">
                            <Title />
                        </div>
                        <div className="wrapper"></div>
                        <div className="content">
                            {!isPlayed && RoomLevel === 1 ? (
                                <Projects handleNextLevel={handleNextLevel} nextLevel={nextLevel} />
                            ) : null}
                        </div>
                        {!isPlayed && <div className="plaster"></div>}
                    </section>
                </BigBox>
            </BackgroundHeightProvider>
        </>
    );
}
