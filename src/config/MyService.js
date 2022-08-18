import axios from "axios";
import {randomRecipe,searchRecipe,recipiInfo,cuisineApi,jokeApi,ingredientById} from "./URL";


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
        axios.get(`${recipiInfo}/${id}/information?apiKey=dedff24430334863a5b7ee4319460a34`)
    )
}
function getCuisine(name){
    return (
        axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=dedff24430334863a5b7ee4319460a34&cuisine=${name}`)
    )
}
function getRandomJoke(){
    return(
        axios.get(jokeApi)
    )
}
function getIngredientsForRecipe(id){
    return(
        axios.get(`${ingredientById}/${id}/ingredientWidget.json?apiKey=dedff24430334863a5b7ee4319460a34`)
    )
}
export {getRandomRecipe,searchOurRecipe,getRecipeInfo,getCuisine,getRandomJoke,getIngredientsForRecipe};