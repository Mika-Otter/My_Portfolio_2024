import React from "react";
import s from "./Project.module.scss";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CrossSVG } from "../../SVG/CrossSVG";
import { ArrowSVG } from "../../SVG/ArrowSVG";

export default function Project({ item, closeProject, nextProject }) {
    return (
        <div className={s.project}>
            <div className={s.project__pic}>
                <div className={s.project__pic__title}>
                    <h2>{item.title}</h2>
                </div>
                <div className={s.project__pic__box}>
                    <div className={s.project__pic__box__ctn}>
                        <img src={item.url} alt={item.alt} />
                    </div>
                </div>
            </div>
            <div className={s.project__content}>
                <p>
                    {/* DNSEP 2021 is a website who summarize my practice in art school. More precisely
                    my exibition-diploma in June 2021. I had fun to use GSAP and have again a lot of
                    idea for improve that. Currently stopped for progress with other sites. */}
                    {item.text}
                </p>
                <div className={s.project__content__techno}>
                    <h3>TECHNOLOGIES</h3>
                    <p>{item.techno}</p>
                </div>
                <div className={s.project__content__client}>
                    <h3>CLIENT</h3>
                    <p>{item.client}</p> {/*  */}
                </div>
                <div className={s.project__content__year}>
                    <h3>YEAR</h3>
                    <div className={s.project__content__year__text}>
                        <span className={s.project__content__year__text__ask}>{item.year}</span>
                        <p>Ask for source code</p>
                    </div>
                    {/* {item.github} || {item.askforsource} */}
                </div>
            </div>
            <div className={s.project__close} onClick={() => closeProject()}>
                <span>CLOSE</span>
                <div className={s.project__close__cross}>
                    <CrossSVG />
                </div>
            </div>
            <div className={s.project__button}>
                <button
                    type="button"
                    className={s.project__button__btn}
                    onClick={() => nextProject()}
                >
                    NEXT PROJECT
                    <div className={s.project__button__svg}>
                        <ArrowSVG color={"#ffff"} />
                    </div>
                </button>
            </div>
        </div>
    );
}
