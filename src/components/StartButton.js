import React from 'react';

const StartButton = ({ callBack }) => {
  return (
    <button
      onClick={(e) => {
        document.getElementById('main-area').focus();
        callBack();
      }}
      className='btn glass'
    >
      Start Game
    </button>
  );
};

export default StartButton;
