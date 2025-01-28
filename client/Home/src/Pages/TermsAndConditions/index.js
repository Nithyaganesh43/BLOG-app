import styled from 'styled-components';

const TermsContainer = styled.div`
  background-color: #000;
  color: #fff;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  margin: 0 auto;
  padding: 20px;
  max-width: 1200px; /* Center and limit width */
`;

const Heading1 = styled.h1`
  color: #800080; /* Purple heading */
  font-size: 2.5em;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2em;
    margin-bottom: 15px;
  }
`;

const Heading2 = styled.h2`
  color: #800080;
  font-size: 2em;
  margin-top: 30px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.75em;
    margin-top: 20px;
    margin-bottom: 15px;
  }
`;

const Heading3 = styled.h3`
  color: #800080;
  font-size: 1.5em;
  margin-top: 20px;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 1.3em;
    margin-top: 15px;
    margin-bottom: 10px;
  }
`;

const Paragraph = styled.p`
  font-size: 1.1em;
  margin-bottom: 20px;
  line-height: 1.8;

  @media (max-width: 768px) {
    font-size: 1em;
    margin-bottom: 15px;
  }
`;

const List = styled.ul`
  font-size: 1.1em;
  margin-bottom: 20px;
  padding-left: 30px;

  @media (max-width: 768px) {
    font-size: 1em;
    margin-bottom: 15px;
    padding-left: 20px;
  }
`;

const ListItem = styled.li`
  margin-bottom: 15px;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

 

function TermsAndConditions() {
  return (
    <TermsContainer>
      <Heading1>Terms and Conditions</Heading1>
      <Paragraph>Effective Date: [1-1-2025]</Paragraph>

      <Heading2>1. Acceptance of Terms</Heading2>
      <Paragraph>
        By accessing or using Market Healers ("Platform"), you agree to these
        Terms. If you do not agree, please refrain from using the Platform.
      </Paragraph>

      <Heading2>2. User Accounts</Heading2>

      <Heading3>2.1 Registration</Heading3>
      <Paragraph>
        You are required to provide authentic and comprehensive information
        during the registration process. Users must be at least eighteen years
        old or have valid parental permission.
      </Paragraph>

      <Heading3>2.2 Account Security</Heading3>
      <Paragraph>
        Keep your login details secure. Report any suspicious activity promptly.
      </Paragraph>

      <Heading2>3. Platform Features</Heading2>

      <Heading3>3.1 User Authentication</Heading3>
      <Paragraph>
        Login and signup options include Google and email OTP. Sessions are
        controlled with JWT.
      </Paragraph>

      <Heading3>3.2 Live Market Data</Heading3>
      <List>
        <ListItem>Data is sourced from APIs.</ListItem>
        <ListItem>
          Market values may be delayed by 15-20 minutes and are for
          informational purposes only.
        </ListItem>
      </List>

      <Heading3>3.3 Learning Materials</Heading3>
      <Paragraph>
        Materials are for educational use only. Redistribution is prohibited.
      </Paragraph>

      <Heading2>4. User Responsibilities</Heading2>
      <List>
        <ListItem>
          Do not engage in actions like hacking, data scraping, or spamming.
        </ListItem>
        <ListItem>Provide accurate and legal information.</ListItem>
      </List>

      <Heading2>5. Intellectual Property</Heading2>
      <Paragraph>
        Market Healers retains all copyrights. Users may not copy, distribute,
        or modify content without permission.
      </Paragraph>

      <Heading2>6. Limitation of Liability</Heading2>
      <Paragraph>
        We are not liable for any losses caused by reliance on market
        information or other materials. Continuous access is not guaranteed.
      </Paragraph>

      <Heading2>7. Termination</Heading2>
      <Paragraph>
        We may terminate your account for violating these Terms.
      </Paragraph>

      <Heading2>8. Dispute Resolution</Heading2>
      <Paragraph>
        Disputes are governed by the laws of India, with alternative dispute
        resolution being the first step.
      </Paragraph>

      <Heading2>9. Changes to Terms</Heading2>
      <Paragraph>
        We may update these Terms periodically. Changes take effect immediately
        upon posting on the Platform.
      </Paragraph>

      <Heading2>10. Contact Us</Heading2>
      <Paragraph>
        If you have questions, contact us at markethealers@gmail.com.
      </Paragraph>
    </TermsContainer>
  );
}

export default TermsAndConditions;
