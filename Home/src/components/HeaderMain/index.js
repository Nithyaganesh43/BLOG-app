import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'; 
import penIcon from '../../assets/write.png';
import home from '../../assets/home.png';
import { useNavigate } from 'react-router-dom';
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
  margin: 0px 15px ;
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
const fetchUserInfo = async (setUser) => {
  try {
    
    const userData = JSON.parse(localStorage.getItem('user')); 
    setUser(userData);
     
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchUserInfo(setUser);
  }, [setUser]); 

//   const handleClickOutside = (event) => {
//     if (menuRef.current && !menuRef.current.contains(event.target)) {
//       setMenuOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);
console.log(user)
  return user ? (
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
          <img
            src={home}
            alt="Write Icon"
            onClick={() => {
              window.location.href = '/home';
            }}
          />
          <img
            src={penIcon}
            alt="Write Icon"
            onClick={() => {
              window.location.href = '/CreateBlog';
            }}
          />
        </div>
        <div>
          <ProfileBtn onClick={() => setMenuOpen((prev) => !prev)}>
            <img src={user.profileUrl} alt="Profile Icon" />
          </ProfileBtn>
        </div>
      </Nav>

      <ProfileMenu ref={menuRef} open={menuOpen}>
        <img src={user.profileUrl} alt="User" />
        <p>{user.fullName}</p>
        <button
          onClick={() => {
            navigate('/Profile');
          }}>
          My Profile
        </button>
        <button
          onClick={async () => {
            await fetch('https://ping-server-2.onrender.com/auth/logout', {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
            });
            navigate('/');
          }}>
          Logout
        </button>
      </ProfileMenu>
    </Headers>
  ) : (
    <>Loading</>
  );
};

export default Header;
