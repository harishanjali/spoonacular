import React,{useEffect,useState} from 'react';
import { searchOurRecipe } from '../../config/MyService';
// import {useParams} from 'react-router-dom';

export default function HomeSearchRecipes() {
    const [searched,setSearched] = useState([]);
    const onChangeSearchInput = (event)=>{
        searchOurRecipe(event.target.value)
        .then(res=>console.log(res.data));
    }
  return (
    <div>
        <input style={{width:'80%',marginTop:'15px',marginLeft:'10px',height:'40px'}} onChange={onChangeSearchInput} type='search' placeholder='Search here'/>
    </div>
  )
}
