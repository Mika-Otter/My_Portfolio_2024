import React, { useEffect, useRef, useState, useCallback } from "react";
import s from "./Project.module.scss";
import cn from "classnames";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CrossSVG } from "../../SVG/CrossSVG";
import Video from "../../Video/Video";
import ArrowLiveSVG from "../../SVG/ArrowLiveSVG";

export default function Project({
  item,
  closeProject,
  nextProject,
  prevProject,
  index,
  currentIndex,
}) {
  const projectWrapperRef = useRef();
  const [closing, setClosing] = useState(false);
  const timelineRef = useRef();
  const projectRef = useRef();

  const closingGSAP = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      closeProject();
      setClosing(false);
    }, 1000);
  }, [closeProject]);

  useGSAP(() => {
    timelineRef.current = gsap
      .timeline({ paused: true })
      .to(projectWrapperRef.current, {
        height: "2%",
        width: "100%",
        duration: 0.5,
      })
      .to(projectWrapperRef.current, {
        height: "100%",
        duration: 0.6,
        delay: 0.2,
        borderRadius: "10px",
      })
      .to(projectRef.current, { opacity: 1 });
    if (!closing) {
      timelineRef.current.play();
    } else {
      console.log("YOOOOO");
      timelineRef.current.reverse(true);
      timelineRef.current.eventCallback("onReverseComplete", () => {
        closeProject();
      });
    }
  }, [closing]);

  useEffect(() => {
    console.log(window.innerWidth, window.innerHeight);
  }, [closing]);

  return (
    <div className={s.main}>
      <div className={s.project__wrapper} ref={projectWrapperRef}>
        <div className={s.project} ref={projectRef}>
          <div className={s.project__left}>
            {item.img1 && <div className={s.project__left__wrapper}></div>}
            <div className={s.project__pic}>
              {item.img1 ? (
                <>
                  <div className={s.project__pic__box}>
                    <div className={s.project__pic__box__ctn}>
                      <Video
                        key={item.url}
                        src={item.url}
                        index={index}
                        currentIndex={currentIndex}
                      />
                    </div>
                    <div className={s.project__pic__box__ctn__two}>
                      <div className={s.project__pic__box__ctn__two__small}>
                        <img key={item.url} src={item.img1} alt={item.img1} />
                      </div>
                      <div className={s.project__pic__box__ctn__two__small}>
                        <img key={item.url} src={item.img2} alt={item.img2} />
                      </div>
                    </div>
                    <div className={s.project__pic__box__ctn}>
                      <img key={item.url} src={item.img3} alt={item.img3} />
                    </div>
                    <div className={s.project__pic__box__ctn__two}>
                      <div className={s.project__pic__box__ctn__two__small}>
                        <img key={item.url} src={item.img4} alt={item.img4} />
                      </div>
                      <div className={s.project__pic__box__ctn__two__small}>
                        <img key={item.url} src={item.img5} alt={item.img5} />
                      </div>
                    </div>
                    <div className={s.project__pic__box__ctn}>
                      <img key={item.url} src={item.img6} alt={item.img6} />
                    </div>
                    <div className={s.project__pic__box__ctn__two}>
                      <div className={s.project__pic__box__ctn__two__small}>
                        <img key={item.url} src={item.img7} alt={item.img7} />
                      </div>
                      <div className={s.project__pic__box__ctn__two__small}>
                        <img key={item.url} src={item.img8} alt={item.img8} />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className={s.project__pic__box__ctn__alone}>
                  <Video
                    key={item.url}
                    src={item.url}
                    index={index}
                    currentIndex={currentIndex}
                  />
                </div>
              )}
            </div>

            <div className={s.project__pic__title}>
              <h2 className={s.project__pic__title__title}>{item.title}</h2>
              <div className={s.project__pic__title__wrapper}>
                <span className={s.project__pic__title__live}>
                  Live Site
                  <div className={s.project__pic__title__svg}>
                    <ArrowLiveSVG />
                  </div>
                </span>
                <span className={s.project__pic__title__live}>
                  Live Site
                  <div className={s.project__pic__title__svg}>
                    <ArrowLiveSVG />
                  </div>
                </span>
              </div>
            </div>
          </div>

          <div className={s.project__content}>
            <p>{item.text}</p>

            <div className={s.project__content__client}>
              <h3>CLIENT</h3>
              <p className={s.project__content__text}>{item.client}</p>
            </div>
            <div className={s.project__content__clientyear}>
              <div className={s.project__content__techno}>
                <h3>TECHNOLOGIES</h3>
                <p className={s.project__content__techno__text}>
                  {item.techno}
                </p>
              </div>
              <div className={s.project__content__year}>
                <h3>YEAR</h3>
                <div className={s.project__content__year__text}>
                  <span className={s.project__content__year__text__ask}>
                    {item.year}
                  </span>
                </div>
                {/* {item.github} || {item.askforsource} */}
              </div>
            </div>
            {/* <div className={s.project__pic__title__ask}>
                            <p>Ask for source code</p>
                        </div> */}
          </div>
          <div className={s.project__close} onClick={() => closingGSAP()}>
            <span>CLOSE</span>
            <div className={s.project__close__cross}>
              <CrossSVG color={"#061022"} />
            </div>
          </div>
          <div className={s.project__button}>
            <button
              type="button"
              className={cn(s.project__button__btn, s.project__button__prev)}
              onClick={() => prevProject()}
            >
              <span>PREV</span>
              <div className={s.project__button__svg}></div>
            </button>
            <button
              type="button"
              className={s.project__button__btn}
              onClick={() => nextProject()}
            >
              <span>NEXT</span>
              <div className={s.project__button__svg}></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
