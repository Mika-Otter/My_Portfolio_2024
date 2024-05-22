export const handleControls = (setIsControls, firstControls, setFirstControls) => {
    setIsControls((prev) => !prev);
    if (firstControls) {
        setFirstControls(false);
    }
};

export const firstPlay = (firstControls, handleControls) => {
    if (firstControls) {
        handleControls();
    }
};

export const activePlay = (setIsPlayed) => {
    setIsPlayed(true);
};

export const openProject = (setisOpenProject) => {
    setisOpenProject(true);
};

export const closeProject = (setisOpenProject) => {
    setisOpenProject(false);
};

export const handleContact = (setContact, contact) => {
    setContact((prev) => !prev);
    console.log("oookkkeey", contact);
};

export const handleNextLevel = (setNextLevel, handleTransition, setTransition) => {
    setNextLevel((prev) => !prev);
    handleTransition(setTransition);
};

export const changeRoomOne = (setRoomLevel) => {
    setRoomLevel(1);
    window.scrollTo(0, 0);
};

export const changeRoom = (setRoomLevel) => {
    setRoomLevel(2);
};

export const handleGoToHome = (
    handleTransition,
    setTransition,
    setGoToHome,
    playMode,
    viewMode
) => {
    handleTransition(setTransition);
    setGoToHome((prev) => !prev);
    playMode();

    setTimeout(() => {
        viewMode();
    }, 2000);
};

export const firstEnter = (setActiveSound) => {
    setActiveSound(true);
};

export const handleMenu = (setIsMenu) => {
    setIsMenu((prev) => !prev);
};

export const playMode = (setIsPlayed) => {
    setIsPlayed(true);
};

export const viewMode = (setIsPlayed) => {
    setIsPlayed(false);
};

export const goToExp = (setToExp) => {
    setToExp(true);
};

export const changetoExp = (setToExp) => {
    setToExp(false);
};
