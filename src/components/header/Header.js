import React,{useEffect,useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {updateLoginStatus} from '../../app/reducers/reducer'
import { signOut } from "firebase/auth";
import {auth} from '../../firebase';
import './index.css'

export default function Header(){
  // const [isLoggedIn,setLoggedIn] = useState(false);
  // console.log(apiKey)
  const isLoggedIn = useSelector(state=>state.cake.data);
  const dispatch = useDispatch()
  // console.log(updateLoginStatus);
  const navigate = useNavigate()
  const addMeal = ()=>{
    if(!isLoggedIn){
      alert('User not logged In');
    }
  }
  const doLogout = ()=>{
    signOut(auth)
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    dispatch(updateLoginStatus(false));
    navigate('/login');
  }
    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed='top'>
        <Container>
          <Navbar.Brand href="/">Spoonacular</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Link className='me-2 link' to='/'>Home</Link>
              <Link className='me-2 link' to='/search'>Search</Link>
              <Link className='me-2 link' to='/cuisine'>Cuisines</Link>
              <Link className='me-2 link' to='/beverages'>Wine</Link>
              <Link onClick={addMeal} className='me-2 link' to={isLoggedIn?'/add-to-meal':'/login'}>MealPlanner</Link>
              {isLoggedIn&& <Button variant="danger" onClick={doLogout}>LogOut</Button>}
              {!isLoggedIn&&<Link className='me-2 link' to='/signup'>Sign Up</Link>}
              {!isLoggedIn&&<Link className='me-2 link' to='/login'>Login</Link>}
            </Nav>
          </Navbar.Collapse>
          
        </Container>
      </Navbar>
    )

}
