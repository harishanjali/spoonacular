import React,{useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [state,setState] = useState({username:'',firstname:'',lastname:'',email:''});
    const navigate = useNavigate();
    const onChangeHandler = (e)=>{
        let name = e.target.name;
        setState({...state,[name]:e.target.value})
    }
    function isThere(item){
        let arr=JSON.parse(localStorage.getItem('usersData'));
        let result;
        for(let items of arr){
          if(items.email===item.email){
            result = true;
            break;
          }
          else{
            result = false;
          }
        }
        return result;
      }
    const addToLocalStorage=(item)=>{
        if(localStorage.getItem('usersData')!=undefined){ 
           let arr=JSON.parse(localStorage.getItem('usersData'));
           let flag = isThere(item)
           if(flag){
               alert("User already Registered");
           }
           else {
            arr.push(item);
            localStorage.setItem('usersData',JSON.stringify(arr));
            alert("User Add to Application");
            navigate('/login')
           }
        }
        else{
            let arr=[];
            arr.push(item);
            localStorage.setItem('usersData',JSON.stringify(arr));
            alert("User Add to Application");
            navigate('/login')
        }
    }
    const onSubmitForm = (e)=>{
        e.preventDefault();
        let json = JSON.stringify(state);
        const response = axios.post('https://api.spoonacular.com/users/connect?apiKey=dedff24430334863a5b7ee4319460a34',json,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        response.then(res=>{
            let spoonacularData = res.data;
            let {hash,spoonacularPassword,username} = spoonacularData;
            let spoonacularUsername = username
            let isLoggedIn = false;
            let userDetails = {...state,hash,spoonacularPassword,spoonacularUsername,isLoggedIn};
            addToLocalStorage(userDetails);
        })
        .catch(e=>console.log(e))
    }
  return (
    <Container className='mt-3'>
        <Row>
        <Col md={12}>
        <h1>Sign Up</h1>
      </Col>
            <Col md={6}>
            <Form onSubmit={onSubmitForm}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Username</Form.Label>
        <Form.Control onChange={onChangeHandler} type="text" placeholder="Enter username" name='username'/>
        <Form.Label>Firstname</Form.Label>
        <Form.Control onChange={onChangeHandler} type="text" placeholder="Enter Firstname" name='firstname'/>
        <Form.Label>Lastname</Form.Label>
        <Form.Control onChange={onChangeHandler} type="text" placeholder="Enter Lastname" name='lastname'/>
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={onChangeHandler} type="email" placeholder="Enter email" name='email'/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
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