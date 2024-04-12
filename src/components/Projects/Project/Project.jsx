import React from "react";
import s from "./Project.module.scss";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Project() {
    return (
        <div className={s.project}>
            <div className={s.project__pic}>
                <div className={s.project__pic__title}>
                    <h2>DNSEP 2021</h2>
                </div>
                <div className={s.project__pic__box}>
                    <div className={s.project__pic__box__ctn}>
                        <img src="./fake-project-typpov.png" alt="typpov" />
                    </div>
                </div>
            </div>
            <div className={s.project__content}>
                <p>
                    DNSEP 2021 is a website who summarize my practice in art school. More precisely
                    my exibition-diploma in June 2021. I had fun to use GSAP and have again a lot of
                    idea for improve that. Currently stopped for progress with other sites.
                    {/* {item.text} */}
                </p>
                <div className={s.project__content__techno}>
                    <h3>TECHNOLOGIES</h3>
                    <p>React, GSAP</p> {/* {item.techno} */}
                </div>
                <div className={s.project__content__client}>
                    <h3>CLIENT</h3>
                    <p>Personnal</p> {/* {item.client} */}
                </div>
                <div className={s.project__content__year}>
                    <h3>YEAR</h3>
                    <div className={s.project__content__year__text}>
                        <span className={s.project__content__year__text__ask}>2024</span>
                        <p>Ask for source code</p>
                    </div>
                    {/* {item.year} */}
                </div>
            </div>
            <div className={s.project__close}></div>
        </div>
    );
}
