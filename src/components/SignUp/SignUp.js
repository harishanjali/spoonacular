import React,{useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {app,database} from '../../config/firebaseConfig'
import {auth} from '../../firebase.js';
import {collection,addDoc} from 'firebase/firestore'

export default function SignUp() {
    const [state,setState] = useState({username:'',firstname:'',lastname:'',email:'',password:'',cpassword:''});
    const apiKey = process.env.REACT_APP_API_KEY
    const collectionRef = collection(database,'users');
    const navigate = useNavigate();
    const onChangeHandler = (e)=>{
        let name = e.target.name;
        setState({...state,[name]:e.target.value})
    }
    const addData = async(spoonacularData)=>{
      try{
        const {hash,spoonacularPassword,username} = spoonacularData;
        let spoonacularUsername = username;
        const {firstname,lastname,email} = state
        const userDetails = {firstname,lastname,email,hash,spoonacularPassword,spoonacularUsername}
        const result =  await addDoc(collectionRef,userDetails)
        // alert('Data added');
        // console.log('added');
      }catch(err){
        alert(err.message)
      }
    }
    const addUser = async()=>{
      try{
        let json = JSON.stringify(state);
        const response = await axios.post(`https://api.spoonacular.com/users/connect?apiKey=${apiKey}`,json,{
            headers:{
                'Content-Type':'application/json'
            }
      })
      let spoonacularData = response.data;
      // let userDetails = {...state,hash,spoonacularPassword,spoonacularUsername,isLoggedIn}
      // console.log(userDetails);
      addData(spoonacularData)
      }catch(err){
        alert(err.message)
      }
    }
    const handleSubmit = async(e)=>{
      e.preventDefault();
      const {password,cpassword,email} = state;
      if(password!==cpassword){
        alert('Passwords do not match');
      }
      // return;
      try{
        const result = await createUserWithEmailAndPassword(auth,email,password)
        addUser();
        alert('Successfully registered, please login to continue');
        navigate('/login');
        // console.log(result);
      }catch(error){
        alert(error.message);
      }
    }
  return (
    <Container className='mt-5 pt-5'>
        <Row>
        <Col md={12}>
        <h1>Sign Up</h1>
      </Col>
            <Col md={6}>
            <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
      <Form.Label>Username</Form.Label>
        <Form.Control onChange={onChangeHandler} type="text" placeholder="Enter username" name='username'/>
        <Form.Label>Firstname</Form.Label>
        <Form.Control onChange={onChangeHandler} type="text" placeholder="Enter Firstname" name='firstname'/>
        <Form.Label>Lastname</Form.Label>
        <Form.Control onChange={onChangeHandler} type="text" placeholder="Enter Lastname" name='lastname'/>
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={onChangeHandler} type="email" placeholder="Enter email" name='email'/>
        <Form.Text className="text-muted d-block">
          We'll never share your email with anyone else.
        </Form.Text>
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={onChangeHandler} id='password' type="password" placeholder="Enter password" name='password' autoComplete='new-password'/>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control onChange={onChangeHandler} id='cpassword' type="password" placeholder="Confirm Password" name='cpassword'/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
            </Form>
            </Col>
        </Row>
    </Container>
    
  );
}