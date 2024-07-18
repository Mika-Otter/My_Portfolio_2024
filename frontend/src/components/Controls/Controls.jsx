import React, { useRef, useState } from "react";
import s from "./Controls.module.scss";
import cn from "classnames";
import { ArrowKeysSVG } from "../SVG/ArrowKeysSVG";
import { useKeyInteractAnimation } from "./hooks/useKeyInteractAnimation";
import { useProjectAnimation } from "./hooks/useProjectAnimation";
import controlsVideo from "../../assets/video/controls.mp4";

export default function Controls({ handleControls, isControls, closeProject }) {
  const videoRef = useRef(null);

  const projectWrapperRef = useRef(null);
  const projectRef = useRef(null);
  const qwertyRef = useRef(null);
  const keyLeftRef = useRef(null);
  const keyLeftArrowRef = useRef(null);
  const keyRightRef = useRef(null);
  const keyRightArrowRef = useRef(null);
  const keySpaceRef = useRef(null);
  const keyInteractRef = useRef(null);
  const [selectedKeyboard, setSelectedKeyboard] = useState("qwerty");
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);

  useKeyInteractAnimation(
    keyInteractRef,
    videoIsPlaying,
    keyRightRef,
    keyRightArrowRef,
    keyLeftRef,
    keyLeftArrowRef,
    keySpaceRef
  );
  useProjectAnimation(
    projectWrapperRef,
    projectRef,
    videoRef,
    isControls,
    closeProject,
    setVideoIsPlaying
  );

  return (
    <>
      <section className={s.controls__blur}>
        <div className={s.controls__wrapper} ref={projectWrapperRef}>
          <div className={s.controls} ref={projectRef}>
            <div className={s.controls__left}>
              <div className={s.controls__title}>
                <h2>CONTROLS</h2>
                <p>Please read these instructions before playing {"<"}3</p>
              </div>
              <div className={s.controls__keyboard}>
                <label htmlFor="keyboard">KEYBOARD : </label>
                <div className={s.controls__keyboard__ctn}>
                  <div className={s.controls__keyboard__input}>
                    <input
                      type="radio"
                      name="keyboard"
                      id="qwerty"
                      value="qwerty"
                      checked={selectedKeyboard === "qwerty"}
                      onChange={() => setSelectedKeyboard("qwerty")}
                    />
                    <label htmlFor="qwerty">QWERTY</label>
                  </div>
                  <div className={s.controls__keyboard__input}>
                    <input
                      type="radio"
                      name="keyboard"
                      id="azerty"
                      value="azerty"
                      checked={selectedKeyboard === "azerty"}
                      onChange={() => setSelectedKeyboard("azerty")}
                    />

                    <label htmlFor="azerty">AZERTY</label>
                  </div>
                </div>
              </div>
              <div className={s.controls__intructions}>
                <div
                  className={cn(
                    s.controls__instructions__item,
                    s.controls__instructions__item__runleft
                  )}
                >
                  <div className={s.controls__instructions__keys}>
                    <Key reference={keyLeftRef}>
                      {selectedKeyboard === "qwerty" ? (
                        <span>A</span>
                      ) : (
                        <span>Q</span>
                      )}
                    </Key>
                    <span>OR</span>
                    <Key reference={keyLeftArrowRef}>
                      <div
                        className={cn(
                          s.controls__instructions__keys__arrow,
                          s.controls__instructions__keys__arrow__left
                        )}
                      >
                        <ArrowKeysSVG />
                      </div>
                    </Key>
                    <span>Run to the left</span>
                  </div>
                </div>
                <div
                  className={cn(
                    s.controls__instructions__item,
                    s.controls__instructions__item__runright
                  )}
                >
                  <div className={s.controls__instructions__keys}>
                    <Key reference={keyRightRef}>
                      <span>D</span>
                    </Key>
                    <span>OR</span>
                    <Key reference={keyRightArrowRef}>
                      <div
                        className={cn(
                          s.controls__instructions__keys__arrow,
                          s.controls__instructions__keys__arrow__right
                        )}
                      >
                        <ArrowKeysSVG />
                      </div>
                    </Key>
                    <span>Run to the left</span>
                  </div>
                </div>
                <div
                  className={cn(
                    s.controls__instructions__item,
                    s.controls__instructions__item__jump
                  )}
                >
                  <div className={s.controls__instructions__keys}>
                    <Key reference={keySpaceRef} width={"large"}>
                      SPACE
                    </Key>
                    <span>Jump</span>
                  </div>
                </div>
                <div
                  className={cn(
                    s.controls__instructions__item,
                    s.controls__instructions__item__trytointeract
                  )}
                >
                  <div className={s.controls__instructions__keys}>
                    <Key reference={keyInteractRef}>
                      {selectedKeyboard === "qwerty" ? (
                        <span>W</span>
                      ) : (
                        <span>Z</span>
                      )}
                    </Key>
                    <span>OR</span>
                    <Key reference={keyInteractRef}>
                      <div
                        className={cn(
                          s.controls__instructions__keys__arrow,
                          s.controls__instructions__keys__arrow__top
                        )}
                      >
                        <ArrowKeysSVG />
                      </div>
                    </Key>
                    <span>Try to interact</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={s.controls__video}>
              <div className={s.controls__video__ctn}>
                <video
                  ref={videoRef}
                  src={controlsVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  disablePictureInPicture
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "5px",
                    objectFit: "cover",
                    marginBottom: "0.7rem",
                  }}
                  preload="auto"
                />
              </div>
            </div>
            <div className={s.controls__gotoplay}>
              <button type="button" onClick={() => handleControls()}>
                <span>GO TO PLAY !</span>
                <span>GO TO PLAY !</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Key({ children, reference, width }) {
  return (
    <div className={width === "large" ? s.controls__space : s.controls__key}>
      <div
        className={
          width === "large" ? s.controls__space__front : s.controls__key__front
        }
        ref={reference}
      >
        {children}
      </div>
      <div
        className={
          width === "large" ? s.controls__space__back : s.controls__key__back
        }
      ></div>
    </div>
  );
}
