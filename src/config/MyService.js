import axios from "axios";
import {randomRecipe,searchRecipe,recipiInfo,cuisineApi,jokeApi,ingredientById,searchAllFood} from "./URL";
const apiKey = process.env.REACT_APP_API_KEY

function getRandomRecipe(){
    return (
        axios.get(randomRecipe)
    )
}
function searchOurRecipe(inputValue){
    return(
        axios.get(`${searchRecipe}&query=${inputValue}`)
    )
}

function getRecipeInfo(id){
    return (
        axios.get(`${recipiInfo}/${id}/information?apiKey=${apiKey}`)
    )
}
function getCuisine(name){
    return (
        axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=${name}`)
    )
}
function getRandomJoke(){
    return(
        axios.get(jokeApi)
    )
}
function getIngredientsForRecipe(id){
    return(
        axios.get(`${ingredientById}/${id}/ingredientWidget.json?apiKey=${apiKey}`)
    )
}
function getAllFood(query){
    return(
        axios.get(`${searchAllFood}&query=${query}&number=4&apiKey=${apiKey}`)
    )
}
export {getAllFood,getRandomRecipe,searchOurRecipe,getRecipeInfo,getCuisine,getRandomJoke,getIngredientsForRecipe};