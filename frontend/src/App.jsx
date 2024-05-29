import { useEffect, useRef, useState } from "react";
import "./styles/global.scss";
import Title from "./components/Title/Title";
import { BackgroundHeightProvider, useBackgroundHeight } from "./context/BackgroundHeightContext";
import BigBox from "./components/BigBox/BigBox";
import Projects from "./components/Projects/Projects";
import Navbar from "./components/Navbar/Navbar";
import Logo from "./components/Logo/Logo";
import PlayView from "./components/PlayView/PlayView";
import Wind from "./components/Game/Environnement/Wind/Wind";
import Loader from "./components/Loader/Loader";
import Menu from "./components/Menu/Menu";
import Contact from "./components/Contact/Contact";
import Controls from "./components/Controls/Controls";
import useAppState from "./hooks/useAppState";
import useAppTransition from "./hooks/useAppTransition";
import useResize from "./hooks/useResize";
import Dialog from "./components/Game/Dialog/Dialog";
import MushroomEffect from "./components/MushroomEffect/MushroomEffect";
import Canvas from "./components/Canvas";

export default function App() {
    const testRef = useRef(null);
    const {
        mapRow,
        setMapRow,
        isPlayed,
        setIsPlayed,
        toExp,
        setToExp,
        isLoading,
        setIsLoading,
        windowWidth,
        setWindowWidth,
        activeSound,
        setActiveSound,
        isMenu,
        setIsMenu,
        RoomLevel,
        setRoomLevel,
        nextLevel,
        setNextLevel,
        goToHome,
        setGoToHome,
        transition,
        setTransition,
        contact,
        setContact,
        firstControls,
        setFirstControls,
        isControls,
        setIsControls,
        isOpenProject,
        setIsOpenProject,
        isDialog,
        setIsDialog,
        secretText,
        setSecretText,
    } = useAppState();

    const [isEatMushroom, setIsEatMushroom] = useState(false);

    const eatingMushroomEffect = () => {
        setIsEatMushroom(true);

        setTimeout(() => {
            setIsEatMushroom(false);
        }, 15000);
    };

    const {
        overlayRef,
        overlayOneRef,
        overlayTwoRef,
        overlayThreeRef,
        overlayFourRef,
        handleTransition,
        startTransition,
    } = useAppTransition();

    useResize(setWindowWidth, setIsLoading);

    const activeCatSecret = () => {
        setSecretText("cat");
    };
    const activeRobotSecret = () => {
        setSecretText("robot");
    };

    const handleIsDialog = () => {
        setIsDialog(true);
        setTimeout(() => {
            setIsDialog(false);
        }, 8500);
    };

    const handleControls = () => {
        setIsControls((prev) => !prev);
        if (firstControls) {
            setFirstControls(false);
        }
    };

    const firstPlay = () => {
        if (firstControls) {
            handleControls();
        }
    };

    const activePlay = () => {
        setIsPlayed(true);
    };

    const openProject = () => {
        setIsOpenProject(true);
    };

    const closeProject = () => {
        setIsOpenProject(false);
    };

    const handleContact = () => {
        setContact((prev) => !prev);
    };

    const handleNextLevel = () => {
        setNextLevel((prev) => !prev);
        handleTransition(setTransition);
    };

    const changeRoomOne = () => {
        setRoomLevel(1);
        window.scrollTo(0, 0);
    };

    const changeRoom = () => {
        setRoomLevel(2);
    };

    const handleGoToHome = () => {
        handleTransition(setTransition);
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
        startTransition(transition);
    }, [transition]);

    const backgroundHeight = useBackgroundHeight();
    useEffect(() => {
        console.log("hello", backgroundHeight);
    }, [backgroundHeight]);

    useEffect(() => {
        console.log("Initial isDialog:", isDialog);
    }, []);

    useEffect(() => {
        console.log("Render isDialog:", isDialog);
    }, [isDialog]);

    return (
        <>
            <div className="test" ref={testRef}>
                <MushroomEffect isEatMushroom={isEatMushroom} />
            </div>
            <div className="overlay" ref={overlayRef}>
                <div className="overlay-div" ref={overlayOneRef}></div>
                <div className="overlay-div" ref={overlayTwoRef}></div>
                <div className="overlay-div" ref={overlayThreeRef}></div>
                <div className="overlay-div" ref={overlayFourRef}></div>
            </div>
            {/* {isLoading ? <Loader firstEnter={firstEnter} /> : null} */}
            {/* <PlayView
                playMode={playMode}
                viewMode={viewMode}
                isPlayed={isPlayed}
                firstControls={firstControls}
                handleControls={handleControls}
            /> */}
            {isControls && <Controls handleControls={handleControls} />}
            <Navbar
                activeSound={activeSound}
                handleMenu={handleMenu}
                handleTransition={() => handleTransition(setTransition)}
                handleContact={handleContact}
                playMode={playMode}
                viewMode={viewMode}
                isPlayed={isPlayed}
                firstControls={firstControls}
                handleControls={handleControls}
            />
            <Menu
                isMenu={isMenu}
                handleMenu={handleMenu}
                handleGoToHome={handleGoToHome}
                handleTransition={() => handleTransition(setTransition)}
                handleContact={handleContact}
                handleControls={handleControls}
                activePlay={activePlay}
            />
            <Contact handleContact={handleContact} contact={contact} />
            <Dialog text="yoooo" isDialog={isDialog} secretText={secretText} />
            <BackgroundHeightProvider>
                <BigBox backgroundheight={backgroundHeight}>
                    {RoomLevel === 1 ? (
                        <div className="windcanvas">
                            <Wind />
                        </div>
                    ) : null}

                    <div className="canvas">
                        <Canvas
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
                            contact={contact}
                            isMenu={isMenu}
                            isOpenProject={isOpenProject}
                            handleIsDialog={handleIsDialog}
                            activeCatSecret={activeCatSecret}
                            activeRobotSecret={activeRobotSecret}
                            testRef={testRef}
                            eatingMushroomEffect={eatingMushroomEffect}
                            handleContact={handleContact}
                        />
                    </div>

                    <section className="main__section">
                        <div className="title">
                            <Title />
                        </div>
                        <div className="wrapper"></div>
                        <div className="content">
                            {!isPlayed && RoomLevel === 1 && !contact ? (
                                <Projects
                                    handleNextLevel={handleNextLevel}
                                    nextLevel={nextLevel}
                                    isOpenProject={isOpenProject}
                                    openProject={openProject}
                                    closeProject={closeProject}
                                />
                            ) : null}
                        </div>
                    </section>
                </BigBox>
            </BackgroundHeightProvider>
        </>
    );
}
