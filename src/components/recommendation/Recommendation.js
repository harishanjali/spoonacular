import React,{useEffect,useState} from 'react'
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
export default function Recommendation() {
  const [recommendedData,setData] = useState([])
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
    const result = axios.get(`https://api.spoonacular.com/food/wine/recommendation?wine=${recommendationSearch}&number=10&apiKey=${process.env.REACT_APP_API_KEY}`)
    result.then(res=>setData(res.data.recommendedWines))
  }
  
  return (
    <Container fluid className='beverage-container'>
        <Row>
            <Col md={3}>
            <Sidebar pathsAndNames={pathsAndNames}/>
            </Col>
            <Col md={9} className='mt-5 pt-5'>
              <Form onSubmit={handleSubmit}>
                <Form.Text>Get the Recommended wines</Form.Text>
                <Form.Control onChange={onChangeHandler} className='mb-2' type='search' name='recommendationSearch' placeholder='get recommended wines'/>
                <Form.Control type='submit' value='Search'/>
              </Form>
              <Row>
                <h4 className='mt-3 mb-3'>Results</h4>
              {recommendedData.map(each=>(
            <Col md={3} key={each.id}>
                <Card style={{height:'450px'}} className='mb-2 position-relative'>
                    <Card.Img variant="top" src={each.imageUrl} />
                    <Card.Body>
                        <Card.Title className='text'>{each.title}</Card.Title>
                        <Card.Text className='text-danger'>
                            ReadyInMinutes:mins
                        </Card.Text>
                        <Card.Text className='text text-dark'>
                            Summary:
                        </Card.Text>
                        <Button variant="dark">Know More</Button>
                    </Card.Body>
                </Card>
            </Col>
              ))}
              </Row>
            </Col>
        </Row>
    </Container>
  )
}
