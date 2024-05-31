import React, { useRef, useState, useEffect, forwardRef } from "react";
import s from "./Loader.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { LogoStartSVG } from "../SVG/LogoStartSVG";
import cn from "classnames";
import { preloadImages } from "../../gameLogic/PreloadImg";
import controlsVideo from "../../assets/video/controls.mp4";
import dnsepVideo from "../../assets/video/DNSEP.mp4";
import platformVideo from "../../assets/video/Platform.mp4";
import typpovVideo from "../../assets/video/Typpov-Low.mp4";
import unexpectedStudioVideo from "../../assets/video/UnexpectedStudio.mp4";
import variousGameVideo from "../../assets/video/VariousGame.mp4";

gsap.registerPlugin();

const imageSources = [
    "./src/assets/img/home-map.png",
    "./src/assets/img/contact-map.png",
    "./src/assets/sprite-door/doorOpen.png",
    "./src/assets/img/water.png",
    "./src/assets/img/cloud.png",
    "./src/assets/img/mushroom-Sheet.png",
    "./src/assets/img/cat-Sheet.png",
    "./src/assets/img/robot-Sheet.png",
    "/flyingStars.png",
    "/starship.png",
];

export default function Loader({ firstEnter }) {
    const bigBoxRef = useRef(null);
    const smallBoxRef = useRef(null);
    const logoRef = useRef(null);
    const loaderRef = useRef(null);
    const nameRef = useRef(null);
    const developerRef = useRef(null);
    const textRef = useRef(null);
    const buttonRef = useRef(null);
    const loaderbackRef = useRef(null);
    const rectsRef = useRef([]);
    const [enter, setEnter] = useState(false);
    const [animation, setAnimation] = useState(false);
    const [loadingImg, setLoadingImg] = useState(false);
    const [settingUp, setSettingUp] = useState("We loading the game...");
    const settingUpRef = useRef(null);

    const videoUrls = [controlsVideo, dnsepVideo, platformVideo, typpovVideo, unexpectedStudioVideo, variousGameVideo];

    useEffect(() => {
        const loadVideos = videoUrls.map((url) => {
            return new Promise((resolve, reject) => {
                const video = document.createElement("video");
                video.src = url;
                video.onloadeddata = resolve;
                video.onerror = reject;
                video.load();
            });
        });
    
        Promise.all([preloadImages(imageSources), ...loadVideos])
            .then(() => {
                setLoadingImg(true);
            })
            .catch((err) => {
                console.error("Failed to preload media", err);
            });
    }, []);

    const settingUpList = [
        { text: "We loading the game...", duration: 800 },
        { text: "We calculate your FPS...", duration: 800 },
        { text: "Media charging...", duration: 1600 },
        { text: "Media charging...", duration: 800 },
    ];

    function chargementSettingUp(list) {
        let totalDuration = 0;

        list.forEach((setting, index) => {
            totalDuration += setting.duration;

            setTimeout(() => {
                setSettingUp(setting.text);
            }, totalDuration);
        });

        setTimeout(() => {
            gsap.to(settingUpRef.current, {
                opacity: 0,
                ease: "none",
            });
        }, totalDuration);
    }

    useEffect(() => {
        chargementSettingUp(settingUpList);
    }, []);

    useGSAP(() => {
        const tlSecond = gsap.timeline({
            paused: true,
            onComplete: () => {
                setAnimation(false);
            },
        });
        tlSecond
            .to(logoRef.current, { y: -30, ease: "power3.inOut", delay: 0.5 }, 2)
            .to(textRef.current, { opacity: 1, delay: 0 }, 2)
            .to(
                buttonRef.current,
                { opacity: 1, ease: "power3.inOut", duration: 0.3, delay: 0.8 },
                2
            );

        setTimeout(() => {
            tlSecond.play();
        }, 4000);
    }, []);

    useGSAP(() => {
        const { width, height } = bigBoxRef.current.getBoundingClientRect();

        if (enter) {
            gsap.to(bigBoxRef.current, {
                scale: 0.7,
                ease: "power4.inOut",
                duration: 0.7,
            });
            gsap.to(smallBoxRef.current, {
                opacity: 0,
            });
            gsap.set(bigBoxRef.current, {
                transformOrigin: "center center",
            });
            gsap.to(bigBoxRef.current, {
                y: `${height / 2}px`,
                height: "0%",
                delay: 0.7,
                duration: 0.5,
                ease: "power3.inOut",
            });
        }
    }, [enter]);

    const handleEnter = () => {
        setEnter(true);
        firstEnter();
    };

    useGSAP(() => {
        const tl = gsap.timeline();
        const { width, height } = loaderRef.current.getBoundingClientRect();

        tl.to(loaderRef.current, { width: "22%", duration: 1.3 })
            .to(loaderRef.current, {
                width: "43%",
                duration: 1,
            })
            .to(loaderRef.current, { width: "55%", duration: 0.3 })
            .to(loaderRef.current, { width: "69%", duration: 0.2 })
            .to(loaderRef.current, { width: "78%", duration: 0.1, delay: 0.3 })
            .to(loaderRef.current, { width: "100%", duration: 0.9, delay: 0.7 })
            .set(loaderRef.current, { transformOrigin: "center center" })
            .set(loaderbackRef.current, { opacity: 0 })
            .to(loaderRef.current, {
                x: "12.5dvw",
                width: 0,
                duration: 0.6,
                delay: 1,
            });
    });

    return (
        <>
            <section className={s.loader} ref={bigBoxRef}>
                <div ref={smallBoxRef} className={s.loader__box}>
                    <div className={s.loader__box__logo} ref={logoRef}>
                        <LogoStartSVG rectsRef={rectsRef} />
                    </div>
                    <div className={s.loaderbar}>
                        <div className={s.loaderbar__back} ref={loaderbackRef}></div>
                        <div className={s.loaderbar__one} ref={loaderRef}></div>
                    </div>
                    <div className={s.settingUp} ref={settingUpRef}>
                        <span>{settingUp}</span>
                        <span>...</span>
                    </div>

                    {!animation ? (
                        <>
                            <div className={s.buttons} ref={buttonRef}>
                                <button type="button" onClick={() => handleEnter()}>
                                    ENTER
                                </button>
                            </div>
                            <div className={s.texts} ref={textRef}>
                                <h2 ref={nameRef} className={s.texts__remi}>
                                    REMI CROCE{" "}
                                </h2>
                                <h2 ref={developerRef} className={s.texts__creative}>
                                    CREATIVE DEVELOPER
                                </h2>
                            </div>
                        </>
                    ) : null}
                </div>
            </section>
        </>
    );
}
