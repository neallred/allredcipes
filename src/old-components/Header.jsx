import React from 'react';
import { Link } from 'react-router';

export const Header = ({}) => {
    return <div className='recipe-header'>
      <h1>Allreds Recipe Box</h1>
      <li className= 'btn btn-primary'><Link to='/'>abacus</Link></li>
      <li className= 'btn btn-primary'><Link to='/own-recipes'>bacco</Link></li>
      <li className= 'btn btn-primary'><Link to='/other-recipes'>custard</Link></li>
    </div>
  }
