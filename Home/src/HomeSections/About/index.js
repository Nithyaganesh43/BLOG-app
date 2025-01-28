import styled, { keyframes } from 'styled-components';
import wave from '../../assets/waves.svg';
import aboutImg from '../../assets/about.png';

const move = keyframes`
0% { transform: translateY(-5px)         }
    50% { transform: translateY(10px) translateX(10px)        }
    100% { transform: translateY(-5px)         }
`;

const AboutSection = styled.section`
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Waves = styled.img`
  width: 100%;
  height: auto;
  position: absolute;
  top: -1rem;
`;

const Main = styled.div`
  margin: 0 15rem;
  margin-top: 15rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media only Screen and (max-width: 64em) {
    margin: 0 calc(5rem + 5vw);
    margin-top: 10rem;
  }
  @media only Screen and (max-width: 40em) {
    align-items: center;
    margin: 3rem calc(3rem + 3vw);
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  display: inline-block;
`;

const CurvedLine = styled.div`
  width: 7rem;
  height: 2rem;
  border: solid 5px var(--purple);
  border-color: var(--purple) transparent transparent transparent;
  border-radius: 150%/60px 70px 0 0;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only Screen and (max-width: 40em) {
    flex-direction: column;
  }
`;

const Rocket = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  padding-bottom: 5rem;
  animation: ${move} 2.5s ease infinite;
  @media only Screen and (max-width: 40em) {
    width: 50vw;
    padding-bottom: 0;
  }
`;

const Text = styled.h4`
  font-size: calc(0.5rem + 1vw);
  line-height: 1.5;
  color: var(--nav2);
  text-align: justify;
`;

const Circle = styled.span`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: black;
  margin-right: 0.5rem;
  margin-top: 1rem;
`;
const AboutText = styled.div`
  width: 200%;
  left: 10%;
  position: relative;
  @media only Screen and (max-width: 40em) {
    width: 100%;
    left: 0;
    margin-top: 20px;
  }
`;

const About = () => {
  return (
    <AboutSection id="about">
      <Waves src={wave} alt="" />

      <Main>
        <div></div>
        <Content>
          <Rocket>
            <img src={aboutImg} alt="" width="400" height="400" />
          </Rocket>
          <AboutText>
            <Title>About Us</Title>
            <CurvedLine />
            <Text>
              Welcome to  Ng's Blog , your digital sanctuary for
              creativity, connection, and inspiration. Founded in 2024, we are
              here to empower everyone to share their stories, explore new
              perspectives, and connect with a vibrant community of bloggers
              worldwide.
            </Text>
            <br></br>
            <Title>Mission</Title>
            <Text>
              <CurvedLine />
              Our mission is to foster a space where creativity thrives and
              voices are heard. Whether you're a seasoned writer or just
              starting your blogging journey, Ng's Blog is here to support your
              growth and amplify your voice.
            </Text>
            <br></br>
            <Title>Vision</Title>
            <CurvedLine />
            <Text>
              We envision a world where storytelling bridges gaps, fosters
              understanding, and connects people from all walks of life. Our
              goal is to become a global hub for bloggers, enabling meaningful
              conversations and lasting connections.
            </Text>
            <div>
              <Circle style={{ backgroundColor: 'var(--black)' }} />
              <Circle style={{ backgroundColor: 'var(--black)' }} />
              <Circle style={{ backgroundColor: 'var(--black)' }} />
            </div>
          </AboutText>
        </Content>
      </Main>
    </AboutSection>
  );
};

export default About;
