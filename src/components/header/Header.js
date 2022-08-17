import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import './index.css'

export default function Header(){
    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="">Spoonacular</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Link className='me-2 link' to='/'>Home</Link>
              <Link className='me-2 link' to='/search'>Search</Link>
            </Nav>
            
          </Navbar.Collapse>
          
        </Container>
      </Navbar>
    )

}
