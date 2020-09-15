import { useEffect, useState } from 'react';

export const useSounds = () => {
  const [audio, setAudio] = useState(null);
  const [loop, setLoop] = useState(false);

  useEffect(() => {
    if (audio !== null) {
      console.log(audio);
      audio.loop = loop;
      audio.play();
    }
    return () => {
      //  audio.removeEventListener('ended', setPlaying(false));
    };
  }, [audio]);

  const playSound = (url, isLoop = false) => {
    setAudio(new Audio(`http://localhost:3000/sounds/${url}`));
  };

  const stopSound = () => {
    if (audio !== null) {
      audio.pause();
    }
  };

  return [playSound, stopSound, setLoop];
};
