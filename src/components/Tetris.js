import React, { useEffect, useState } from 'react';

// helpers import
import { createStage, checkCollision } from '../gameHelpers';
// compongts
import Display from './Display';
import Stage from './Stage';
import StartButton from './StartButton';

// custom hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';
import { useSounds } from '../hooks/useSounds';

// styled componenets
import { StyledTetris, StyledTetrisWrapper } from './styles/StyledTetris';

const Tetris = () => {
  const [playSound, stopSound, setVolume] = useSounds();
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  //const [isQuickDrop, setIsQuickDrop] = useState(false);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  let isQuickDrop = false;

  useEffect(() => {
    document.getElementById('main-area').click();
    playSound('title', true, 0.4);
  }, []);

  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 }))
      updatePlayerPos({ x: dir, y: 0, collided: false });
  };

  const startGame = () => {
    setVolume(0.15);
    // reset everything;
    setDropTime(1000);
    setStage(createStage());
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setLevel(1);
    setRows(0);
  };

  const drop = () => {
    // increase level every 10 rows
    if (rows >= level * 10) {
      setLevel((prev) => prev + 1);
      setDropTime(1000 / level + 200);
      playSound('next-level.mp3');
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      isQuickDrop = false;
      // check if gameover
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);

        playSound('gameOVer');
        return;
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
      playSound('drop');
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const keyUp = ({ keyCode }) => {
    if (gameOver) return;
    switch (keyCode) {
      case 40: {
        setDropTime(1000 / level + 200);
        break;
      }
    }
  };

  const move = ({ keyCode }) => {
    console.log(keyCode);
    if (!gameOver) {
      switch (keyCode) {
        case 37: {
          movePlayer(-1);
          break;
        }
        case 39: {
          movePlayer(1);
          break;
        }
        case 40: {
          dropPlayer();
          break;
        }
        case 38: {
          playerRotate(stage, 1);
        }
        case 32: {
          quickDrop();
        }
      }
    }
  };

  const quickDrop = () => {
    isQuickDrop = true;

    setDropTime(null);

    setTimeout(() => {
      drop();
      if (isQuickDrop) {
        quickDrop();
      }
    }, 55);
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledTetrisWrapper
      role='button'
      id='main-area'
      tabIndex='0'
      onKeyDown={(e) => move(e)}
      onKeyUp={(e) => keyUp(e)}
    >
      <div className='bg-blur'>&nbsp;</div>
      <StyledTetris>
        <Stage stage={stage} />
        <aside className='side-container'>
          {gameOver ? (
            <Display gameOver={gameOver} text='GameOver' />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <StartButton callBack={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
