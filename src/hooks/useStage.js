import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';
import { usePlayer } from './usePlayer';
import { useSounds } from './useSounds';

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);
  const [playSound, stopSound, setLoop] = useSounds();
  useEffect(() => {
    setRowsCleared(0);
    const sweepRows = (newStage) => {
      let clearedRowCount = 0;
      const tempStage = newStage.reduce((acc, row) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          setRowsCleared((prev) => prev + 1);

          acc.unshift(new Array(newStage[0].length).fill([0, 'clear']));
          clearedRowCount++;
          return acc;
        }

        acc.push(row);
        return acc;
      }, []);
      if (clearedRowCount > 0) {
        console.log('clear row sound');
        playSound('clearRow');
      }
      return tempStage;
    };
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
        return sweepRows(newStage);
      }
      return newStage;
    };

    setStage((prev) => {
      return updateStage(prev);
    });
  }, [player, resetPlayer]);

  return [stage, setStage, rowsCleared];
};
