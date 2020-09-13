import React from 'react';

// helpers import
import { createStage } from '../gameHelpers';

// components
import Display from './Display';
import Stage from './Stage';
import StartButton from './StartButton';
import { StyledTetris, StyledTetrisWrapper } from './styles/StyledTetris';

const Tetris = () => {
  return (
    <StyledTetrisWrapper>
      <StyledTetris>
        <div>
          <Stage stage={createStage()} />
          <aside>
            <div>
              <Display text='Score' />
              <Display text='Rows' />
              <Display text='Level' />
            </div>
            <StartButton />
          </aside>
        </div>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
