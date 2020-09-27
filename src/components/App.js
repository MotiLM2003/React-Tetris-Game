import React from 'react';
import Tests from './Tests';
import Tetris from './Tetris';
import { useSounds } from '../hooks/useSounds';

const App = () => {
  return (
    <div className='App'>
      <Tetris />
      {/* <Tests /> */}
    </div>
  );
};

export default App;
