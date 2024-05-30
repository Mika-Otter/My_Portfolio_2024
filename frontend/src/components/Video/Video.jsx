import React, { useEffect, useRef } from "react";
import s from "./Video.module.scss";

export default function Video({ src, index, currentIndex, isOpenProject }) {
    const videoRef = useRef(null);

    useEffect(() => {
        if (isOpenProject) {
            setTimeout(() => {
                videoRef.current.pause();
            }, 700);

            return;
        }
        videoRef.current.pause();
        currentIndex === index && videoRef.current.play();
    }, [currentIndex, index, isOpenProject]);

    return (
        <>
            <div className={s.video}>
                <video
                    ref={videoRef}
                    src={src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    disablePictureInPicture
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        marginBottom: "0.7rem",
                    }}
                />
            </div>
        </>
    );
}
