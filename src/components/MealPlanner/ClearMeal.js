import React,{useEffect, useState} from 'react'
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Sidebar from '../sidebar/Sidebar';
import './index.css'

const pathsAndNames = [
    {
        id:1,
        name:'Add meal',
        path:'/add-meal'
    },
    {
        id:2,
        name:'Get Meal Plan - Day',
        path:'/get-meal'
    },
    {
        id:3,
        name:'Clear Meal plan - Day',
        path:'/clear-meal'
    },
    {
        id:4,
        name:'Get Meal Plan Week',
        path:'/get-meal-week'
    }
]

export default function ClearMeal() {
    const [state,setState] = useState({clearMealCalendar:'',userName:'',myHash:''});
    const {userName,myHash,statusCode} = state;
    const apiKey = process.env.REACT_APP_API_KEY
    useEffect(()=>{
        let localStorageData = JSON.parse(localStorage.getItem('userData'));
        const {hash,spoonacularUsername} = localStorageData[0];
        // console.log(localStorageData);
        setState({...state,myHash:hash,userName:spoonacularUsername})
    },[])
    const onChangeHandler = (e)=>{
        let name = e.target.name;
        setState({...state,[name]:e.target.value});
    }
    
    const clearMeal = ()=>{
        const {clearMealCalendar} = state
        let response = axios.delete(`https://api.spoonacular.com/mealplanner/${userName}/day/${clearMealCalendar}?hash=${myHash}&apiKey=${apiKey}`,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        response.then(res=>{
            alert(`Meal plan Cleared on the date of: ${clearMealCalendar}`)
            // console.log(res.data);
        })
    }
  return (
    <Container className='mt-5 pt-5 beverage-container'>
        <Row>
            <Col md={3}>
                <Sidebar pathsAndNames={pathsAndNames}/>
            </Col>
            <Col md={6} className='ps-5'>
            <Form>
                <h1>Clear Meal Plan Day</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Date:</Form.Label>
                    <Form.Control onChange={onChangeHandler} type="date" placeholder="Enter Date" name="clearMealCalendar"/>
                    <Form.Control className='mt-2 btn btn-dark' type ='button' onClick={clearMeal} value='Clear Meal Plan Day'/>
                </Form.Group>
            </Form>
            </Col>
           
        </Row>
    </Container>
  )
}
