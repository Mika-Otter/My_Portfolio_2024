import React, { useEffect, useRef, useState } from "react";
import s from "./Controls.module.scss";
import cn from "classnames";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowSVG } from "../SVG/ArrowSVG";
import { ArrowLetsTalkSVG } from "../SVG/ArrowLetsTalksSVG";

import { useKeyInteractAnimation } from "./hooks/useKeyInteractAnimation";
import { useProjectAnimation } from "./hooks/useProjectAnimation";

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

            <div className={s.controls__content}>
              <div className={s.controls__content__left}>
                <div className={s.controls__content__left__runleft}>
                  <span>Run to the left</span>
                  <div className={s.controls__content__keys}>
                    <div className={s.controls__key}>
                      <div
                        className={s.controls__key__front}
                        ref={keyLeftArrowRef}
                      >
                        <div
                          className={cn(
                            s.controls__key__front__arrow,
                            s.controls__key__front__arrow__left
                          )}
                        >
                          <ArrowLetsTalkSVG />
                        </div>
                      </div>
                      <div className={s.controls__key__back}></div>
                    </div>
                    <span>OR</span>
                    <div className={s.controls__key}>
                      <div className={s.controls__key__front} ref={keyLeftRef}>
                        {selectedKeyboard === "qwerty" ? (
                          <span>A</span>
                        ) : (
                          <span>Q</span>
                        )}
                      </div>
                      <div className={s.controls__key__back}></div>
                    </div>
                  </div>
                </div>
                <div className={s.controls__content__left__interact}>
                  <span>Try to interact</span>
                  <div className={s.controls__key}>
                    <div
                      className={s.controls__key__front}
                      ref={keyInteractRef}
                    >
                      {selectedKeyboard === "qwerty" ? (
                        <span>W</span>
                      ) : (
                        <span>Z</span>
                      )}
                    </div>
                    <div className={s.controls__key__back}></div>
                  </div>
                </div>
              </div>
              <div className={s.controls__content__center}>
                <div className={s.controls__content__center__video}>
                  <video
                    ref={videoRef}
                    src="./src/assets/video/controls.mp4"
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
              <div className={s.controls__content__right}>
                <div className={s.controls__content__right__runright}>
                  <span>Run to the right</span>
                  <div className={s.controls__content__keys}>
                    <div className={s.controls__key}>
                      <div className={s.controls__key__front} ref={keyRightRef}>
                        <span>D</span>
                      </div>
                      <div className={s.controls__key__back}></div>
                    </div>
                    <span>OR</span>
                    <div className={s.controls__key}>
                      <div
                        className={s.controls__key__front}
                        ref={keyRightArrowRef}
                      >
                        <div
                          className={cn(
                            s.controls__key__front__arrow,
                            s.controls__key__front__arrow__right
                          )}
                        >
                          <ArrowLetsTalkSVG />
                        </div>
                      </div>
                      <div className={s.controls__key__back}></div>
                    </div>
                  </div>
                </div>
                <div className={s.controls__content__right__space}>
                  <span>Jump</span>
                  <div className={s.controls__space}>
                    <div className={s.controls__space__front} ref={keySpaceRef}>
                      <span>SPACE</span>
                    </div>
                    <div className={s.controls__space__back}></div>
                  </div>
                </div>
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
