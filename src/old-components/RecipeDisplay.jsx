import React from 'react';
import {Recipe} from './Recipe.jsx';
import {FixturesRecipes} from './FixturesRecipes.jsx';

export class RecipeDisplay extends React.Component{
  // let recipeStore = window.localStorage;
  //  let recipeJSON = JSON.parse(recipeStore[recipe_id]);
  //  let key = this.props.key;
  constructor(props) {
    let arr = [];
    if(window.localStorage.length > 0){
      Object.keys(window.localStorage).map((trumm) => {
        if(trumm !== 'nextRecipeId'){
          arr.push(JSON.parse(window.localStorage.getItem(trumm)));
        }
      })
    }

    super(props);
    this.state = {
      recipeStore: arr
    }
  }
  showPresetRecipes () {
    window.localStorage.clear();
    FixturesRecipes.forEach( (recipe) => {
      window.localStorage.setItem('nextRecipeId', 'recipe_001');
      let storageId = recipe.id
      if(typeof recipe !== 'string'){
        recipe = JSON.stringify(recipe);
        window.localStorage.setItem(storageId, recipe);
      }
    });
    //this.setState({recipeStore: window.localStorage});
  }
  isSelected (theDivClassName) {
    this.className = 'ingredients';
    //condition ? : ''
    if(1 === 2){
      this.className = 'ingredients'
    } else {
      this.className += 'hide-ingredients';
    }
  }
  removeRecipe (e) {
    e.stopPropagation();
    let recipeStore = window.localStorage;
    recipeStore.removeItem(this.props.recipe_id);
    let toRemove = e.currentTarget.parentNode.parentNode.parentNode;
    toRemove.parentNode.removeChild(toRemove);
  }
  render () {
    let recipe = this.state.recipeStore[0];
    return <Recipe key={recipe.key}
      recipe_id={recipe.id}
      name={recipe.name}
      ingredients={recipe.ingredients}
      instructions={recipe.instructions}
      onClick={this.isSelected.bind(this)}
      isSelected={console.log('bogus function isSelected')}
      removeRecipe={this.removeRecipe.bind(this)}
    />
    {/*return <div>
      {this.state.recipeStore.forEach( (recipe, key) => {
        console.log(recipe);
          //console.log(key);
          //console.log(recipe.id);
          //console.log(recipe.name);
          //console.log(recipe.ingredients);
          //console.log(recipe.instructions);
          //console.log(this.isSelected.bind(this));
          return <Recipe key={key}
            recipe_id={recipe.id}
            name={recipe.name}
            ingredients={recipe.ingredients}
            instructions={recipe.instructions}
            onClick={this.isSelected.bind(this)}
            trumm={console.log('do i get reached?')}
          />
      })}
      <button className='btn btn-success' onClick={this.showPresetRecipes.bind(this)}>(Re)set Recipes</button>
    </div>
    */}
  }





}
