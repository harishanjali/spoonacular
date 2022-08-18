import React,{useEffect,useState} from 'react';
import { searchOurRecipe } from '../../config/MyService';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';

export default function HomeSearchRecipes() {
    const [searched,setSearched] = useState([]);
    const navigate = useNavigate();
    const onChangeSearchInput = (event)=>{
        searchOurRecipe(event.target.value)
        .then(res=>setSearched(res.data.results));
    }
    const getRecipeInformation = (id)=>{
      navigate(`/recipe-information/${id}`)
    }
  return (
    <div>
      <Container className='mt-5'>
        <input style={{width:'80%',marginTop:'15px',height:'40px'}} onChange={onChangeSearchInput} type='search' placeholder='Search Recipes here'/>
      </Container>
        <div>
        <Container>
      <Row>
        {searched.map(each=>(
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
                        <Button variant="dark" onClick={()=>getRecipeInformation(each.id)}>Know More</Button>
                    </Card.Body>
                </Card>
            </Col>
        ))}
      </Row>
    </Container>
        </div>
    </div>
  )
}
