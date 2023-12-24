import { AppContext } from './App';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';



function NavBar() {
    const { loggedIn, isDoctor} =useContext(AppContext);

  return (
    <Navbar bg="dark" variant="dark" >
        <Nav className="me-auto">
            <Navbar.Brand >TeleHealth App</Navbar.Brand>
            <Nav.Link>
                {loggedIn && (isDoctor ?
                     <Link to='/doctor_profile'> My Profile  </Link>:
                     <><Link to='/patient_profile'> My Profile </Link>
                     <Link to='/my_images'> My Images </Link></>)}
  
            </Nav.Link>
            <Nav.Link >
                {loggedIn ? <LogoutButton /> : <LoginButton />}   
            </Nav.Link>
        </Nav>
    </Navbar>
  )
}

export default NavBar