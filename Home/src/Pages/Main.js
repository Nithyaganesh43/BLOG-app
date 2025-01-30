import MainSection from '../MainSection/Main/index';

import styled from 'styled-components';
import './btn.css';
const Container = styled.div`
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Main = () => {
  return (
    <Container>  
      <MainSection/>
    </Container>
  );
};

export default Main;
