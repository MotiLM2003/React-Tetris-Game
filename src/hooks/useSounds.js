import { isValidElement, useEffect, useState } from 'react';

export const useSounds = () => {
  const [loop, setLoop] = useState(false);
  const [gameAudio] = useState({
    title: new Audio('/sounds/title.mp3'),
    drop: new Audio('/sounds/drop.mp3'),
    clearRow: new Audio('/sounds/rows_cleared.mp3'),
    gameOVer: new Audio('/sounds/game-over.mp3'),
  });
  const [currentAudio, setCurrentAudio] = useState(null);

  useEffect(() => {
    console.log('effect');
    gameAudio[0] = new Audio('/sounds/title.mp3');
    drop: new Audio('/sounds/drop.mp3');

    return () => {
      if (currentAudio != null) {
        // currentAudio.removeEventListener('ended', test);
      }
    };
  }, [currentAudio]);

  useEffect(() => {
    if (currentAudio != null) {
      gameAudio[currentAudio].loop = loop;
    }
  }, [loop]);

  const test = () => {};

  const playSound = (audio, isLoop, volume = 1) => {
    console.log(volume);
    setCurrentAudio(audio);
    setLoop(isLoop);
    if (!gameAudio[audio]) return;
    gameAudio[audio].volume = volume;
    gameAudio[audio].play();
  };

  const stopSound = () => {
    if (currentAudio !== null) {
      currentAudio.pause();
    }
  };

  const setVolume = (volume) => {
    if (currentAudio !== null) {
      let currentValue = gameAudio[currentAudio].volume;
      const reduceValueInterval = setInterval(() => {
        currentValue -= 0.1;
        gameAudio[currentAudio].volume = currentValue;

        if (currentValue <= volume) {
          clearInterval(reduceValueInterval);
        }
      }, 200);
    }
  };

  return [playSound, stopSound, setVolume];
};
