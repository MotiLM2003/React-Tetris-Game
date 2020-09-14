import styled from 'styled-components';

export const StyledDisplay = styled.div`
  align-items: center;
  margin: 1rem auto;
  padding: 20px;
  border: 4px solid #333;
  min-height: 30px;
  width: 20rem;

  border-radius: 20px;
  color: ${(props) => (props.gameOver ? 'red' : '#999')};
  background: #000;
  font-family: Pixel, Arial;
  font-size: 1.5rem;
`;
