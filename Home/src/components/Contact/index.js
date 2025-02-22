import styled from 'styled-components';
import './btn.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactSection = styled.section`
  overflow: hidden;
  padding: calc(2.5rem + 2.5vw) 0;
  background-color: #0a0b10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  color: var(--white);
  display: inline-block;
  font-size: 2rem;
  margin-bottom: 3rem;
  position: relative;
  &::before {
    content: '';
    height: 1px;
    width: 50%;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0.5rem);
    /* or 100px */
    border-bottom: 2px solid var(--pink);
  }
`;
 
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  input {
    padding: 1rem calc(0.5rem + 1vw);
    margin: 0rem 0rem 1rem 0rem;
    background-color: var(--nav2);
    border: none;
    border-radius: 4px;
    color: #eff7f8;
    &:active,
    &:focus {
      border: none;
      outline: none;
      background-color: var(--nav);
    }
    &::placeholder {
      color: #eff7f8;
      opacity: 0.6;
    }
    &[name='name'] {
      margin-right: 1rem;
    }
  }
  textarea {
    padding: 1rem calc(0.5rem + 1vw);
    margin-bottom: 1rem;
    background-color: var(--nav2);
    border: none;
    border-radius: 4px;
    color: #eff7f8;
    margin-bottom: 2rem;
    &:focus,
    &:active {
      background-color: var(--nav);
    }
    &::placeholder {
      color: #eff7f8;
      opacity: 0.6;
    }
  }
`;
// button {
//   padding: 0.8rem 2rem;
//   background-color: var(--white);
//   border-radius: 20px;
//   font-size: 1.2rem;
//   color: #0a0b10;
//   cursor: pointer;
//   transition: transform 0.3s;
//   &:hover {
//     transform: scale(1.1);
//   }
//   &:active {
//     transform: scale(0.9);
//   }
// }
const Row = styled.div`
  @media only Screen and (max-width: 40em) {
    display: flex;
    flex-direction: column;

    input {
      &[name='name'] {
        margin-right: 0px;
      }
    }
  }
`;
const Contact = () => {
  async function handleClick(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const name = document.getElementById('name').value.trim();
    const text = document.getElementById('text').value.trim();

    if (!email) {
      toast.error('Email is required.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Invalid email format.');
      return;
    }

    if (!name) {
      toast.error('Name is required.');
      return;
    }
    if (name.length < 3) {
      toast.error('Name must be at least 3 characters.');
      return;
    }

    if (!text) {
      toast.error('Message is required.');
      return;
    }
    if (text.length < 1) {
      toast.error('Message must be at least few characters.');
      return;
    }
    toast.success('Thanks for your interaction!');
    document.getElementById('email').value = '';
    document.getElementById('name').value = '';
    document.getElementById('text').value = '';

    try {
      const response = await fetch(
        'https://ping-server-2.onrender.com/contact',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name, message: text }),
        }
      );

      if (response.ok) {
        toast.success(' Kindly Check Your Mail Inbox/Spam');
      } else {
        throw new Error('Failed to send your message.');
      }
    } catch (e) {
      toast.error('Something went wrong. Please try again.');
    }
  }

  return (
    <ContactSection id="contact">
      <Title id="commmmment">Subscribe Us</Title>

      <Form>
        <Row>
          <input id={'name'} name="name" type="text" placeholder="your name" />
          <input
            id={'email'}
            name="email"
            type="email"
            placeholder="enter email id"
          />
        </Row>
        <textarea
          name=""
          id="text"
          cols="30"
          rows="2"
          placeholder="your message"></textarea>
        <div style={{ margin: '0 auto' }}>
          <button
            type="button"
            className="btn"
            onClick={async (e) => {
              handleClick(e);
            }}>
            <strong>Submit</strong>
            <div id="container-stars">
              <div id="stars"></div>
            </div>

            <div id="glow">
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
          </button>
        </div>
      </Form>
      <ToastContainer />
    </ContactSection>
  );
};

export default Contact;


