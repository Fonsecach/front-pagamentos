import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand as={Link} to="/">Inicio</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/pessoas" style={{ paddingRight: '80px', paddingLeft: '80px' }}>Pessoas</Nav.Link>
            <Nav.Link as={Link} to="/pedidos" style={{ paddingRight: '80px', paddingLeft: '80px' }}>Pedidos</Nav.Link>
            <Nav.Link as={Link} to="/pagamentos" style={{ paddingRight: '80px', paddingLeft: '80px' }}>Pagamentos</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br/>
    </>
  );
}

export default Navigation;
