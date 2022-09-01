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
import {collection,getDocs,addDoc} from 'firebase/firestore'
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export default function Login() {
    const [state,setState] = useState({password:'',email:'',err:''});
    const [users,setUsers] = useState([]);
    const apiKey = process.env.REACT_APP_API_KEY
    const google = window.google;
    // console.log(google)
    // const accounts = window.google.accounts;
    const navigate = useNavigate();
    const dispatch =useDispatch();
    const collectionRef = collection(database,'users');
    let data = []
    // const addData = async(obj)=>{
    //   try{
    //     const {family_name,given_name,email,name,picture} = obj
    //     const result =  await addDoc(collectionRef,{
    //       email:email,
    //       firstname:given_name,
    //       lastname:family_name,
    //       username:name,
    //       image:picture
    //     })
    //     // alert('Data added');
    //     // console.log('added');
    //   }catch(err){
    //     alert(err.message)
    //   }
    // }
    const addToLocal = (userData)=>{
      let arr = []
      arr.push(userData);
      localStorage.setItem('userData',JSON.stringify(arr));
      // alert('added to local storage')
      console.log('localstorage')
    }
    const userCheck = async(email)=>{
      let data =[]
      let result = []
      const response = await getDocs(collectionRef)
      response.docs.map(item=>{
        data.push(item.data())
      })
      result = data.filter(each=>(
        each.email===email
      ));
      // console.log(result);
      if(result.length===0){
        // console.log(false)
        return result
      }
      else{
        // console.log(true)
        return result
      }
    }
    const addDataToDB = async(spoonacularData,userObject)=>{
      try{
        const {hash,spoonacularPassword,username} = spoonacularData;
        const {family_name,given_name,email} = userObject;
        let firstname = given_name
        let lastname = family_name
        let spoonacularUsername = username;
        // const {firstname,lastname,email} = state
        const userDetails = {firstname,email,lastname,hash,spoonacularPassword,spoonacularUsername}
        const result =  await addDoc(collectionRef,userDetails)
        // alert('added to database')
        console.log('database')
        addToLocal(userDetails)
        // alert('Data added');
        // console.log('added');
      }catch(err){
        alert(err.message)
      }
    }
    const addUser = async(userObject)=>{
      const {family_name,given_name,email,name} = userObject;
      let firstname = given_name;
      let lastname = family_name;
      let username = name;
      let details = {firstname,lastname,username,email}
      let json = JSON.stringify(details);
      try{
        // let json = JSON.stringify(state);
        const response = await axios.post(`https://api.spoonacular.com/users/connect?apiKey=${apiKey}`,json,{
            headers:{
                'Content-Type':'application/json'
            }
      })
      let spoonacularData = response.data;
      // let userDetails = {...state,hash,spoonacularPassword,spoonacularUsername,isLoggedIn}
      // console.log(userDetails);
      // alert('added to spoonacular')
      console.log('spoonacular')
      addDataToDB(spoonacularData,userObject)
      }catch(err){
        alert(err.message)
      }
    }
    async function handleCallbackRespone(response){
      // console.log(response.credential)
      let userObject = jwt_decode(response.credential)
      // console.log(userObject);
      const check = await userCheck(userObject.email);
      // console.log(check);
      if(check.length!==0){
        // console.log(check);
        localStorage.setItem('token',response.credential);
        const userData = check.filter(each=>(
          each.email===userObject.email
        ));
        localStorage.setItem('userData',JSON.stringify(userData));
        dispatch(updateLoginStatus(true))
        navigate('/');
      }
      else{
        addUser(userObject);
        localStorage.setItem('token',response.credential);
        dispatch(updateLoginStatus(true));
        navigate('/');
      }
    }
    
    useEffect(()=>{
      if(google!==undefined){
        google.accounts.id.initialize({
          client_id:'472600162588-sadi7qqc6hbhpilqg7311g6o0ptj74ot.apps.googleusercontent.com',
          callback:handleCallbackRespone
        });
  
        google.accounts.id.renderButton(
          document.getElementById('signInDiv'),
          {theme:'outline',size:'large'}
        )
      }
      
    },[])
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
          // console.log(users);
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
    <Row className='d-flex justify-content-center align-items-center'>
      <Col md={12}>
        <h1 className='text-center'>Login</h1>
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
        <Form.Group id='signInDiv' className='mt-4'>
          
        </Form.Group>
        </Form>
        </Col>
    </Row>
</Container>
  )
}
