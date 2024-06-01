import { useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export const useKeyInteractAnimation = (
  keyInteractRef,
  videoIsPlaying,
  keyRightRef,
  keyRightArrowRef,
  keyLeftRef,
  keyLeftArrowRef,
  keySpaceRef
) => {
  useGSAP(() => {
    const tl = gsap.timeline({ paused: true, duration: 27.15, repeat: -1 });

    tl.to(
      keyRightRef.current,
      {
        top: "6px",
        duration: 0.1,
        ease: "none",
      },
      1.575
    )
      .to(
        keyRightArrowRef.current,
        {
          top: "6px",
          duration: 0.1,
          ease: "none",
        },
        1.575
      ) // 1
      .to(
        keyRightRef.current,
        {
          top: "0px",
          duration: 0.1,
          ease: "none",
        },
        2.425
      )
      .to(
        keyRightArrowRef.current,
        {
          top: "0px",
          duration: 0.1,
          ease: "none",
        },
        2.425
      )
      .to(
        keyLeftRef.current,
        {
          top: "6px",
          duration: 0.1,
          ease: "none",
        },
        2.425
      ) // 2
      .to(
        keyLeftArrowRef.current,
        {
          top: "6px",
          duration: 0.1,
          ease: "none",
        },
        2.425
      )
      .to(
        keyLeftRef.current,
        {
          top: "0px",
          duration: 0.1,
          ease: "none",
        },
        3.3
      )
      .to(
        keyLeftArrowRef.current,
        {
          top: "0px",
          duration: 0.1,
          ease: "none",
        },
        3.3
      )
      .to(
        keyRightRef.current,
        {
          top: "6px",
          duration: 0.1,
          ease: "none",
        },
        3.3
      ) // 3
      .to(
        keyRightArrowRef.current,
        {
          top: "6px",
          duration: 0.1,
          ease: "none",
        },
        3.3
      )
      .to(
        keyRightRef.current,
        {
          top: "0px",
          duration: 0.1,
          ease: "none",
        },
        4.15
      )
      .to(
        keyRightArrowRef.current,
        {
          top: "0px",
          duration: 0.1,
          ease: "none",
        },
        4.15
      )
      .to(
        keyLeftRef.current,
        {
          top: "6px",
          duration: 0.1,
          ease: "none",
        },
        4.15
      ) // 4
      .to(
        keyLeftArrowRef.current,
        {
          top: "6px",
          duration: 0.1,
          ease: "none",
        },
        4.15
      )
      .to(
        keyLeftRef.current,
        {
          top: "0px",
          duration: 0.1,
          ease: "none",
        },
        5.025
      )
      .to(
        keyLeftArrowRef.current,
        {
          top: "0px",
          duration: 0.1,
          ease: "none",
        },
        5.025
      )
      .to(
        keyRightRef.current,
        {
          top: "6px",
          duration: 0.05,
          ease: "none",
        },
        5.025
      ) // 5
      .to(
        keyRightArrowRef.current,
        {
          top: "6px",
          duration: 0.05,
          ease: "none",
        },
        5.025
      )
      .to(
        keyRightRef.current,
        {
          top: "0px",
          duration: 0.05,
          ease: "none",
        },
        5.4
      )
      .to(
        keyRightArrowRef.current,
        {
          top: "0px",
          duration: 0.05,
          ease: "none",
        },
        5.4
      )
      .to(
        keyLeftRef.current,
        {
          top: "6px",
          duration: 0.1,
          ease: "none",
        },
        5.4
      ) //6
      .to(
        keyLeftArrowRef.current,
        {
          top: "6px",
          duration: 0.1,
          ease: "none",
        },
        5.4
      )
      .to(
        keyLeftRef.current,
        {
          top: "0px",
          duration: 0.1,
          ease: "none",
        },
        6.25
      )
      .to(
        keyLeftArrowRef.current,
        {
          top: "0px",
          duration: 0.1,
          ease: "none",
        },
        6.25
      )
      .to(
        keyRightRef.current,
        {
          top: "6px",
          duration: 0.1,
          ease: "none",
        },
        6.25
      ) // 7
      .to(
        keyRightArrowRef.current,
        {
          top: "6px",
          duration: 0.1,
          ease: "none",
        },
        6.25
      )
      .to(
        keyRightRef.current,
        {
          top: "0px",
          duration: 0.1,
          ease: "none",
        },
        6.575
      )
      .to(
        keyRightArrowRef.current,
        {
          top: "0px",
          duration: 0.1,
          ease: "none",
        },
        6.575
      )
      .to(
        keySpaceRef.current,
        {
          top: "6px",
          duration: 0.1,
          ease: "none",
        },
        7.475
      )
      .to(
        keySpaceRef.current,
        {
          top: "0px",
          duration: 0.1,
          ease: "none",
        },
        7.575
      )
      .to(
        keySpaceRef.current,
        {
          top: "6px",
          duration: 0.1,
          ease: "none",
        },
        8.575
      )
      .to(
        keySpaceRef.current,
        {
          top: "0px",
          duration: 0.1,
          ease: "none",
        },
        9.075
      )
      .to(
        keySpaceRef.current,
        {
          top: "6px",
          duration: 0.1,
          ease: "none",
        },
        9.55
      )
      .to(
        keySpaceRef.current,
        {
          top: "0px",
          duration: 0.1,
          ease: "none",
        },
        10.05
      )
      .to(
        keySpaceRef.current,
        {
          top: "6px",
          duration: 0.1,
          ease: "none",
        },
        10.575
      )
      .to(
        keySpaceRef.current,
        {
          top: "0px",
          duration: 0.1,
          ease: "none",
        },
        11.075
      )
      .to(
        keySpaceRef.current,
        {
          top: "6px",
          duration: 0.1,
          ease: "none",
        },
        11.475
      )
      .to(
        keySpaceRef.current,
        {
          top: "0px",
          duration: 0.1,
          ease: "none",
        },
        11.575
      )
      .to(
        keyInteractRef.current,
        {
          top: "6px",
          duration: 0.1,
          ease: "none",
        },
        14.525
      )
      .to(
        keyInteractRef.current,
        {
          top: "0px",
          duration: 0.1,
          ease: "none",
        },
        15.025
      )
      .to(
        keyInteractRef.current,
        {
          top: "6px",
          duration: 0.1,
          ease: "none",
        },
        19.425
      )
      .to(
        keyInteractRef.current,
        {
          top: "0px",
          duration: 0.1,
          ease: "none",
        },
        19.525
      )
      .to(
        keyInteractRef.current,
        {
          top: "6px",
          duration: 0.1,
          ease: "none",
        },
        24.325
      )
      .to(
        keyInteractRef.current,
        {
          top: "0px",
          duration: 0.1,
          ease: "none",
        },
        24.425
      );

    if (videoIsPlaying) {
      tl.play();
    }
  }, [videoIsPlaying, keyInteractRef]);
};
