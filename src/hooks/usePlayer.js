import { useState, useCallback } from 'react';
import { STAGE_WIDTH } from '../gameHelpers';

import { TETROMINOS, randomTetroMino } from '../tetrominos';

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const rotate = (matrix, dir) => {
    // change rows to columns
    const rotateTetro = matrix.map((_, index) =>
      matrix.map((col) => col[index])
    );

    //  reverese each row
    if (dir > 0) {
      return rotateTetro.map((row) => row.reverse());
    } else {
      return rotateTetro.reverse();
    }
  };

  const playerRotate = (stage, dir) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);
    setPlayer(clonedPlayer);
  };

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: {
        x: (prev.pos.x += x),
        y: (prev.pos.y += y),
      },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 1, y: 0 },
      tetromino: randomTetroMino().shape,
      collided: false,
    });
  }, []);
  return [player, updatePlayerPos, resetPlayer, playerRotate];
};
