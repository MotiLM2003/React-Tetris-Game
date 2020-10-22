import React from 'react';
import Cell from './Cell';

const Stage = ({ stage, gameOver }) => {
  console.log('gameOver', gameOver);
  const className = `${gameOver ? '' : 'hide-gameover '} gameover-container`;
  console.log('class:', className);
  return (
    <div class='stage'>
      <div className={className}>
        <div>Game Over</div>
      </div>
      {stage.map((row) =>
        row.map((cell, x) => {
          return <Cell key={x} type={cell[0]} />;
        })
      )}
    </div>
  );
};

export default Stage;
