import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';

export const useStage = (player, setPlayer) => {
  const [stage, setStage] = useState(createStage());
  useEffect(() => {
    const updateStage = (prevStage) => {
      // flash the stage
      const newStage = prevStage.map((row) => {
        return row.map((cell) => {
          return cell[1] === 'clear' ? [0, 'clear'] : cell;
        });
      });

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

      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, []);

  return [stage, setStage];
};
