 
import HeroSection from '../HomeSections/Hero/index';
import About from '../HomeSections/About/index';  

import styled from "styled-components";
 import './btn.css';
const Container = styled.div`
  background-color:rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* position: relative; */
`;

const Home = () => {
  return (
    <Container>
      <HeroSection />
      <About /> 
    </Container>
  );
};

export default Home;
