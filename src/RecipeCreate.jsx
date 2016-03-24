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
        ingredients: [],
      }
    }
  };

  store(e) {
    if(!this.state.recipe.name || !this.state.recipe.ingredients){
      return;
    }
    e.stopPropagation();
    let id = this.state.currentId;
    let recipe = JSON.stringify(this.state.recipe);
    let nextNumber = localStorage.getItem('nextRecipeId');
    nextNumber = nextNumber.toString().match(/\d+/);
    localStorage.setItem(id, recipe);
    localStorage.setItem('nextRecipeId', 'recipe_'+ (parseInt(nextNumber) + 1));
    this.setState({currentId: localStorage.getItem('nextRecipeId')});
  };
  updateTemporaryVar () {
    this.setState({recipes: 'abba2'});
  };
  handleNameChange (e) {
    let newName = update(this.state.recipe, {
      name: {$set: e.target.value}
    });
    this.setState({recipe: newName});
  };
  handleIngredientsChange (e) {
    let newIngredients = update(this.state.recipe, {
      ingredients: {$set: e.target.value.split(',')}
    });
    this.setState({recipe: newIngredients});
  };
  handleSubmit (e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if(!text || !author){
      return;
    }
    /*this.props.onCommentSubmit({author: author, text: text});
      this.setState({author: '', text: ''});*/
  }


  render () {
    return <form>
      <input type='text'
        placeholder='Recipe name'
        onChange={this.handleNameChange.bind(this)}
      /><br/>
      <input type='text'
        placeholder='ingredients (comma separated)'
        onChange={this.handleIngredientsChange.bind(this)}
      /><br/>
      <button type='submit' onClick={this.store.bind(this)}>Submit</button>
    </form>
  }
}

