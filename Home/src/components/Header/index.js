import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Headers = styled.header`
  display: flex;
  margin-top: 0;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: rgb(32, 32, 32);
  color: var(--white);
  z-index: 180;
  position: relative;
  @media only Screen and (max-width: 64em) {
    padding: 0.5rem 5rem;
  }
  @media only Screen and (max-width: 40em) {
    padding: 0.5rem 1rem;
  }
`;

const Logo = styled.a`
  border-radius: 15px;
  background-color: rgb(32, 32, 32);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: auto;
  height: auto;
  cursor: pointer;
  position: relative;
  z-index: 180;
  img {
    border-radius: 40%;
    margin-bottom: 0;
    width: 3rem;
    height: 3rem;
  }
  h3 {
    margin: 0 10px;
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    line-height: 1.2rem;
    color: rgb(255, 248, 239);
  }
  @media only Screen and (max-width: 48em) {
    img {
      width: 2rem;
      height: 2rem;
    }
    h3 {
      font-size: 1.2rem;
    }
  }
`;

const Nav = styled.nav`
  width: 35rem;
  max-width: 40rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s;
  z-index: 180;
  position: relative;
  @media only Screen and (max-width: 48em) {
    display: none;
  }
  a {
    font-weight: 600;
    line-height: 1.5;
    color: var(--white);
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    &:hover {
      color: var(--purple);
      transform: scale(1.05);
    }
  }
`;

const HamburgerBtn = styled.button`
  position: relative;
  background-color: transparent;
  border: none;
  width: 2rem;
  height: 2px;
  cursor: pointer;
  z-index: 200;
  display: inline-block;
  &::before,
  &::after {
    content: '';
    background-color: ${(props) =>
      props.clicked ? 'var(--purple)' : 'var(--white)'};
    width: 2rem;
    height: 2px;
    position: absolute;
    left: 0;
    transition: all 0.3s ease-in-out;
  }
  &::before {
    top: ${(props) => (props.clicked ? '0' : '-0.5rem')};
    transform: ${(props) => (props.clicked ? 'rotate(135deg)' : 'rotate(0)')};
  }
  &::after {
    top: ${(props) => (props.clicked ? '0' : '0.5rem')};
    transform: ${(props) => (props.clicked ? 'rotate(-135deg)' : 'rotate(0)')};
  }
  @media only Screen and (min-width: 76em) {
    display: none;
  }
`;

const MobileMenu = styled.nav`
  visibility: ${(props) => (props.clicked ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.clicked ? '1' : '0')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 10%;
  right: 10%;
  font-size: 18px;
  border-radius: 20px;
  z-index: ${(props) => (props.clicked ? '1000' : '-1')};
  background-color: rgba(53, 53, 63, 0.95);
  transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;
  a {
    font-weight: 600;
    font-size: 1.3rem;
    color: var(--white);
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    &:hover {
      color: var(--purple);
      transform: scale(1.05);
    }
  }
  @media only Screen and (min-width: 76em) {
    display: none;
  }
`;

const Button = styled.button`
  background-color: var(--purple);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: var(--white);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.1);
  }
  &:focus {
    transform: scale(0.9);
  }
  @media only Screen and (max-width: 40em) {
    font-size: 1.2rem;
    &:hover,
    &:focus {
      transform: none;
    }
  }
`;

const Header = () => {
  const [click, setClick] = useState(false);
  const ref = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  const scrollUp = (id, e) => {
    e.preventDefault();
    const element = document.getElementById(id);
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login button clicked');
    window.location.href =
      'http://127.0.0.1:5500/client/Auth/src/AuthPage/login.html';  };

  const handleSignup = () => {
    window.location.href =
      'http://127.0.0.1:5500/client/Auth/src/AuthPage/signup.html';
  };

  useEffect(() => {
    const element = ref.current;

    const mq = window.matchMedia('(max-width: 40em)');

    if (mq.matches) {
      gsap.to(element, {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        padding: '1rem 2.5rem',
        borderRadius: '0 0 50px 50px',
        border: '2px solid var(--white)',
        duration: 1,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: element,
          start: 'bottom+=200 top',
          end: '+=100',
          scrub: true,
        },
      });
    } else {
      gsap.to(element, {
        position: 'fixed',
        top: '1rem',
        left: '3rem',
        right: '3rem',
        padding: '1.5rem 2rem',
        borderRadius: '50px',
        border: '3px solid var(--white)',
        duration: 1,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: element,
          start: 'bottom+=300 top',
          end: '+=250',
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <div id="home">
      <Headers ref={ref}>
        <Logo>
          <img
            src="https://w7.pngwing.com/pngs/764/423/png-transparent-ng-ng-logo-logo-logo-design.png"
            alt="Ng"
          />
          <h3>Ng's Blog</h3>
        </Logo>
        <Nav>
          <a href="#home" onClick={(e) => scrollUp('home', e)}>
            Home
          </a>
          <a href="#about" onClick={(e) => scrollUp('about', e)}>
            About Us
          </a>
          <a href="#contact" onClick={(e) => scrollUp('contact', e)}>
            Contact Us
          </a>
          <Button onClick={handleSignup}>SignUp</Button>
          <Button onClick={handleLogin}>Login</Button>
        </Nav>
        <HamburgerBtn clicked={click} onClick={() => setClick(!click)} />
        <MobileMenu clicked={click}>
          <a href="#home" onClick={(e) => scrollUp('home', e)}>
            Home
          </a>
          <a href="#about" onClick={(e) => scrollUp('about', e)}>
            About Us
          </a>
          <a href="#contact" onClick={(e) => scrollUp('contact', e)}>
            Contact Us
          </a>
          <a>
            {' '}
            <Button onClick={handleSignup}>SignUp</Button>
          </a>
          <a>
            <Button onClick={handleLogin}>Login</Button>
          </a>{' '}
        </MobileMenu>
      </Headers>
    </div>
  );
};

export default Header;
