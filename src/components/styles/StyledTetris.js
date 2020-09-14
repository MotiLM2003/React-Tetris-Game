import styled from 'styled-components';

import bgImage from '../../img/bg-1.jpg';

export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${bgImage}) #fff;
  background-size: cover;
`;

export const StyledTetris = styled.div`
  display: flex;
  align-item: flex-start;
  padding: 40px;
  margin: 0 auto;
  max-width: 120rem;
`;
