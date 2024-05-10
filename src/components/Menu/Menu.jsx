import React, { useEffect, useRef, useState } from "react";
import s from "./Menu.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import cn from "classnames";
import { CrossSVG } from "../SVG/CrossSVG";

export default function Menu({ isMenu, handleMenu }) {
    const menuRef = useRef();
    const tl = useRef();

    useGSAP(() => {
        tl.current = gsap.timeline({ paused: true, ease: "power3.out" });
        const { width } = menuRef.current.getBoundingClientRect();
        tl.current.to(menuRef.current, {
            x: `-${width}`,
            xPercent: -1,
            duration: 3,
        });
    }, []);

    useEffect(() => {
        isMenu ? tl.current.timeScale(5).play() : tl.current.timeScale(4).reverse();
    }, [isMenu]);

    return (
        <>
            <div className={s.menu} ref={menuRef}>
                <div className={s.menu__close} onClick={() => handleMenu()}>
                    <div className={s.menu__close__cross}>
                        {" "}
                        <CrossSVG />
                    </div>
                    CLOSE
                </div>
                <div className={s.menu__item}>
                    <div className={s.menu__item__wrapper}>
                        <div className={cn(s.menu__item__span)}>
                            <span>HOME</span>
                            <span>HOME</span>
                        </div>
                    </div>
                    <div className={s.menu__item__wrapper}>
                        <div className={cn(s.menu__item__span)}>
                            <span>PROJECTS</span>
                            <span>PROJECTS</span>
                        </div>
                    </div>
                    {/* <div className={s.menu__item__wrapper}>
                        <div className={cn(s.menu__item__span)}>
                            <span>ABOUT</span>
                            <span>ABOUT</span>
                        </div>
                    </div> */}
                    <div className={s.menu__item__wrapper}>
                        <div className={cn(s.menu__item__span)}>
                            <span>CONTACT</span>
                            <span>CONTACT</span>
                        </div>
                    </div>
                </div>
                <div className={s.menu__location}>
                    <p>Actually in the south of France </p>
                    <p>GMT +2</p>
                    <div className={s.menu__location__wrapper}>
                        <div className={s.menu__location__phone}>
                            <span>+336 70 39 47 00</span>
                            <span>+336 70 39 47 00</span>
                        </div>
                    </div>
                    <div className={s.menu__location__wrapper}>
                        <div className={s.menu__location__mail}>
                            <span>mi.otter.side@gmail.com</span>
                            <span>mi.otter.side@gmail.com</span>
                        </div>
                    </div>
                </div>
                <div className={s.menu__social}>
                    <div className={s.menu__social__mail}>
                        <a href="#">MAIL</a>
                    </div>
                    <div className={s.menu__social__other}>
                        <a href="#">INSTAGRAM</a>
                        <a href="#">LINKEDIN</a>
                        <a href="#">GITHUB</a>
                    </div>
                </div>
            </div>
        </>
    );
}
