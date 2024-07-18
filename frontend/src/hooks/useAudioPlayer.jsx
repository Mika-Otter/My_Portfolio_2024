import { useEffect, useRef, useState } from "react";

export default function useAudioPlayer(initialVolume = 0.7, activeSound) {
  const audioPlayerRef = useRef();
  const [playingAudio, setPlayingAudio] = useState(false);

  function playMusic() {
    setPlayingAudio((prevPlayingAudio) => !prevPlayingAudio);
  }

  useEffect(() => {
    activeSound ? setPlayingAudio(true) : null;
  }, [activeSound]);

  useEffect(() => {
    if (audioPlayerRef.current) {
      playingAudio
        ? audioPlayerRef.current.play()
        : audioPlayerRef.current.pause();
    }
  }, [playingAudio]);

  useEffect(() => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.volume = initialVolume;
    }
  }, [initialVolume]);

  return {
    audioPlayerRef,
    playingAudio,
    playMusic,
  };
}
