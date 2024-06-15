import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-center py-3">
      <Container>
        <Row>
          <Col>
            <p className="text-light">© 2024 Desenvolvido por Ana, Cleiton e Matheus</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
