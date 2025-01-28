import styled from 'styled-components';

const PrivacyContainer = styled.div`
  background-color: #000;
  color: #fff;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  margin: 0 auto;
  padding: 20px;
  max-width: 1200px; /* Center and limit width */
`;

const Heading1 = styled.h1`
  color: #800080;
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


function PrivacyPolicy() {
  return (
    <PrivacyContainer>
      <Heading1>Privacy Policy</Heading1>
      <Paragraph>Effective Date: [1-1-2025]</Paragraph>

      <Heading2>1. Introduction</Heading2>
      <Paragraph>
        This Privacy Policy explains how Market Healers ("Platform") collects,
        uses, and protects your personal information. By using the Platform, you
        consent to the practices described here.
      </Paragraph>

      <Heading2>2. Information We Collect</Heading2>
      <Heading3>2.1 Personal Information</Heading3>
      <Paragraph>
        We collect your name, email address, phone number, and other details you
        provide during registration.
      </Paragraph>

      <Heading3>2.2 Usage Data</Heading3>
      <Paragraph>
        We collect information about your device, browser type, IP address,
        pages visited, and other activities on the Platform.
      </Paragraph>

      <Heading2>3. How We Use Your Information</Heading2>
      <List>
        <ListItem>To provide and improve our services.</ListItem>
        <ListItem>To communicate updates and promotions.</ListItem>
        <ListItem>To ensure the security of the Platform.</ListItem>
      </List>

      <Heading2>4. Information Sharing</Heading2>
      <Paragraph>
        We do not sell your information. We may share it with trusted third
        parties for service delivery, legal compliance, or to protect the
        Platform.
      </Paragraph>

      <Heading2>5. Cookies</Heading2>
      <Paragraph>
        Cookies are used to enhance user experience. You can disable cookies in
        your browser settings, but this may affect Platform functionality.
      </Paragraph>

      <Heading2>6. Data Security</Heading2>
      <Paragraph>
        We implement industry-standard security measures to protect your data.
        However, no method is completely secure, and we cannot guarantee
        absolute security.
      </Paragraph>

      <Heading2>7. Your Rights</Heading2>
      <List>
        <ListItem>Access your personal data.</ListItem>
        <ListItem>Request corrections or deletions.</ListItem>
        <ListItem>Opt-out of promotional communications.</ListItem>
      </List>

      <Heading2>8. Children's Privacy</Heading2>
      <Paragraph>
        Users under 18 must have parental consent to use the Platform. We do not
        knowingly collect data from minors.
      </Paragraph>

      <Heading2>9. Changes to This Policy</Heading2>
      <Paragraph>
        We may update this Privacy Policy periodically. Changes take effect
        immediately upon posting on the Platform.
      </Paragraph>

      <Heading2>10. Contact Us</Heading2>
      <Paragraph>
        If you have questions, contact us at markethealers@gmail.com.
      </Paragraph>
    </PrivacyContainer>
  );
}

export default PrivacyPolicy;
