import React, { useEffect, useRef, useState } from "react";
import s from "./Controls.module.scss";
import cn from "classnames";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowSVG } from "../SVG/ArrowSVG";
import { ArrowLetsTalkSVG } from "../SVG/ArrowLetsTalksSVG";

export default function Controls({ handleControls, isControls }) {
    const videoRef = useRef(null);
    const timelineRef = useRef(null);
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

    timelineRef.current = gsap.timeline();

    useEffect(() => {
        if (videoRef.current) {
            const video = videoRef.current;
            video.load();
        }
    }, []);

    useEffect(() => {
        if (videoRef.current && !isControls) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
            setVideoIsPlaying(true);
        } else {
            videoRef.current.pause();
        }
    }, [isControls]);

    useGSAP(() => {
        const tl = gsap.timeline({ paused: true, duration: 27.15, repeat: -1 });

        tl.to(
            keyRightRef.current,
            {
                top: "6px",
                duration: 0.1,
                ease: "none",
            },
            1.575
        )
            .to(
                keyRightArrowRef.current,
                {
                    top: "6px",
                    duration: 0.1,
                    ease: "none",
                },
                1.575
            ) // 1
            .to(
                keyRightRef.current,
                {
                    top: "0px",
                    duration: 0.1,
                    ease: "none",
                },
                2.425
            )
            .to(
                keyRightArrowRef.current,
                {
                    top: "0px",
                    duration: 0.1,
                    ease: "none",
                },
                2.425
            )
            .to(
                keyLeftRef.current,
                {
                    top: "6px",
                    duration: 0.1,
                    ease: "none",
                },
                2.425
            ) // 2
            .to(
                keyLeftArrowRef.current,
                {
                    top: "6px",
                    duration: 0.1,
                    ease: "none",
                },
                2.425
            )
            .to(
                keyLeftRef.current,
                {
                    top: "0px",
                    duration: 0.1,
                    ease: "none",
                },
                3.3
            )
            .to(
                keyLeftArrowRef.current,
                {
                    top: "0px",
                    duration: 0.1,
                    ease: "none",
                },
                3.3
            )
            .to(
                keyRightRef.current,
                {
                    top: "6px",
                    duration: 0.1,
                    ease: "none",
                },
                3.3
            ) // 3
            .to(
                keyRightArrowRef.current,
                {
                    top: "6px",
                    duration: 0.1,
                    ease: "none",
                },
                3.3
            )
            .to(
                keyRightRef.current,
                {
                    top: "0px",
                    duration: 0.1,
                    ease: "none",
                },
                4.15
            )
            .to(
                keyRightArrowRef.current,
                {
                    top: "0px",
                    duration: 0.1,
                    ease: "none",
                },
                4.15
            )
            .to(
                keyLeftRef.current,
                {
                    top: "6px",
                    duration: 0.1,
                    ease: "none",
                },
                4.15
            ) // 4
            .to(
                keyLeftArrowRef.current,
                {
                    top: "6px",
                    duration: 0.1,
                    ease: "none",
                },
                4.15
            )
            .to(
                keyLeftRef.current,
                {
                    top: "0px",
                    duration: 0.1,
                    ease: "none",
                },
                5.025
            )
            .to(
                keyLeftArrowRef.current,
                {
                    top: "0px",
                    duration: 0.1,
                    ease: "none",
                },
                5.025
            )
            .to(
                keyRightRef.current,
                {
                    top: "6px",
                    duration: 0.05,
                    ease: "none",
                },
                5.025
            ) // 5
            .to(
                keyRightArrowRef.current,
                {
                    top: "6px",
                    duration: 0.05,
                    ease: "none",
                },
                5.025
            )
            .to(
                keyRightRef.current,
                {
                    top: "0px",
                    duration: 0.05,
                    ease: "none",
                },
                5.4
            )
            .to(
                keyRightArrowRef.current,
                {
                    top: "0px",
                    duration: 0.05,
                    ease: "none",
                },
                5.4
            )
            .to(
                keyLeftRef.current,
                {
                    top: "6px",
                    duration: 0.1,
                    ease: "none",
                },
                5.4
            ) //6
            .to(
                keyLeftArrowRef.current,
                {
                    top: "6px",
                    duration: 0.1,
                    ease: "none",
                },
                5.4
            )
            .to(
                keyLeftRef.current,
                {
                    top: "0px",
                    duration: 0.1,
                    ease: "none",
                },
                6.25
            )
            .to(
                keyLeftArrowRef.current,
                {
                    top: "0px",
                    duration: 0.1,
                    ease: "none",
                },
                6.25
            )
            .to(
                keyRightRef.current,
                {
                    top: "6px",
                    duration: 0.1,
                    ease: "none",
                },
                6.25
            ) // 7
            .to(
                keyRightArrowRef.current,
                {
                    top: "6px",
                    duration: 0.1,
                    ease: "none",
                },
                6.25
            )
            .to(
                keyRightRef.current,
                {
                    top: "0px",
                    duration: 0.1,
                    ease: "none",
                },
                6.575
            )
            .to(
                keyRightArrowRef.current,
                {
                    top: "0px",
                    duration: 0.1,
                    ease: "none",
                },
                6.575
            )
            .to(
                keySpaceRef.current,
                {
                    top: "6px",
                    duration: 0.1,
                    ease: "none",
                },
                7.475
            )
            .to(
                keySpaceRef.current,
                {
                    top: "0px",
                    duration: 0.1,
                    ease: "none",
                },
                7.575
            )
            .to(
                keySpaceRef.current,
                {
                    top: "6px",
                    duration: 0.1,
                    ease: "none",
                },
                8.575
            )
            .to(
                keySpaceRef.current,
                {
                    top: "0px",
                    duration: 0.1,
                    ease: "none",
                },
                9.075
            )
            .to(
                keySpaceRef.current,
                {
                    top: "6px",
                    duration: 0.1,
                    ease: "none",
                },
                9.55
            )
            .to(
                keySpaceRef.current,
                {
                    top: "0px",
                    duration: 0.1,
                    ease: "none",
                },
                10.05
            )
            .to(
                keySpaceRef.current,
                {
                    top: "6px",
                    duration: 0.1,
                    ease: "none",
                },
                10.575
            )
            .to(
                keySpaceRef.current,
                {
                    top: "0px",
                    duration: 0.1,
                    ease: "none",
                },
                11.075
            )
            .to(
                keySpaceRef.current,
                {
                    top: "6px",
                    duration: 0.1,
                    ease: "none",
                },
                11.475
            )
            .to(
                keySpaceRef.current,
                {
                    top: "0px",
                    duration: 0.1,
                    ease: "none",
                },
                11.575
            )
            .to(
                keyInteractRef.current,
                {
                    top: "6px",
                    duration: 0.1,
                    ease: "none",
                },
                14.525
            )
            .to(
                keyInteractRef.current,
                {
                    top: "0px",
                    duration: 0.1,
                    ease: "none",
                },
                15.025
            )
            .to(
                keyInteractRef.current,
                {
                    top: "6px",
                    duration: 0.1,
                    ease: "none",
                },
                19.425
            )
            .to(
                keyInteractRef.current,
                {
                    top: "0px",
                    duration: 0.1,
                    ease: "none",
                },
                19.525
            )
            .to(
                keyInteractRef.current,
                {
                    top: "6px",
                    duration: 0.1,
                    ease: "none",
                },
                24.325
            )
            .to(
                keyInteractRef.current,
                {
                    top: "0px",
                    duration: 0.1,
                    ease: "none",
                },
                24.425
            );

        if (videoIsPlaying) {
            tl.play();
        }
    }, [videoIsPlaying]);

    useGSAP(() => {
        timelineRef.current = gsap
            .timeline({ paused: true })
            .to(projectWrapperRef.current, { height: "2%", width: "70%", duration: 0.2 })
            .to(projectWrapperRef.current, { height: "60%", duration: 0.6 })
            .to(projectRef.current, { opacity: 1 });

        if (!isControls) {
            timelineRef.current.play();
        } else {
            console.log("YOOOOO");
            timelineRef.current.reverse(true);
            timelineRef.current.eventCallback("onReverseComplete", () => {
                closeProject();
            });
        }
    }, [isControls]);
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
                                            <div
                                                className={s.controls__key__front}
                                                ref={keyLeftRef}
                                            >
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
                                            <div
                                                className={s.controls__key__front}
                                                ref={keyRightRef}
                                            >
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
