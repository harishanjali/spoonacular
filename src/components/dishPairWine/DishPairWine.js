import React,{useState} from 'react'
import Sidebar from '../sidebar/Sidebar'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const pathsAndNames = [
  {
      id:1,
      name:'Recommendation',
      path:'/recommendation'
  },
  {
      id:2,
      name:'Wine Pair',
      path:'/wine-pair'
  },
  {
      id:3,
      name:'Dish Pairing for Wine',
      path:'/dish-pair-wine'
  }
]

export default function DishPairWine() {
  const [recommendedData,setData] = useState({})
  console.log();
  const [state,setQuery] = useState({recommendationSearch:''})
  const onChangeHandler = (e)=>{
    // console.log(e.target.value)
    const name = e.target.name;
    setQuery({...state,[name]:e.target.value})
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    const {recommendationSearch} = state;
    console.log(recommendationSearch)
    const result = axios.get(`https://api.spoonacular.com/food/wine/dishes?wine=${recommendationSearch}&apiKey=${process.env.REACT_APP_API_KEY}`)
    result.then(res=>setData(res.data))
  }
  return (
    <Container fluid className='beverage-container mt-5 pt-5'>
        <Row>
            <Col md={3}>
            <Sidebar pathsAndNames={pathsAndNames}/>
            </Col>
            <Col md={9}>
            <p>Find a dish that goes well with a given wine.</p>
            <Form onSubmit={handleSubmit}>
                <Form.Text>Get the Recommended food by Wine</Form.Text>
                <Form.Control onChange={onChangeHandler} className='mb-2' type='search' name='recommendationSearch' placeholder='Find a Food that goes well with a Wine'/>
                <Form.Control type='submit' value='Get Food'/>
              </Form>
              <Row>
                <Col md={12}>
                <p className='mt-4'>{Object.keys(recommendedData).length!==0&&recommendedData.text}</p>
                  {Object.keys(recommendedData).length!==0&&<h3>List of Foods</h3>}
                  {Object.keys(recommendedData).length!==0&&recommendedData.pairings.map(each=>(
                    <p key={each}>**{each}</p>
                  ))}
                </Col>
              </Row>
            </Col>
        </Row>
    </Container>
  )
}
