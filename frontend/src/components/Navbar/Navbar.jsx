import React from "react";
import s from "./Navbar.module.scss";
import AudioPlayer from "../Audio/Audio";
import PlayView from "../PlayView/PlayView";
import Logo from "../Logo/Logo";

export default function Navbar({
    activeSound,
    handleMenu,
    handleContact,
    playMode,
    viewMode,
    isPlayed,
    firstControls,
    handleControls,
    handleGoToHome,
}) {
    return (
        <div className={s.navbar}>
            <div className={s.navbar__rotator}>
                <div className={s.navbar__logo}>
                    <Logo handleGoToHome={handleGoToHome} />
                </div>

                <div className={s.navbar__ctn}>
                    <div className={s.navbar__ctn__wrapper}>
                        <div className={s.navbar__ctn__button} onClick={() => handleContact()}>
                            <span>CONTACT </span>
                            <span>CONTACT </span>
                        </div>
                    </div>
                    <div
                        className={s.navbar__ctn__wrapper}
                        onClick={() => {
                            handleMenu();
                        }}
                    >
                        <div className={s.navbar__ctn__button}>
                            <span>MENU</span>
                            <span>MENU</span>
                        </div>
                    </div>
                    <div className={s.navbar__ctn__playview}>
                        <PlayView
                            playMode={playMode}
                            viewMode={viewMode}
                            isPlayed={isPlayed}
                            firstControls={firstControls}
                            handleControls={handleControls}
                        />
                    </div>
                </div>

                <div className={s.navbar__sound}>
                    <AudioPlayer activeSound={activeSound} />
                </div>
            </div>
        </div>
    );
}
