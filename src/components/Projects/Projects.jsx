import React from "react";
import s from "./Projects.module.scss";
import { ProjectsBoxSVG } from "../SVG/ProjectsBoxSVG";

export default function Projects() {
    return (
        <>
            <section className={s.projects}>
                <div className={s.projects__box}>
                    <ProjectsBoxSVG width="100%" />
                </div>
            </section>
        </>
    );
}
