import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export const useProjectAnimation = (
  projectWrapperRef,
  projectRef,
  videoRef,
  isControls,
  closeProject,
  setVideoIsPlaying
) => {
  const timelineRef = useRef(null);
  timelineRef.current = gsap.timeline();

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.load();
    }
  }, []);

  useEffect(() => {
    if (videoRef.current && !isControls) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setVideoIsPlaying(true);
    } else {
      videoRef.current.pause();
    }
  }, [isControls]);

  useGSAP(() => {
    timelineRef.current = gsap
      .timeline({ paused: true })
      .to(projectWrapperRef.current, {
        height: "2%",
        width: "70%",
        duration: 0.2,
      })
      .to(projectWrapperRef.current, { height: "60%", duration: 0.6 })
      .to(projectRef.current, { opacity: 1 });

    if (!isControls) {
      timelineRef.current.play();
    } else {
      console.log("YOOOOO");
      timelineRef.current.reverse(true);
      timelineRef.current.eventCallback("onReverseComplete", () => {
        closeProject();
      });
    }
  }, [isControls]);
};
