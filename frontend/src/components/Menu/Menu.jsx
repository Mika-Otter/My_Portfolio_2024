import React, { useEffect, useRef, useState } from "react";
import s from "./Menu.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import cn from "classnames";
import { CrossSVG } from "../SVG/CrossSVG";

export default function Menu({
  isMenu,
  handleMenu,
  handleGoToHome,
  handleContact,
  handleControls,
  activePlay,
}) {
  const menuRef = useRef();
  const tl = useRef();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true, ease: "power3.out" });
    const { width } = menuRef.current.getBoundingClientRect();
    tl.current.to(menuRef.current, {
      x: `-${width + width / 120}`,
      duration: 3,
    });
  }, []);

  useEffect(() => {
    const animation = isMenu
      ? tl.current.timeScale(5).play()
      : tl.current.timeScale(4).reverse();

    return () => {
      animation.kill();
    };
  }, [isMenu]);

  useEffect(() => {
    console.log(isMenu, "isMenu");
  }, [isMenu]);

  return (
    <>
      <div className={s.menu} ref={menuRef}>
        <div className={s.menu__close} onClick={() => handleMenu()}>
          <span>CLOSE</span>
          <div className={s.menu__close__cross}>
            <CrossSVG />
          </div>
        </div>

        <div className={s.menu__item}>
          <div className={s.menu__item__wrapper}>
            <div
              className={cn(s.menu__item__span)}
              onClick={() => {
                handleGoToHome();
                handleMenu();
              }}
            >
              <span>HOME</span>
              <span>HOME</span>
            </div>
          </div>
          {/* <div className={s.menu__item__wrapper}>
            <div className={cn(s.menu__item__span)}>
              <span>PROJECTS</span>
              <span>PROJECTS</span>
            </div>
          </div> */}
          {/* <div className={s.menu__item__wrapper}>
                        <div className={cn(s.menu__item__span)}>
                            <span>ABOUT</span>
                            <span>ABOUT</span>
                        </div>
                    </div> */}
          <div
            className={s.menu__item__wrapper}
            onClick={() => {
              handleControls();
              activePlay();
              handleMenu();
            }}
          >
            <div className={cn(s.menu__item__span)}>
              <span>CONTROLS</span>
              <span>CONTROLS</span>
            </div>
          </div>
          <div
            className={s.menu__item__wrapper}
            onClick={() => {
              handleContact();
              handleMenu();
            }}
          >
            <div className={cn(s.menu__item__span)}>
              <span>CONTACT</span>
              <span>CONTACT</span>
            </div>
          </div>
        </div>
        <div className={s.menu__location}>
          <p className={s.menu__location__text}>Actually in</p>
          <p className={s.menu__location__text}>
            South of France / {formattedTime}
          </p>
          {/* <div className={s.menu__location__wrapper}>
            <a className={s.menu__location__phone} href="tel:+33670493700">
              <span>+336 70 49 37 00</span>
              <span>+336 70 49 37 00</span>
            </a>
          </div> */}
          {/* <p className={s.menu__location__text}>Prefer the contact menu</p> */}
          <div className={s.menu__location__wrapper}>
            <a href="mailto:aaaaa@gmail.com" className={s.menu__location__mail}>
              <span>mi.otter.side@gmail.com</span>
              <span>mi.otter.side@gmail.com</span>
            </a>
          </div>
        </div>
        <div className={s.menu__social}>
          <div className={s.menu__social__other}>
            <a href="https://github.com/Mika-Otter" target="_blank">
              GITHUB
            </a>
            <a
              href="https://linkedin.com/in/rémi-croce-320499254"
              target="_blank"
            >
              LINKEDIN
            </a>
            <a href="https://www.instagram.com/mi.otter/" target="_blank">
              INSTAGRAM
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
