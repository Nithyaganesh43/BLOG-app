import styled from "styled-components";
const CARD = styled.div`
  height: calc(8rem + 15vw);
  width: calc(9rem + 15vw);
  background-color: var(--nav2);
  border-radius: 20px;
  position: relative;
  margin-top: calc(5rem + 5vw);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.div`
  width: 40%;
  height: 40%;
  position: absolute;
  left: 50%;
  bottom: 80%;
  transform: translate(-50%);
  border-radius: 50%;
  background-color: red;
  background: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  filter: drop-shadow(0px -3px 3px var(--nav2));
`;

const TEXT = styled.h4`
  color: var(--white);
  padding: 0 calc(1rem + 1vw);

  text-align: center;
  font-size: calc(0.6rem + 0.5vw);
`;

const NAME = styled.h3`
  color: var(--pink);
  padding-top: 1rem;
  font-size: calc(0.2rem + 1vw);
  @media only Screen and (max-width: 48em) {
    font-size: calc(0.5rem + 1vw);
  }
`;

const Card = ({ name, text, image }) => {
  const Avatar =
    image === 'avatar-1'
      ? 'https://business.thedailyguardian.com/wp-content/uploads/2022/05/warren-buffet.jpg'
      : image === 'avatar-2'
      ? 'https://img.freepik.com/premium-photo/elon-musk-picture-ceo-spacex-tesla-twitter_485374-860.jpg'
      : image === 'avatar-4'
      ? 'https://cdn.britannica.com/77/142177-050-4E8010A9/Albert-Einstein-1947.jpg'
      : 'https://www.harshadmehta.in/files/image-1401.png';
 
  return (
  <CARD>
    <Image img={Avatar} width="400" height="400" />
    <TEXT>{text}</TEXT>
    <NAME>{name}</NAME>
  </CARD>
);
};

export default Card;
