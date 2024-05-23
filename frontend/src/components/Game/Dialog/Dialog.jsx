import React, { useRef, useEffect, useState } from "react";
import s from "./Dialog.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin();

export default function Dialog({ text, isDialog }) {
    const dialogRef = useRef(null);
    const timelineDialogRef = useRef(gsap.timeline({ paused: true }));
    const textRef = useRef(null);
    const [secretText, setSecretText] = useState("");

    const activeCatSecret = () => {};

    let speeds = {
        longpause: 900,
        pause: 800,
        slow: 120,
        normal: 70,
        fast: 40,
    };
    let textlines = [
        { string: "The music is made by", speed: speeds.normal },
        { string: ".", speed: speeds.slow },
        { string: ".", speed: speeds.slow },
        { string: ".", speed: speeds.pause },
        { string: "LeChatNoir", speed: speeds.fast },
        { string: "!", speed: speeds.longpause },
        { string: "@lechatnoir_music", speed: speeds.normal },
    ];

    let characters = [];
    function textReveal() {
        textlines.forEach((line, index) => {
            if (index < textlines.length - 1) {
                line.string += " ";
            }
            line.string.split("").forEach((character) => {
                let span = document.createElement("span");
                span.textContent = character;
                textRef.current.appendChild(span);
                characters.push({
                    span: span,
                    isSpace: character === " ",
                    delay: line.speed,
                    classes: line.classes || [],
                });
            });
        });
    }

    function revealOneCharacter(list) {
        let next = list.splice(0, 1)[0];
        next.span.classList.add(s.revealed);

        let delay = next.isSpace ? 0 : next.delay;

        if (list.length > 0) {
            setTimeout(() => {
                revealOneCharacter(list);
            }, delay);
        }
    }

    useGSAP(() => {
        timelineDialogRef.current
            .set(dialogRef.current, { opacity: 1 })

            .to(dialogRef.current, { height: "3%", width: "80%", duration: 0.3 })
            .to(dialogRef.current, { height: "100%", width: "80%", duration: 0.5 })
            .to(textRef.current, { opacity: 1 }, ">");
    }, []);

    useEffect(() => {
        if (isDialog) {
            timelineDialogRef.current.play();
            setTimeout(() => {
                textReveal();
                revealOneCharacter(characters);
            }, 1500);
        } else {
            timelineDialogRef.current.reverse();
            setTimeout(() => {
                textRef.current.innerHTML = "";
            }, 500);
        }
    }, [isDialog]);

    return (
        <>
            <div className={s.box__dialog}>
                <div className={s.dialog} ref={dialogRef}>
                    <div className={s.dialog__text}>
                        <p ref={textRef}>{text}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
