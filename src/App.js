import React,{useEffect,useState} from 'react';
import Header from './components/header/Header';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import RandomRecipe from './components/RandomRecipe/RandomRecipe';
import HomeSearchRecipes from './components/HomeSearchRecipes/HomeSearchRecipes';
import RecipeInformation from './components/RecipeInformation/RecipeInformation';
import Cuisine from './components/Cuisine/Cuisine';
import Footer from './components/Footer/index';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import AddToMeal from './components/addMealPlanner/AddToMeal';
import { useSelector, useDispatch } from 'react-redux'
import './App.css';

function App() {
  const isLoggedIn = useSelector(state=>state.cake.data);
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<RandomRecipe/>}/>
        <Route path='/search' element={<HomeSearchRecipes/>}/>
        <Route path='/recipe-information/:id' element={<RecipeInformation/>}/>
        <Route path='/cuisine' element={<Cuisine/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/add-to-meal' element={<AddToMeal/>}/>
      </Routes>
      {/* <Footer/> */}
    </Router>
  );
}

export default App;
