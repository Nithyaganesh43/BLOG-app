import styled from 'styled-components';

const MainSectionStyle = styled.section`
  width: 100vw;
  height: 45vw;
  background-color: rgb(6, 6, 7);
  display: flex;
  justify-content: center;
  position: relative;
  @media only Screen and (max-width: 48em) {
    height: 100vw;
    display: block;
  }
  @media only Screen and (max-width: 420px) {
    height: auto;
    padding-bottom: 2rem;
  }
`;

const Title = styled.h1`
  font-size: calc(2.5rem + 2vw);
  line-height: 1.2;
  padding: 0.5rem 0;
`;

const MainSection = () => {
  return (
    <MainSectionStyle>
      <Title>Welcome Home</Title>
    </MainSectionStyle>
  );
};

export default MainSection;
