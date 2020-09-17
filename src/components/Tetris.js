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
  const [playSound, stopSound, setLoop] = useSounds();
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);

  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  useEffect(() => {
    setLoop(true);
    playSound('title.mp3');
  }, []);

  const movePlayer = (dir) => {
    console.log(player);
    if (!checkCollision(player, stage, { x: dir, y: 0 }))
      updatePlayerPos({ x: dir, y: 0, collided: false });
  };

  const startGame = () => {
    stopSound();
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
      setLoop(false);
      playSound('next-level.mp3');
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // check if gameover
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);

        setLoop(false);
        console.log('game over sound');
        playSound('game-over.mp3');
        return;
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
      setLoop(false);
      playSound('drop.mp3');
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
      }
    }
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
