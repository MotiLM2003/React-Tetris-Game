import React from 'react';

import { StyledCell } from './styles/StyledCell';
import { TETROMINOS } from '../tetrominos';
const Cell = ({ type }) => {
  return (
    <div
      className={`cell cell-${type}`}
      type={type}
      color={TETROMINOS[type].color}
    ></div>
  );
};

export default React.memo(Cell);
