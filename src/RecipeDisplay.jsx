import React from 'react';
import {Recipe} from './Recipe.jsx';

export class RecipeDisplay extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: window.localStorage
    }
  }
  render () {
    console.log(this.state.data);
    return <div>
      {Object.keys(this.state.data).map(function(value, key) {
        {if(value.indexOf('recipe') !== -1){
          return <Recipe key={key} value={value}/>
        }}
      })}  
    </div>
  }
}
