import React from 'react';

const Display = ({ gameOver, header, text }) => {
  return (
    <div className='box-display'>
      <div>{header}</div>
      <div>{text}</div>
    </div>
  );
};

export default Display;
