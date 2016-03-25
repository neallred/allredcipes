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
    let nextNumber = localStorage.getItem('nextRecipeId');
    nextNumber = nextNumber.toString().match(/\d+/);
    localStorage.setItem(id, recipe);
    localStorage.setItem('nextRecipeId', 'recipe_'+ (parseInt(nextNumber) + 1));
    this.setState({currentId: localStorage.getItem('nextRecipeId')});
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
  handleInstructionsChange (e) {
    let newInstructions = update(this.state.recipe, {
      instructions: {$set: e.target.value}
    });
    this.setState({recipe: newInstructions});
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
    return <div>
      <h2 className='add-recipes'>Add recipes here!</h2>
      <form className='container'>
        <input type='text'
          placeholder='Recipe name'
          onChange={this.handleNameChange.bind(this)}
        /><br/>
        <input type='text'
          placeholder='Ingredients (comma separated)'
          onChange={this.handleIngredientsChange.bind(this)}
        /><br/>
        <textarea 
          placeholder='Instructions'
          onChange={this.handleInstructionsChange.bind(this)}
        /><br/>
        <button type='submit' onClick={this.store.bind(this)}>Submit</button>
      </form>
    </div>
  }
}

