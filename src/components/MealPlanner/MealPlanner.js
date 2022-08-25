import React,{useEffect, useState} from 'react'
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Sidebar from '../sidebar/Sidebar';
import './index.css'

const pathsAndNames = [
    {
        id:1,
        name:'Add meal',
        path:'/add-meal'
    },
    {
        id:2,
        name:'Get Meal Plan - Day',
        path:'/get-meal'
    },
    {
        id:3,
        name:'Clear Meal plan - Day',
        path:'/clear-meal'
    },
    {
        id:4,
        name:'Get Meal Plan Week',
        path:'/get-meal-week'
    }
]
export default function AddToMeal() {
  return (
    <Container fluid className='beverage-container'>
        <Row>
            <Col md={3}>
                <Sidebar pathsAndNames={pathsAndNames}/>
            </Col>
            <Col md={4} className='mt-5 pt-5'>
                Welcome to meal Planner. Explore the features....
            </Col>
        </Row>
    </Container>
  )
}
