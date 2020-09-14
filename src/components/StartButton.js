import React from 'react';

const StartButton = ({ callBack }) => {
  return (
    <button onClick={callBack} className='btn glass'>
      Start Game
    </button>
  );
};

export default StartButton;
