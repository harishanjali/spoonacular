import React,{useEffect, useState} from 'react'
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import './index.css'

export default function AddToMeal() {
    const [state,setState] = useState({mealCalendar:'',mealItem:'',amount:1,getMealCalendar:'',userName:'',myHash:'',statusCode:200,timeSlot:1});
    const [ingredients,setIngredients] = useState([]);
    const {userName,myHash,statusCode} = state;
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
        let response = axios.post(`https://api.spoonacular.com/mealplanner/${userName}/items?apiKey=dedff24430334863a5b7ee4319460a34&hash=${myHash}`,json,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        response.then(res=>{
            alert('Added the Recipe')
            console.log(res.data);
        });
    }
    const getMeal = ()=>{
        const {getMealCalendar} = state
        let response = axios.get(`https://api.spoonacular.com/mealplanner/${userName}/day/${getMealCalendar}?hash=${myHash}&apiKey=dedff24430334863a5b7ee4319460a34`)
        response.then(res=>setIngredients(res.data))
        .catch(e=>setState({...state,statusCode:e.response.status}))
    }
    const onDeleteItem = (id)=>{
        let response = axios.delete(`https://api.spoonacular.com/mealplanner/${userName}/items/${id}?hash=${myHash}&apiKey=dedff24430334863a5b7ee4319460a34`,{
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
    <Container>
        <Row>
            <Col md={6}>
            <Form>
                <h1>Add Meal</h1>
                <Form.Label>Select time Time slot</Form.Label>
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
                <h1>Get Meal</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Date:</Form.Label>
                    <Form.Control onChange={onChangeHandler} type="date" placeholder="Enter Date" name="getMealCalendar"/>
                    <Form.Control className='mt-2 btn btn-dark' type ='button' onClick={getMeal} value='Get meal'/>
                </Form.Group>
            </Form>
            </Col>
            <Col md={12}>
                <h4>Items</h4>
                <ul className='meal-plan-items'>
                    {ingredients.length!==0 && statusCode===200?ingredients.items.map(each=>{
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
                        
                    }):null}
                </ul>
                {statusCode===400&&<p>No meal plans</p>}
            </Col>
        </Row>
    </Container>
  )
}
