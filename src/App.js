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
import AddToMeal from './components/MealPlanner/MealPlanner';
import Beverages from './components/beverages/Beverages';
import { useSelector, useDispatch } from 'react-redux'
import Recommendation from './components/recommendation/Recommendation';
import WinePair from './components/winepair/WinePair';
import AddMeal from './components/MealPlanner/AddMeal';
import GetMeal from './components/MealPlanner/GetMeal';
import ClearMeal from './components/MealPlanner/ClearMeal';
import GetMealWeek from './components/MealPlanner/GetMealWeek';
import './App.css';
import DishPairWine from './components/dishPairWine/DishPairWine';
import {updateLoginStatus} from './app/reducers/reducer'
// import { useDispatch } from 'react-redux/es/exports';

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    const token = (localStorage.getItem('token'));
    if(token!==null){
      dispatch(updateLoginStatus(true))
    }
    else{
      dispatch(updateLoginStatus(false))
    }
  },[])
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
        <Route path='/beverages' element={<Beverages/>}/>
        <Route path='/recommendation' element={<Recommendation/>}/>
        <Route path='/add-to-meal' element={<AddToMeal/>}/>
        <Route path='/wine-pair' element={<WinePair/>}/>
        <Route path='/dish-pair-wine' element={<DishPairWine/>}/>
        <Route path='/add-meal' element={<AddMeal/>}/>
        <Route path='/get-meal' element={<GetMeal/>}/>
        <Route path='/clear-meal' element={<ClearMeal/>}/>
        <Route path='/get-meal-week' element={<GetMealWeek/>}/>
      </Routes>
      {/* <Footer/> */}
    </Router>
  );
}

export default App;
