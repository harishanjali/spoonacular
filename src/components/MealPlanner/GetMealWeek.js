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

export default function GetMealWeek() {
    const [state,setState] = useState({getMealCalendar:'',userName:'',myHash:'',statusCode:200});
    const [days,setDays] = useState([]);
    const {userName,myHash,statusCode} = state;
    const apiKey = process.env.REACT_APP_API_KEY
    useEffect(()=>{
        let localStorageData = JSON.parse(localStorage.getItem('usersData'));
        localStorageData.map(each=>{
            if(each.isLoggedIn){
                // userName = each.spoonacularUsername;
                // myHash = each.hash;
                setState({...state,userName:each.spoonacularUsername,myHash:each.hash})
            }
        })
    },[])
    const onChangeHandler = (e)=>{
        let name = e.target.name;
        setState({...state,[name]:e.target.value});
    }
    const getMeal = ()=>{
        const {getMealCalendar} = state
        let response = axios.get(`https://api.spoonacular.com/mealplanner/${userName}/week/${getMealCalendar}?hash=${myHash}&apiKey=${apiKey}`)
        response.then(res=>{
            if(res.data.days.length===0){
                alert('No Meal plans on this Date')
            }
            else{
                setDays(res.data.days);
            }
        })
        .catch(e=>setState({...state,statusCode:e.response.status}))
    }
    const onDeleteItem = (id)=>{
        let response = axios.delete(`https://api.spoonacular.com/mealplanner/${userName}/items/${id}?hash=${myHash}&apiKey=${apiKey}`,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        response.then(res=>{
            alert('Item Deleted')
            // console.log(res)
            getMeal();
        })
    }
  return (
    <Container className='mt-5 pt-5 beverage-container'>
        <Row>
            <Col md={3}>
                <Sidebar pathsAndNames={pathsAndNames}/>
            </Col>
            <Col md={9} className='ps-5'>
                <Row>
                    <Col md={12}>
                    <Form>
                        <h1>Get Meal Plan Week</h1>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Date:</Form.Label>
                            <Form.Control onChange={onChangeHandler} type="date" placeholder="Enter Date" name="getMealCalendar"/>
                            <Form.Control className='mt-2 btn btn-dark' type ='button' onClick={getMeal} value='Get meal'/>
                        </Form.Group>
                    </Form>
                    </Col>
                    <Col md={12}>
                        <h4>Meal Plans By Day</h4>
                        <section className='mt-5'>
                            {days.map(each=>(
                                <div key={`each${each.day}`}>
                                    <h6>{each.day} :</h6>
                                        <ul key={`each${each.day}`}>
                                        {each.items.map(each=>{
                                            let mySlot;
                                            if(each.slot===1){
                                                mySlot='BreakFast'
                                            }
                                            else if(each.slot===2){
                                                mySlot='Lunch'
                                            }
                                            else if(each.slot===3){
                                                mySlot='Dinner'
                                            }
                                            return(
                                                <li className='text-uppercase d-flex justify-content-between align-items-center mb-3 bg-dark text-light p-2' key={each.id}>{each.value.title}  <span>Timing: {mySlot}</span><input className='btn btn-danger' onClick={()=>onDeleteItem(each.id)} type='button' value='Delete'/></li>
                                            )
                                            
                                        })}
                                        </ul>
                                </div>
                            ))}
                        </section>
                    </Col>
                </Row>
            
            </Col>
            
        </Row>
    </Container>
  )
}
