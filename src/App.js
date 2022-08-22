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
import './App.css';

function App() {
  const [isLoggedIn,setLoggedIn] = useState(false);
  useEffect(()=>{
    let localStorageData = JSON.parse(localStorage.getItem('usersData'));
    if(localStorageData!==null){
      localStorageData.map(each=>{
        if(each.isLoggedIn){
            setLoggedIn(true)
        }
      })
    }
    },[]);
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
        <Route path='/add-to-meal' element={isLoggedIn?<AddToMeal/>:<Login/>}/>
      </Routes>
      {/* <Footer/> */}
    </Router>
  );
}

export default App;
