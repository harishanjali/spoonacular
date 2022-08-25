import React,{useEffect,useState} from 'react';
import { searchOurRecipe } from '../../config/MyService';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom';

export default function HomeSearchRecipes() {
    const [inputValue,setValue] = useState('');
    const [searched,setSearched] = useState([]);
    const navigate = useNavigate();
    const onChangeSearchInput = (event)=>{
      setValue(event.target.value)
    }
    const getRecipeInformation = (id)=>{
      navigate(`/recipe-information/${id}`)
    }
    const handleSubmit = (e)=>{
      e.preventDefault();
      searchOurRecipe(searched)
        .then(res=>setSearched(res.data.results));
    }
  return (
    <div>
      <Container className='mt-5 pt-5'>
        <Row>
          <Col md={12}>
          <Form onSubmit={handleSubmit}>
            <Form.Control onChange={onChangeSearchInput} type="Search" placeholder="Search Recipes here" />
            {/* <Button variant="primary" type="submit">
              Search
            </Button> */}
          </Form>
          </Col>
        </Row>
      </Container>
        <div className='mt-5'>
        <Container>
      <Row>
        {searched.length!==0&&<h3>Results</h3>}
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
