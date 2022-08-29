import React,{useState,useEffect} from 'react'
import { getCuisine } from '../../config/MyService'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import {useNavigate} from 'react-router-dom';

export default function Cuisine() {
  const [cuisines,setCuisine] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    getCuisine('italian')
    .then(res=>setCuisine(res.data.results));
  },[]);
    function  getTheCuisineData(event){
        getCuisine(event.target.value)
        .then(res=>{
          setCuisine(res.data.results)
        });
    }
    const getRecipeInformation = (id)=>{
      navigate(`/recipe-information/${id}`)
    }
  return (
    <div className='pt-5 mt-5'>
      <h1 className='text-light text-center bg-dark mt-4'>Cuisines</h1>
      <Container className='d-flex justify-content-center align-items-center mt-5'>
      <input className='btn btn-success me-2' onClick={getTheCuisineData} type='button' value='italian'/>
        <input className='btn btn-success me-2' onClick={getTheCuisineData} type='button'value='indian'/>
        <input className='btn btn-success me-2' onClick={getTheCuisineData} type='button'value='American'/>
        <input className='btn btn-success me-2' onClick={getTheCuisineData} type='button'value='Chinese'/>
      </Container>
        <Container className='mt-3'>
          <Row>
          {cuisines.map(each=>(
            <Col xs={12} sm={6} md={4} key={each.id}>
                <Card style={{height:'auto'}} className='mb-2 position-relative'>
                    <Card.Img variant="top" src={each.image} />
                    <Card.Body>
                        <Card.Title className='title-text'>{each.title}</Card.Title>
                        <Form.Control className='btn btn-dark' onClick={()=>getRecipeInformation(each.id)} value='Know More' />
                    </Card.Body>
                </Card>
            </Col>
        ))}
          </Row>
        </Container>
        
    </div>
  )
}
