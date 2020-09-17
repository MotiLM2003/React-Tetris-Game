import { isValidElement, useEffect, useState } from 'react';

export const useSounds = () => {
  const [audio, setAudio] = useState(null);
  const [loop, setLoop] = useState(false);

  useEffect(() => {
    if (audio !== null) {
      audio.play();
      audio.addEventListener('ended', test);
    }
    return () => {
      if (audio != null) {
        audio.removeEventListener('ended', test);
        console.log('clean up');
      }
    };
  }, [audio]);

  useEffect(() => {
    if (audio != null) {
      console.log('setting loop');
      audio.loop = loop;
      console.log(audio.loop);
    }
  }, [loop]);

  const test = () => {};

  const playSound = (url, isLoop) => {
    setLoop(isLoop);
    setAudio(new Audio(`/sounds/${url}`));
  };

  const stopSound = () => {
    if (audio !== null) {
      audio.pause();
    }
  };

  return [playSound, stopSound];
};
