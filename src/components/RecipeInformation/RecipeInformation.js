import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom';
import { getRecipeInfo,getIngredientsForRecipe} from '../../config/MyService';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';


export default function RecipeInformation() {
    const [recipeInfo,setRecipeInfo] = useState({})
    const [recipeIngredients,setIngredients] = useState([]);

    const {id} = useParams();
    useEffect(()=>{
        getRecipeInfo(id)
        .then(res=>{
            setRecipeInfo(res.data)
            // console.log(res.data);
        });
        getIngredientsForRecipe(id)
        .then(res=>{
            setIngredients(res.data.ingredients)
            console.log(res.data.ingredients)
        });
    },[]);
  return (
    <Container className='mt-5 pt-3'>
        <Row>
            <Col md={6}>
                <h1>Recipe Info</h1>
            <Card style={{height:'auto'}} className='mb-2 position-relative'>
                    <Card.Img variant="top" src={recipeInfo.image} />
                    <Card.Body>
                        <Card.Title >{recipeInfo.title}</Card.Title>
                        <Card.Text className='text-danger'>
                            ReadyInMinutes: {recipeInfo.readyInMinutes}mins
                        </Card.Text>
                    </Card.Body>
            </Card>
            </Col>
            <Col md={6} className='mt-5'>
                <h1>Ingredients</h1>
                {recipeIngredients.map(each=>(
                    <>
                        <p className='text-uppercase'>{each.name} : <span className='text-dark fw-bold'>{each.amount.metric.value}</span><span className='fw-bold text-danger'>{each.amount.metric.unit}</span></p>
                        
                    </>
                    
                ))}
            </Col>
            <Col md={12}>
                <Accordion defaultActiveKey="0" flush className='bg-dark'>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Instructions</Accordion.Header>
                            <Accordion.Body>
                            {recipeInfo.instructions}
                            </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Summary</Accordion.Header>
                        <Accordion.Body>
                        {recipeInfo.summary}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Col>
        </Row>
        
    </Container>
    
  )
}
