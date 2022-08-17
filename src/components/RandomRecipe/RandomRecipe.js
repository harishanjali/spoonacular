import React,{useEffect,useState} from 'react';
import {getRandomRecipe} from '../../config/MyService';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './index.css'

export default function RandomRecipe() {
    const [randomRecipes,setRandomRecipe] = useState([]);
    useEffect(()=>{
        getRandomRecipe()
        .then(res=>{
            setRandomRecipe(res.data.recipes)
            console.log(res.data.recipes)
        });
    },[]);
  return (
    <Container>
      <Row>
        {randomRecipes.map(each=>(
            <Col xs={12} sm={2} md={3} key={each.id}>
                <Card style={{height:'400px'}} className='mb-2 position-relative'>
                    <Card.Img variant="top" src={each.image} />
                    <Card.Body>
                        <Card.Title className='text'>{each.title}</Card.Title>
                        <Card.Text className='text-danger'>
                            ReadyInMinutes: {each.readyInMinutes}mins
                        </Card.Text>
                        <Card.Text className='text text-dark'>
                            Summary: {each.summary}
                        </Card.Text>
                        <Button variant="dark">Know More</Button>
                    </Card.Body>
                </Card>
            </Col>
        ))}
      </Row>
    </Container>
  )
}
