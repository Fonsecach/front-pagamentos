import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navigation() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Inicio</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#features" style={{ paddingRight: '80px', paddingLeft: '80px' }}>Pessoas</Nav.Link>
            <Nav.Link href="#pricing" style={{ paddingRight: '80px', paddingLeft: '80px' }}>Pedidos</Nav.Link>
            <Nav.Link href="#pricing" style={{ paddingRight: '80px', paddingLeft: '80px' }}>Pagamentos</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br/>
    </>
  );
}

export default Navigation;