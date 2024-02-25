import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';


const Footer = () => {
  const linkedinUrl = 'https://www.linkedin.com/in/vivek-singh-51a420291/';
  const githubUrl = 'https://github.com/vs76229379';

  return (
    <footer style={{ backgroundColor: '#191f45', color: 'white', padding: '20px 0' }}>
      <Container>
        <Row>
          <Col className="text-center">
            <p>© 2024 Vivek Singh</p>
            <a href={linkedinUrl} style={{ color: 'white', marginRight: '10px', transition: 'transform 0.3s, color 0.3s', display: 'inline-block', textDecoration: 'none' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.color = 'lightblue'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.color = 'white'; }}>
              <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
            </a>
            <a href={githubUrl} style={{ color: 'white', transition: 'transform 0.3s, color 0.3s', display: 'inline-block', textDecoration: 'none' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.color = 'lightblue'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.color = 'white'; }}>
              <FontAwesomeIcon icon={faGithub} /> GitHub
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
