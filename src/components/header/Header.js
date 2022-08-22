import React,{useEffect,useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import './index.css'

export default function Header(){
  const [isLoggedIn,setLoggedIn] = useState(false);
  const navigate = useNavigate()
  useEffect(()=>{
    let localStorageData = JSON.parse(localStorage.getItem('usersData'));
    if(localStorageData!==null){
      localStorageData.map(each=>{
        if(each.isLoggedIn){
            setLoggedIn(true)
        }
    })
    }
    
  },[])
  const addMeal = ()=>{
    if(!isLoggedIn){
      alert('User not loged In');
    }
  }
  const doLogout = ()=>{
    console.log('logout triggered');
    let arr = JSON.parse(localStorage.getItem('usersData'));
    arr.map(each=>{
        each.isLoggedIn = false;
    })
    localStorage.setItem('usersData',JSON.stringify(arr));
    navigate('/login');
  }
    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="">Spoonacular</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Link className='me-2 link' to='/'>Home</Link>
              <Link className='me-2 link' to='/search'>Search</Link>
              <Link className='me-2 link' to='/cuisine'>Cuisines</Link>
              <Link onClick={addMeal} className='me-2 link' to='/add-to-meal'>AddMealPlan</Link>
              {isLoggedIn&&<Link onClick={doLogout} className='me-2 link' to='/login'>LouOut</Link>}
              {!isLoggedIn&&<Link className='me-2 link' to='/signup'>Sign Up</Link>}
              {!isLoggedIn&&<Link className='me-2 link' to='/login'>Login</Link>}
            </Nav>
          </Navbar.Collapse>
          
        </Container>
      </Navbar>
    )

}
