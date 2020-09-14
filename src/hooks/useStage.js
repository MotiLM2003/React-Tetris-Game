import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';
import { usePlayer } from './usePlayer';

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());

  useEffect(() => {
    const updateStage = (prevStage) => {
      // flash the stage
      const newStage = prevStage.map((row) =>
        row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell))
      );

      // then draw the tetnomino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? 'marged' : 'clear'}`,
            ];
          }
        });
      });
      // check collision
      if (player.collided) {
        resetPlayer();
      }
      return newStage;
    };

    setStage((prev) => {
      return updateStage(prev);
    });
  }, [player, resetPlayer]);

  return [stage, setStage];
};
