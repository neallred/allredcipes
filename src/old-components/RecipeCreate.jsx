import React from 'react';
import update from 'react-addons-update';

export class RecipeCreate extends React.Component {
  constructor(props) {
    super(props);
    localStorage.getItem('nextRecipeId') ? null : localStorage.setItem('nextRecipeId', 'recipe_' + 1);
    this.state = {
      currentId: localStorage.getItem('nextRecipeId'),
      recipe: {
        name: '',
        ingredients: '',
        instructions: ''
      }
    }
  };

  store(e) {
    if(this.state.recipe.name === '' || this.state.recipe.ingredients === [] ){
      return;
    }
    e.stopPropagation();
    let id = this.state.currentId;
    let recipe = JSON.stringify(this.state.recipe);
    localStorage.setItem(id, recipe);

    let nextRecipeId = localStorage.getItem('nextRecipeId');
    nextRecipeId = nextRecipeId.toString().match(/\d+/);
    let setNextRecipeId = function(prefix){
      localStorage.setItem('nextRecipeId', 'recipe_'+prefix+(parseInt(nextRecipeId)+1) )}
    if(nextRecipeId < 10){setNextRecipeId('00');}
    else if(nextRecipeId < 100){setNextRecipeId('0');}
    else{setNextRecipeId('');}
  };
  handleInputChange (inputValue, e) {
    let newValue = update(this.state.recipe, {
      [inputValue]: {$set: e.target.value}
    });
    this.setState({recipe: newValue});
  }
  render () {
    return <div>
      <h2 className='add-recipes'>Add recipes here!</h2>
      <form className='container'>
        <input type='text'
          placeholder='Recipe name'
          onChange={this.handleInputChange.bind(this, 'name')}
        /><br/>
        <textarea
          placeholder='Ingredients'
          onChange={this.handleInputChange.bind(this, 'ingredients')}
        /><br/>
        <textarea 
          placeholder='Instructions'
          onChange={this.handleInputChange.bind(this, 'instructions')}
        /><br/>
        <button type='submit' onClick={this.store.bind(this)}>Submit</button>
      </form>
    </div>
  }
}
