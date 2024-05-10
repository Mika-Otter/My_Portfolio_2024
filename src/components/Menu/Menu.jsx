import React, { useEffect, useState } from "react";
import s from "./Menu.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import cn from "classnames";

export default function Menu({ isMenu }) {
    return (
        <>
            <div className={s.menu}>
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
                    <span className={s.menu__location__phone}>+336 70 39 47 00</span>
                    <span className={s.menu__location__mail}>mi.otter.side@gmail.com</span>
                </div>
                <div className={s.menu__social}>
                    <div className={s.menu__social__mail}>
                        <button type="mail">MAIL</button>
                    </div>
                    <div className={s.menu__social__other}>
                        <button type="button">INSTAGRAM</button>
                        <button type="button">LINKEDIN</button>
                        <button type="button">GITHUB</button>
                    </div>
                </div>
            </div>
        </>
    );
}
