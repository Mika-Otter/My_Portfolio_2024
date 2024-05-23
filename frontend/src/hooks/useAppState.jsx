import { useState } from "react";

export default function useAppState() {
    const [mapRow, setMapRow] = useState({ row: 0, precedentRow: 0 });
    const [isPlayed, setIsPlayed] = useState(false);
    const [toExp, setToExp] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [activeSound, setActiveSound] = useState(false);
    const [isMenu, setIsMenu] = useState(false);
    const [RoomLevel, setRoomLevel] = useState(1);
    const [nextLevel, setNextLevel] = useState(false);
    const [goToHome, setGoToHome] = useState(false);
    const [transition, setTransition] = useState(false);
    const [contact, setContact] = useState(false);
    const [firstControls, setFirstControls] = useState(true);
    const [isControls, setIsControls] = useState(false);
    const [isOpenProject, setIsOpenProject] = useState(false);
    const [isDialog, setIsDialog] = useState(false);

    return {
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
    };
}
