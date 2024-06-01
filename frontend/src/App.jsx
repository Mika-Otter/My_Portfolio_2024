import { useEffect, useRef, useState, useCallback } from "react";
import "./styles/global.scss";
import Title from "./components/Title/Title";
import {
  BackgroundHeightProvider,
  useBackgroundHeight,
} from "./context/BackgroundHeightContext";
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
import { DeltaTimeProvider } from "./components/DeltaTimeProvider";
import ScrollDiscover from "./components/ScrollDiscover/ScrollDiscover";
import Location from "./components/Location/Location";

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

  const handleIsDialog = useCallback(() => {
    setIsDialog(true);
    setTimeout(() => {
      setIsDialog(false);
    }, 8500);
  }, []);

  const handleControls = useCallback(() => {
    setIsControls((prev) => !prev);
    if (firstControls) {
      setFirstControls(false);
    }
  }, [firstControls]);

  const firstPlay = useCallback(() => {
    if (firstControls) {
      handleControls();
    }
  }, [firstControls, handleControls]);

  const activePlay = useCallback(() => {
    setIsPlayed(true);
  }, []);

  const openProject = useCallback(() => {
    setIsOpenProject(true);
  }, []);
  const closeProject = useCallback(() => {
    setIsOpenProject(false);
  }, []);

  const handleContact = useCallback(() => {
    setContact((prev) => !prev);
  }, []);

  const handleNextLevel = useCallback(() => {
    setNextLevel((prev) => !prev);
    handleTransition(setTransition);
  }, [handleTransition, setTransition]);

  const changeRoomOne = useCallback(() => {
    setRoomLevel(1);
    window.scrollTo(0, 0);
  }, []);

  const changeRoom = useCallback(() => {
    setRoomLevel(2);
  }, []);

  const firstEnter = useCallback(() => {
    setActiveSound(true);
  }, []);

  const handleMenu = useCallback(() => {
    setIsMenu((prev) => !prev);
  }, []);

  const playMode = useCallback(() => {
    setIsPlayed(true);
  }, []);

  const viewMode = useCallback(() => {
    setIsPlayed(false);
  }, []);

  const handleGoToHome = useCallback(() => {
    handleTransition(setTransition);
    setGoToHome((prev) => !prev);
    playMode();
    setTimeout(() => {
      viewMode();
    }, 2000);
  }, [handleTransition, setTransition, playMode, viewMode]);

  const goToExp = useCallback(() => {
    setToExp(true);
  }, []);

  const changetoExp = useCallback(() => {
    setToExp(false);
  }, []);

  useEffect(() => {
    startTransition(transition);
  }, [transition]);

  const backgroundHeight = useBackgroundHeight();

  return (
    <>
      <DeltaTimeProvider>
        <div className="test" ref={testRef}>
          <MushroomEffect isEatMushroom={isEatMushroom} />
        </div>
        <div className="overlay" ref={overlayRef}>
          <div className="overlay-div" ref={overlayOneRef}></div>
          <div className="overlay-div" ref={overlayTwoRef}></div>
          <div className="overlay-div" ref={overlayThreeRef}></div>
          <div className="overlay-div" ref={overlayFourRef}></div>
        </div>
        {isLoading ? <Loader firstEnter={firstEnter} /> : null}

        {isControls && <Controls handleControls={handleControls} closeProject={closeProject}/>}
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
          handleGoToHome={handleGoToHome}
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
        <Location />
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
                <ScrollDiscover />
              </div>
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
      </DeltaTimeProvider>
    </>
  );
}
