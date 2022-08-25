import React,{useEffect,useState} from 'react';
import {getRandomRecipe,getRandomJoke,getAllFood} from '../../config/MyService';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { ordered, restocked } from '../../app/reducers/reducer'
import './index.css'

export default function RandomRecipe() {
    // const numOfCakes = useSelector(state => state.cake.numOfCakes)
    const dispatch = useDispatch()
    const [state,setState] = useState({recommendationSearch:''})
    const [allFood,setFood] = useState([]);
    const onChangeHandler = (e)=>{
        // console.log(e.target.value)
        const name = e.target.name;
        setState({...state,[name]:e.target.value})
      }
    const [randomRecipes,setRandomRecipe] = useState([]);
    const [joke,setJoke] = useState('');
    const navigate = useNavigate()
    useEffect(()=>{
        getRandomRecipe()
        .then(res=>{
            setRandomRecipe(res.data.recipes)
        });
        getRandomJoke()
        .then(res=>setJoke(res.data.text));
    },[]);
    const getRecipeInformation = (id)=>{
        navigate(`/recipe-information/${id}`)
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        const {recommendationSearch} = state
        getAllFood(recommendationSearch)
        .then(res=>setFood(res.data.searchResults));
    }
  return (
    <Container className='mt-5 pb-5'>
      <Row>
        {/* <Col md={6}>
        <h2>Number of cakes - {numOfCakes}</h2>
        <button onClick={() => dispatch(ordered())}>Order Cake</button>
        <button onClick={() => dispatch(restocked(5))}>Restock Cakes</button>
        </Col> */}
        <Col md={12} className='mt-5 pt-5'>
            <Form onSubmit={handleSubmit}>
                {/* <Form.Text>Get the Recommended wines by Food</Form.Text> */}
                <Form.Control onChange={onChangeHandler} className='mb-2' type='search' name='recommendationSearch' placeholder='Search Recipe,ingredient,etc.,'/>
                {/* <Form.Control type='submit' value='Search'/> */}
            </Form>
        </Col>
        {allFood.map((each,index)=>(
            <Col md={12} key={`each-type ${index}`} className='mt-5'>
                <h4>{each.name}</h4>
                <Row>
                    {each.results.map(each=>(
                        <Col md={3}>
                            <Card style={{height:'auto'}} className='mb-2 position-relative'>
                                <Card.Img variant="top" style={{height:'150px'}} src={each.image}/>
                                <Card.Body>
                                    <Card.Title className='text'>{each.name}</Card.Title>
                                </Card.Body>
                                <a className='btn btn-dark' href={each.link} target='_blank'>Know more</a>
                            </Card>
                        </Col>
                    ))}
                    
                </Row>
            </Col>
        ))}
        <Col md={12}>
            <h1 className='mb-2 mt-4'>Look Out Some Recipes Here</h1>
        </Col>
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
                        <Button variant="dark" onClick={()=>getRecipeInformation(each.id)}>Know More</Button>
                    </Card.Body>
                </Card>
            </Col>
        ))}
        <Col md={12}>
            <p className='text-dark border p-2'><span className='text-danger'>JOKE:</span>{joke}</p>
        </Col>
      </Row>
    </Container>
  )
}
