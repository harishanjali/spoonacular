import React from 'react'
import './index.css';
import { Link } from 'react-router-dom';
export default function Sidebar(props) {
    const {pathsAndNames} = props;
  return (
    <div className='side-bar pt-3'>
      {pathsAndNames.map(each=>(
          <Link key={each.id} to={each.path} className='ms-4 link-beverage mb-2'>{each.name}</Link>
      ))}
        
        {/* <Link to='/wine-pair' className='ms-4 link-beverage mb-2'>Wine pair</Link> */}
        {/* <Link to='/dish-pair-wine' className='ms-4 link-beverage mb-2'>Dish pairing For Wine</Link> */}
    </div>
  )
}
