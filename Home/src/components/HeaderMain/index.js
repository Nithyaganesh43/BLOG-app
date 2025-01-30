import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import userIcon from '../../assets/profile.png';
import penIcon from '../../assets/write.png';

const Headers = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: rgb(32, 32, 32);
  color: white;
  position: relative;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  h3 {
    margin-left: 10px;
    font-size: 1.5rem;
    color: white;
  }

  img {
    border-radius: 40%;
    width: 3rem;
    height: 3rem;
  }
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
  }
`;

const ProfileBtn = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;

  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
  }
`;

const ProfileMenu = styled.div`
  position: absolute;
  top: 4rem;
  right: 2rem;
  background: rgba(53, 53, 63, 0.95);
  padding: 1rem;
  border-radius: 10px;
  display: ${(props) => (props.open ? 'block' : 'none')};
  text-align: center;
  color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }

  p {
    margin: 5px 0;
  }

  button {
    margin: 5px;
    padding: 0.5rem 1rem;
    background: purple;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background: darkviolet;
    }
  }
`;

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Headers>
      <Logo>
        <img
          src="https://w7.pngwing.com/pngs/764/423/png-transparent-ng-ng-logo-logo-logo-design.png"
          alt="Ng Logo"
        />
        <h3>Ng's Blog</h3>
      </Logo>

      <Nav>
        <div>
          <img src={penIcon} alt="Write Icon" />
        </div>
        <div>
          <ProfileBtn onClick={() => setMenuOpen((prev) => !prev)}>
            <img src={userIcon} alt="Profile Icon" />
          </ProfileBtn>
        </div>
      </Nav>

      <ProfileMenu ref={menuRef} open={menuOpen}>
        <img src={userIcon} alt="User" />
        <p>User Name</p>
        <p>user@example.com</p>
        <button>My Profile</button>
        <button>Logout</button>
      </ProfileMenu>
    </Headers>
  );
};

export default Header;
