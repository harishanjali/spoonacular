import React,{useEffect, useState} from 'react'
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import './index.css'
import Sidebar from '../sidebar/Sidebar';

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

export default function AddMeal() {
    const [state,setState] = useState({mealCalendar:'',mealItem:'',amount:1,userName:'',myHash:'',timeSlot:1});
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
    const addMeal = ()=>{
        let {mealCalendar,mealItem,amount,timeSlot} = state
        let datum = Date.parse(mealCalendar)/1000;
        timeSlot = parseInt(timeSlot);
        // mealCalendar = datum / 1000;
        // console.log(datum)
        // console.log(timeSlot)
        let data = {
            date:datum,
            slot:timeSlot,
            position:0,
            type:'RECIPE',
            value:{
                id:1,
                title:mealItem,
                servings:2,
                imageType:'jpg'
            }
        }
        let json = JSON.stringify(data)
        let response = axios.post(`https://api.spoonacular.com/mealplanner/${userName}/items?apiKey=${apiKey}&hash=${myHash}`,json,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        response.then(res=>{
            alert('Added the Recipe')
            console.log(res.data);
        });
    }
  return (
    <Container className='mt-5 pt-5 beverage-container'>
        <Row>
            <Col md={3}>
                <Sidebar pathsAndNames={pathsAndNames}/>
            </Col>
            <Col md={6} className='ps-5'>
            <Form>
                <h1>Add Meal</h1>
                <Form.Label>Select Time slot</Form.Label>
                <Form.Select onChange={onChangeHandler} aria-label="Default select example" name='timeSlot'>
                    <option disabled>Choose Food Time</option>
                    <option value="1">Breakfast</option>
                    <option value="2">Lunch</option>
                    <option value="3">Dinner</option>
                </Form.Select>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Date:</Form.Label>
                    <Form.Control onChange={onChangeHandler} type="date" placeholder="Enter date" name="mealCalendar"/>
                    <Form.Label>Add The Recipe:</Form.Label>
                    <Form.Control onChange={onChangeHandler} type ='text' placeholder="Type Recipe" name="mealItem"/>
                    <Form.Control className='mt-2 btn btn-dark' type ='button' onClick={addMeal} value='Add meal'/>
                </Form.Group>
            </Form>
            </Col>
        </Row>
    </Container>
  )
}
