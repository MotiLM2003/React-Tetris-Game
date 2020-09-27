import { useState, useEffect, useCallback } from 'react';

export const useGameStatus = (rowsCleared) => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(1);

  const linePoints = [40, 100, 300, 1200];

  const calcScore = useCallback(() => {
    if (rowsCleared > 0) {
      // score formula  (original tetris?)
      setScore((prev) => prev + linePoints[rowsCleared - 1] * level);
      setRows((prev) => prev + rowsCleared);
    }
  }, [level, linePoints, rowsCleared]);

  useEffect(() => {
<<<<<<< HEAD
    calcScore();
  }, []);
=======
    console.log(`score : ${score}, rows: ${rows}, level: ${level}`);
    calcScore();
  }, [setRows, calcScore]);
>>>>>>> game-ui

  return [score, setScore, rows, setRows, level, setLevel];
};
