const apiKey = process.env.REACT_APP_API_KEY

const randomRecipe = `https://api.spoonacular.com/recipes/random?number=20&apiKey=${apiKey}`;
const searchRecipe = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`;
const recipiInfo = `https://api.spoonacular.com/recipes`
const cuisineApi = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`;
const jokeApi = `https://api.spoonacular.com/food/jokes/random?apiKey=${apiKey}`
const ingredientById = `https://api.spoonacular.com/recipes`;
const searchAllFood = `https://api.spoonacular.com/food/search?`
export {randomRecipe,searchRecipe,recipiInfo,cuisineApi,jokeApi,ingredientById,searchAllFood};