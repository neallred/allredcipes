import React from 'react';
import { RecipeDisplay } from './RecipeDisplay.jsx';
import { RecipeCreate } from './RecipeCreate.jsx';
import { RecipeEdit } from './RecipeEdit.jsx';


export class OwnRecipes extends React.Component {
  render () {
    return <div>
      <RecipeDisplay stored_recipes={window.localStorage}/>
      <RecipeCreate/>
      <RecipeEdit
        recipe_id={this.props.recipe_id}
        saved_recipe={this.props.saved_recipe}/>
    </div>
  }
}
