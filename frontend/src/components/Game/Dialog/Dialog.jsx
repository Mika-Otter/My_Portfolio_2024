import React, { useRef, useEffect } from "react";
import s from "./Dialog.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin();

export default function Dialog({ text, isDialog }) {
    const dialogRef = useRef(null);
    const timelineDialogRef = useRef(gsap.timeline({ paused: true }));

    useGSAP(() => {
        timelineDialogRef.current
            .to(dialogRef.current, { height: "3%", width: "80%", duration: 0.3 })
            .to(dialogRef.current, { height: "100%", width: "80%", duration: 0.5 });
    }, []);

    useEffect(() => {
        if (isDialog) {
            timelineDialogRef.current.play();
        } else {
            timelineDialogRef.current.reverse();
        }
    }, [isDialog]);

    return (
        <>
            <div className={s.box__dialog}>
                <div className={s.dialog} ref={dialogRef}>
                    <div className={s.dialog__text}>
                        <p>{text}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
