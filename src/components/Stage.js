import React from 'react';
import Cell from './Cell';

const Stage = ({ stage }) => {
  return (
    <div class='stage'>
      {stage.map((row) =>
        row.map((cell, x) => {
          console.log(cell[0]);
          return <Cell key={x} type={cell[0]} />;
        })
      )}
    </div>
  );
};

export default Stage;
