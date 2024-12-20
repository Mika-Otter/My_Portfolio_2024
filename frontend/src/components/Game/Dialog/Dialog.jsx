import React, { useRef, useEffect, useState } from "react";
import s from "./Dialog.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin();

export default function Dialog({ text, isDialog, secretText }) {
  const dialogRef = useRef(null);
  const timelineDialogRef = useRef(gsap.timeline({ paused: true }));
  const textRef = useRef(null);

  let speeds = {
    longpause: 300,
    pause: 500,
    slow: 300,
    middle: 60,
    normal: 40,
    fast: 40,
  };

  let WelcomeLines = [
    { string: "Hey you !", speed: speeds.normal },
    { string: "Welcome to my personnal website.", speed: speeds.slow },
    {
      string: "You can just scroll down to discover my works.",
      speed: speeds.middle,
    },
    {
      string: "Or you can play and try to find the 4 secrets...",
      speed: speeds.pause,
    },
    {
      string:
        "Watch the two buttons VIEW and PLAY to switch between the two modes.",
      speed: speeds.normal,
    },
    { string: "Have fun !", speed: speeds.fast },
  ];

  let CatTextlines = [
    { string: "The music is made by", speed: speeds.normal },
    { string: "...", speed: speeds.pause },
    { string: "LeChatNoir", speed: speeds.fast },
    { string: "!", speed: speeds.longpause },
    { string: "@lechatnoir_music", speed: speeds.normal },
  ];
  let RobotTextlines = [
    { string: "01001100 ", speed: speeds.normal },
    { string: "01001111 ", speed: speeds.slow },
    { string: "01010110", speed: speeds.fast },
    { string: " ", speed: speeds.pause },
    { string: "01000101 ", speed: speeds.fast },
    { string: "... ", speed: speeds.normal },
  ];

  let characters = [];
  function textReveal(list) {
    list.forEach((line, index) => {
      if (index < list.length - 1) {
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

  function revealOneCharacter(characters) {
    let next = characters.splice(0, 1)[0];
    next.span.classList.add(s.revealed);

    let delay = next.isSpace ? 0 : next.delay;

    if (characters.length > 0) {
      setTimeout(() => {
        revealOneCharacter(characters);
      }, delay);
    }
  }

  useGSAP(() => {
    timelineDialogRef.current
      .to(dialogRef.current, {
        bottom: "2vw",
        opacity: 1,
        duration: 0.7,
        ease: "power3.inOut",
      })

      // .to(dialogRef.current, { height: "3%", width: "80%", duration: 0.3 })
      // .to(dialogRef.current, { height: "100%", width: "80%", duration: 0.5 })
      .to(textRef.current, { opacity: 1 }, "<");
  }, []);

  useEffect(() => {
    if (isDialog) {
      timelineDialogRef.current.play();
      setTimeout(() => {
        if (secretText === "cat") {
          textReveal(CatTextlines);
        } else if (secretText === "robot") {
          textReveal(RobotTextlines);
        }
        revealOneCharacter(characters);
      }, 500);
    } else {
      timelineDialogRef.current.reverse();
      setTimeout(() => {
        textRef.current.innerHTML = "";
        characters = [];
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
