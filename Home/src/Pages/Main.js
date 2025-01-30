import MainSection from '../MainSection/Main/index';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import './btn.css';
import { useState } from 'react';
const Container = styled.div`
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;





const Main = () => {
const [auth,setauth]=useState(false);
const navigate = useNavigate();
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await fetch(
            'https://ping-server-2.onrender.com/auth/authCheck',
            {
              method: 'GET',
              credentials: 'include',
            }
          );

          if (response.ok) { 
            setauth(true)
          } else { 
            navigate('/');
          }
        } catch (error) { 
            navigate('/');
        }
      };

      checkAuth();
    }, [setauth]);

  return auth ?(
    <Container>  
      <MainSection/>
    </Container>
  ):<>Loading...</>;
};

export default Main;
