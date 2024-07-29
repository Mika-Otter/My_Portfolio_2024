import React from "react";
import s from "./Navbar.module.scss";
import AudioPlayer from "../Audio/Audio";
import PlayView from "../PlayView/PlayView";
import Logo from "../Logo/Logo";
import SecretsFound from "../SecretsFound/SecretsFound";

export default function Navbar({
  activeSound,
  isMenu,
  contact,
  closeMenu,
  closeContact,
  handleMenu,
  handleContact,
  playMode,
  viewMode,
  isPlayed,
  firstControls,
  handleControls,
  handleGoToHome,
  foundSecrets,
}) {
  return (
    <div className={s.navbar}>
      <div className={s.navbar__rotator}>
        <div className={s.navbar__logo}>
          <Logo handleGoToHome={handleGoToHome} color={"#071126"} />
        </div>
        <div className={s.navbar__ctn}>
          <div className={s.navbar__ctn__menus}>
            <div className={s.navbar__ctn__wrapper}>
              <div
                className={s.navbar__ctn__button}
                onClick={() => {
                  handleContact();
                  isMenu && closeMenu();
                }}
              >
                <span>CONTACT </span>
                <span>CONTACT </span>
              </div>
            </div>
            <div
              className={s.navbar__ctn__wrapper}
              onClick={() => {
                handleMenu();
                contact && closeContact();
              }}
            >
              <div className={s.navbar__ctn__button}>
                <span>MENU</span>
                <span>MENU</span>
              </div>
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
        <div className={s.navbar__soundsecrets}>
          <div className={s.navbar__secrets}>
            <SecretsFound foundSecrets={foundSecrets} />
          </div>
          <div className={s.navbar__sound}>
            <AudioPlayer activeSound={activeSound} color={"#071126"} />
          </div>
        </div>
      </div>
    </div>
  );
}
