import { useEffect, useState } from 'react';

export const useSounds = () => {
  const [audio, setAudio] = useState(null);
  const [loop, setLoop] = useState(false);

  useEffect(() => {
    console.log(audio);
    if (audio !== null) {
      audio.loop = loop;
      audio.play();
    }
    return () => {
      //  audio.removeEventListener('ended', setPlaying(false));
    };
  }, [audio]);

  const playSound = (url) => {
    setAudio(new Audio(`/sounds/${url}`));
  };

  const stopSound = () => {
    if (audio !== null) {
      audio.pause();
    }
  };

  return [playSound, stopSound, setLoop];
};
