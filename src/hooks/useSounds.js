import { isValidElement, useEffect, useState } from 'react';
import { useInterval } from '../hooks/useInterval';
export const useSounds = () => {
  const [loop, setLoop] = useState(false);
  const [gameAudio, setGameAudio] = useState({});
  const [currentAudio, setCurrentAudio] = useState(null);

  useEffect(() => {
    setGameAudio({
      title: new Audio('/sounds/title.mp3'),
      drop: new Audio('/sounds/drop.mp3'),
      clearRow: new Audio('/sounds/rows_cleared.mp3'),
      gameOver: new Audio('/sounds/game-over.mp3'),
      nextLevel: new Audio('/sounds/game-over.mp3'),
    });
  }, []);
  useEffect(() => {
    console.log(' use effect teteris');

    if (currentAudio != null) {
      gameAudio[currentAudio].loop = loop;
    }
  }, [loop]);

  const playSound = (audio, isLoop, volume = 1) => {
    setVolume(volume);
    setCurrentAudio(audio);
    setLoop(isLoop);
    if (!gameAudio[audio]) return;
    gameAudio[audio].volume = volume;
    gameAudio[audio].pause();
    gameAudio[audio].currentTime = 0;
    gameAudio[audio].play();

    console.log('play');
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
        if (currentValue > 0.1) {
          currentValue -= 0.1;
        } else {
          volume = currentValue;
        }

        gameAudio[currentAudio].volume = currentValue;

        if (currentValue <= volume) {
          clearInterval(reduceValueInterval);
        }
      }, 200);
    }
  };

  return [playSound, stopSound, setVolume];
};
