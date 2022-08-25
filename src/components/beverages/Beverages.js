import React,{useEffect} from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from '../sidebar/Sidebar';
import { Link } from 'react-router-dom';
import './index.css'

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

export default function Beverages() {
    
  return (
    <Container fluid className='beverage-container mt-5 pt-5'>
        <Row>
            <Col md={3}>
                <Sidebar pathsAndNames={pathsAndNames}/>
            </Col>
            <Col md={9}>
                <div>
                    Explore beverages....
                </div>
            </Col>
        </Row>
    </Container>
  )
}
