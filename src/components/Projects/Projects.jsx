import React from "react";
import s from "./Projects.module.scss";
import { ProjectsBoxSVG } from "../SVG/ProjectsBoxSVG";
import { GoToExpSVG } from "../SVG/GoToExpSVG";
import { CrossSVG } from "../SVG/CrossSVG";

export default function Projects() {
    return (
        <>
            <section className={s.projects}>
                <div className={s.projects__box}>
                    <h2>VIEW PROJECTS</h2>
                    <div className={s.projects__box__content}>
                        <div className={s.projects__box__content__view}>
                            <div className={s.projects__box__content__view__ctn}>
                                <img src="./fake-project.png" alt="fake" />
                            </div>
                        </div>
                        <div className={s.projects__box__content__text}>
                            <div className={s.projects__box__content__text__banner}>
                                <span>PROJECT</span>
                                <span className={s.projects__box__content__text__banner__year}>
                                    YEAR
                                </span>
                            </div>
                            <div className={s.projects__box__content__text__projects}>
                                <ul>
                                    <li>
                                        ArchiTest - Personnal Project <span>2024</span>
                                    </li>
                                    <li>
                                        DNSEP2021 - Art diploma exhibition <span>2024</span>
                                    </li>
                                    <li>
                                        Typpov - Ri7 Final Exam Project, typographie tool{" "}
                                        <span>2024</span>
                                    </li>
                                    <li>
                                        Booball - Small Game with a boo <span>2023</span>
                                    </li>
                                    <li>
                                        Platform Game - Personnal Game <span>2023</span>
                                    </li>
                                    <li>
                                        Various Game - Morpion, Puissance4, Pendu, Labyrinth{" "}
                                        <span>2023</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={s.projects__box__svgProjectBox}>
                        <ProjectsBoxSVG width="100%" />
                    </div>
                    <div className={s.projects__box__svgGoToExp}>
                        <GoToExpSVG />
                    </div>
                    <div className={s.projects__box__svgCross__one}>
                        <CrossSVG />
                    </div>
                    <div className={s.projects__box__svgCross__two}>
                        <CrossSVG />
                    </div>
                </div>
            </section>
        </>
    );
}
