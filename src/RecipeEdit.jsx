import React from 'react';
import update from 'react-addons-update';

export class RecipeEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe_id: '',
      recipe: {
        name: '',
        ingredients: '',
        instructions: ''
      }
    }
  }
  componentWillReceiveProps (nextProps) {
    this.setState({recipe_id: nextProps.recipe_id});
    this.setState({recipe: nextProps.saved_recipe});
  }
  handleInputChange (inputValue, e) {
    let newValue = update(this.state.recipe, {
      [inputValue]: {$set: e.target.value}
    });
    this.setState({recipe: newValue});
    this.setState({value: event.target.value});
  }
  store(e) {
    if(this.state.recipe.name === '' || this.state.recipe.ingredients === [] ){
      return;
    }
    e.stopPropagation();
    let id = this.state.recipe_id;
    let recipe = JSON.stringify(this.state.recipe);
    localStorage.setItem(id, recipe);

  };

  render () {
    let name = this.state.recipe ? this.state.recipe.name : null;
    let ingredients = this.state.recipe ? this.state.recipe.ingredients : null;
    let instructions = this.state.recipe ? this.state.recipe.instructions : null;
    return <div className='modalDialog' id='dialog'>
      <div>
        <p className='close-edit-box'>X</p>
        <h2 className='add-recipes'>Edit {name}:</h2>
        <form className='container'>
          <input type='text'
            placeholder='Recipe name'
            onChange={this.handleInputChange.bind(this, 'name')}
            value={name}
          /><br/>
          <textarea
            placeholder='Ingredients'
            onChange={this.handleInputChange.bind(this, 'ingredients')}
            value={ingredients}
          /><br/>
          <textarea 
            placeholder='Instructions'
            onChange={this.handleInputChange.bind(this, 'instructions')}
            value={instructions}
          /><br/>
          <button type='submit' onClick={this.store.bind(this)}>Submit</button>
        </form>
      </div>
    </div>
  }
}
