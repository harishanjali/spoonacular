import axios from "axios";
import {randomRecipe,searchRecipe} from "./URL";


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

export {getRandomRecipe,searchOurRecipe};