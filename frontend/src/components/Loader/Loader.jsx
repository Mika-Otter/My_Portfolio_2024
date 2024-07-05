import React, { useRef, useState, useEffect, useContext } from "react";
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

export default function Loader({ firstEnter, isMobile }) {
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
  const [key, setKey] = useState(1);
  const [isPlayable, setIsPlayable] = useState(false);
  const [loadingEnd, setLoadingEnd] = useState(false);
  const tlRef = useRef();
  const keyRef = useRef(key);

  const videoUrls = [
    controlsVideo,
    dnsepVideo,
    platformVideo,
    typpovVideo,
    unexpectedStudioVideo,
    variousGameVideo,
  ];

  useEffect(() => {
    console.log(isMobile, "isMobile");
  }, [isMobile]);

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
    { text: "We loading the game", duration: 800 },
    { text: "We calculate your FPS", duration: 800 },
    { text: "Media charging", duration: 1600 },
    { text: "Media charging", duration: 800 },
  ];

  function chargementSettingUp(list) {
    let totalDuration = 0;

    gsap.set(settingUpRef.current, {
      opacity: 1,
      ease: "none",
    });
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
    if (isPlayable) {
      const tlSecond = gsap.timeline({
        onComplete: () => {
          setAnimation(false);
        },
      });
      tlSecond
        .to(logoRef.current, { y: -30, ease: "power3.inOut", delay: 0.5 }, 0)
        .to(textRef.current, { opacity: 1, delay: 0 }, 0)
        .to(
          buttonRef.current,
          { opacity: 1, ease: "power3.inOut", duration: 0.3, delay: 0.8 },
          0
        );
    }
  }, [isPlayable]);

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
      gsap.set(bigBoxRef.current, { zIndex: -3000, delay: 1 });
    }
  }, [enter]);

  const handleEnter = () => {
    document.body.style.overflow = "visible";
    setEnter(true);
    firstEnter();
  };

  useEffect(() => {
    keyRef.current = key;
  }, [key]);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setLoadingEnd(true);
      },
    });
    document.body.style.overflow = "hidden";
    tl.set(loaderRef.current, { width: "1%" })
      .to(loaderRef.current, { width: "22%", duration: 1.3 })
      .to(loaderRef.current, {
        width: "43%",
        duration: 1,
      })
      .to(loaderRef.current, { width: "55%", duration: 0.3 })
      .to(loaderRef.current, { width: "69%", duration: 0.2 })
      .to(loaderRef.current, { width: "78%", duration: 0.3, delay: 0.3 })
      .to(loaderRef.current, { width: "100%", duration: 1.2, delay: 0.7 })
      .set(loaderRef.current, { width: "100%" });

    tlRef.current = tl;
  }, []);

  useGSAP(() => {
    if (loadingEnd) {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsPlayable(true);
        },
      });

      if (isMobile) {
        tl.set(loaderRef.current, { transformOrigin: "center center" })
          .set(loaderbackRef.current, { opacity: 0 })
          .to(loaderRef.current, {
            x: "35dvw",
            width: 0,
            duration: 0.6,
            delay: 1,
          });
      } else {
        tl.set(loaderRef.current, { transformOrigin: "center center" })
          .set(loaderbackRef.current, { opacity: 0 })
          .to(loaderRef.current, {
            x: "12.5dvw",
            width: 0,
            duration: 0.6,
            delay: 1,
          });
      }
    }
  }, [loadingEnd]);

  useEffect(() => {
    if (isPlayable) {
      setTimeout(() => {
        const handleKeyPress = (event) => {
          if (event.key === "Enter") {
            handleEnter();
          }
        };
        window.addEventListener("keydown", handleKeyPress);
      }, 1000);

      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }
  }, [isPlayable]);

  return (
    <>
      <section
        className={isMobile ? s.loader__mobile : s.loader}
        ref={bigBoxRef}
        key={key}
      >
        <div
          ref={smallBoxRef}
          className={isMobile ? s.loader__mobile__box : s.loader__box}
        >
          <div
            className={isMobile ? s.loader__mobile__logo : s.loader__box__logo}
            ref={logoRef}
          >
            <LogoStartSVG rectsRef={rectsRef} />
          </div>
          <div className={isMobile ? s.loaderbar__mobile : s.loaderbar}>
            <div
              className={
                isMobile ? s.loaderbar__mobile__back : s.loaderbar__back
              }
              ref={loaderbackRef}
            ></div>
            <div
              className={isMobile ? s.loaderbar__mobile__one : s.loaderbar__one}
              ref={loaderRef}
            ></div>
            <div
              className={isMobile ? s.settingUp__mobile : s.settingUp}
              ref={settingUpRef}
            >
              <span>{settingUp}</span>
              <span>...</span>
            </div>

            {isMobile && (
              <span className={s.mobile__advertise}>
                Sorry, the mobile version or the reduced size is still in the
                laboratory, experiments are in progress... Please visit the
                desktop version or enlarge your screen. {"<"}3
              </span>
            )}
          </div>

          {!animation ? (
            <>
              {isMobile ? null : (
                <div
                  className={isMobile ? s.button__mobile : s.button}
                  ref={buttonRef}
                >
                  <button type="button" onClick={() => handleEnter()}>
                    ENTER
                  </button>
                </div>
              )}
              <div
                className={isMobile ? s.texts__mobile : s.texts}
                ref={textRef}
              >
                <h2
                  ref={nameRef}
                  className={isMobile ? s.texts__title : s.texts__remi}
                >
                  REMI CROCE{" "}
                </h2>
                <h2
                  ref={developerRef}
                  className={isMobile ? s.texts__title : s.texts__creative}
                >
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
