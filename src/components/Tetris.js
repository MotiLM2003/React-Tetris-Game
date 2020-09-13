import React from 'react';

// helpers imports
import { createStage } from '../gameHelpers';

// components
import Display from './Display';
import Stage from './Stage';
import StartButton from './StartButton';

const Tetris = () => {
  return (
    <div>
      <Stage stage={createStage()} />
      <aside>
        <div>
          <Display text='Score' />
          <Display text='Rows' />
          <Display text='Level' />
        </div>
        <StartButton />
      </aside>
    </div>
  );
};

export default Tetris;
