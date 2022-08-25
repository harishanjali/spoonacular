import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux/es/exports';
import { updateLoginStatus } from '../../app/reducers/reducer';

export default function Login() {
    const [state,setState] = useState({username:'',email:''});
    const navigate = useNavigate();
    const dispatch =useDispatch();
    const onChangeHandler = (e)=>{
        let name = e.target.name;
        setState({...state,[name]:e.target.value})
    }
    function isThereUser(item){
        let arr=JSON.parse(localStorage.getItem('usersData'));
        let result;
        if(arr!==null){
          for(let items of arr){
            if(items.email===item.email){
              result = true;
              break;
            }
            else{
              result = false;
            }
          }
        }
        else{
          result = false;
        }
        
        return result;
      }
      const navigateToSignUp = ()=>{
        navigate('/signup')
      }
    const onSubmitForm = (e)=>{
        e.preventDefault();
        let userCheck = isThereUser(state)
        if(userCheck){
            let arr=JSON.parse(localStorage.getItem('usersData'));
            arr.map(each=>{
                if(each.email===state.email){
                    each.isLoggedIn = true
                }
                else{
                    each.isLoggedIn = false
                }
            })
            localStorage.setItem('usersData',JSON.stringify(arr));
            dispatch(updateLoginStatus(true));
            alert('user registered')
            navigate('/');
        }
        else{
            alert('user not registered');
        }
    }
  return (
    <Container className='mt-5 pt-5'>
    <Row>
      <Col md={12}>
        <h1>Login</h1>
      </Col>
        <Col md={6}>
        <Form onSubmit={onSubmitForm}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control onChange={onChangeHandler} type="text" placeholder="Enter username" name='username'/>
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={onChangeHandler} type="email" placeholder="Enter email" name='email'/>
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
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
