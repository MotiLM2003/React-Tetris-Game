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

  const getDropIntervalTime = () => 1000 / level + 200;

  useEffect(() => {
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
      playSound('nextLevel');
      setLevel((prev) => prev + 1);
      setDropTime(getDropIntervalTime());
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      playSound('drop');
      setDropTime(getDropIntervalTime());

      // check if gameover
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);

        playSound('gameOver');
        return;
      }

      updatePlayerPos({ x: 0, y: 0, collided: true });
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
        setDropTime(getDropIntervalTime());
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
          break;
        }
        case 32: {
          quickDrop();
          break;
        }
      }
    }
  };

  const quickDrop = () => {
    // quick drop - setting interval to 0;
    setDropTime(0);
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
        <div className='tetris-container'>
          <div className='tetris-header'>header</div>
          <div className='tetris-columns'>
            <div>side a</div>
            <Stage stage={stage} />
            <div class='game-status-data'>
              <Display header={'Score'} text={score} />
              <Display header={'Rows'} text={rows} />
              <Display header={'Level'} text={level} />
            </div>
          </div>
          <div className='tetris-footer'>
            <StartButton callBack={startGame} />
          </div>
        </div>
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
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
