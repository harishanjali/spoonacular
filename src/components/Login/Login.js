import React,{useState,useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux/es/exports';
import { updateLoginStatus } from '../../app/reducers/reducer';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../firebase'
import {app,database} from '../../config/firebaseConfig'
import {collection,getDocs} from 'firebase/firestore'

export default function Login() {
    const [state,setState] = useState({password:'',email:'',err:''});
    const [users,setUsers] = useState([]);
    const navigate = useNavigate();
    const dispatch =useDispatch();
    const collectionRef = collection(database,'users');
    let data = []
    useEffect(()=>{
      getAllUsers()
    },[])
    // console.log(data);
    const {email,password,err} = state;
    const getAllUsers =()=>{
      let data =[]
      getDocs(collectionRef)
      .then(res=>res.docs.map(item=>{
          data.push(item.data())
      }))
      setUsers(data);
    }
    const onChangeHandler = (e)=>{
        let name = e.target.name;
        setState({...state,[name]:e.target.value})
    }
      const navigateToSignUp = ()=>{
        navigate('/signup')
      }
      const handleSubmit = async(e)=>{
        e.preventDefault();
        // console.log(users);
        if(!email || !password){
          alert('fields are empty');
        }
        // return;
        try{
          const result = await signInWithEmailAndPassword(auth,email,password)
          setState({...state,err:''});
          alert(`Login Successful ${result.user.email}`)
          localStorage.setItem('token',result.user.accessToken);
          const userData = users.filter(each=>(
            each.email===result.user.email
          ));
          localStorage.setItem('userData',JSON.stringify(userData));
          dispatch(updateLoginStatus(true))
          navigate('/');
        }catch(error){
          if(error.message.includes('user-not-found')){
            setState({...state,err:'User Not Registred'});
          }
          if(error.message.includes('password')){
            setState({...state,err:'Invalid Crendentials'});
          }
        }
      }
  return (
    <Container className='mt-5 pt-5'>
    <Row>
      <Col md={12}>
        <h1>Login</h1>
      </Col>
        <Col md={6}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={onChangeHandler} type="email" placeholder="Enter email" name='email'/>
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={onChangeHandler} type="password" placeholder="Enter Password" name='password'/>
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
            <Form.Text className='text-danger d-block'>{err}</Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Form.Group className='mt-3'>
          <Form.Text className="text-dark fw-bold">
              Don't have an Account ? Create one by Signing up....
          </Form.Text>
          <Form.Control onClick={navigateToSignUp} className='btn btn-dark mt-2' type='button' value='SignUp'/>
        </Form.Group>
        </Form>
        </Col>
    </Row>
</Container>
  )
}
