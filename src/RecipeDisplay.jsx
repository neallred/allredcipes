import React from 'react';
import {Recipe} from './Recipe.jsx';
import {FixturesRecipes} from './FixturesRecipes.jsx';

export class RecipeDisplay extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      recipeStore: window.localStorage
    }
  }
  showPresetRecipes () {
    window.localStorage.clear();
    Object.keys(FixturesRecipes).map(function(recipeId, key) {
      let recipeObject = FixturesRecipes[recipeId];
      if(typeof recipeObject !== 'string'){recipeObject = JSON.stringify(recipeObject);}
      window.localStorage.setItem(recipeId, recipeObject);
    });
    this.setState({recipeStore: window.localStorage});
    
  }
  render () {
    return <div>
      {Object.keys(this.state.recipeStore).map(function(recipe_id, key) {
        {if(recipe_id.indexOf('recipe') !== -1){
          return <Recipe key={key} recipe_id={recipe_id}/>
        }}
      })}
      <button className='btn btn-success' onClick={this.showPresetRecipes.bind(this)}>(Re)set Recipes</button>
    </div>
  }
}
