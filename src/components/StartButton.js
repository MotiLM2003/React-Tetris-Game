import React from 'react';

const StartButton = ({ callBack }) => {
  return (
    <button
      onClick={(e) => {
        //unfocus the start button.
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
