import React, { useState } from 'react';

// helpers import
import { createStage, checkCollision } from '../gameHelpers';
// components
import Display from './Display';
import Stage from './Stage';
import StartButton from './StartButton';

// custom hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

// styled componenets
import { StyledTetris, StyledTetrisWrapper } from './styles/StyledTetris';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  const movePlayer = (dir) => {
    console.log(player);
    if (!checkCollision(player, stage, { x: dir, y: 0 }))
      updatePlayerPos({ x: dir, y: 0, collided: false });
  };

  const startGame = () => {
    // reset everything;
    setStage(createStage());
    resetPlayer();
    setGameOver(false);
  };

  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // check if gameover
      if (player.pos.y < 1) {
        console.log('game over');
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = () => {
    drop();
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

  return (
    <StyledTetrisWrapper role='button' tabIndex='0' onKeyDown={(e) => move(e)}>
      <StyledTetris>
        <div>
          <Stage stage={stage} />
          <aside>
            {gameOver ? (
              <Display gameOver={gameOver} text='Game Over' />
            ) : (
              <div>
                <Display text='Score' />
                <Display text='Rows' />
                <Display text='Level' />
              </div>
            )}
            <StartButton callBack={startGame} />
          </aside>
        </div>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
