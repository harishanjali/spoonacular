import Header from './components/header/Header';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import RandomRecipe from './components/RandomRecipe/RandomRecipe';
import HomeSearchRecipes from './components/HomeSearchRecipes/HomeSearchRecipes';
import './App.css';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<RandomRecipe/>}/>
        <Route path='/search' element={<HomeSearchRecipes/>}/>
      </Routes>
    </Router>
  );
}

export default App;
