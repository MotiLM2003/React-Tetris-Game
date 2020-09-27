import React from 'react';
import { useSounds } from '../hooks/useSounds';

const Tests = () => {
  const [playSound, stopSound, setVolume] = useSounds();
  let a = 0;

  const play = () => {
    playSound('drop', false, 1);
  };

  return (
    <div>
      <button onClick={play}>sdas </button>
    </div>
  );
};

export default Tests;
