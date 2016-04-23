import React from 'react'
import { connect } from 'react-redux'
import { updateRecipe } from '../actions'

let UpdateRecipe = ({ dispatch }) => {
  let newId
  let newHideIngredients
  let newName
  let newIngredients
  let newInstructions
  let newAuthor
  return <div className='modalDialog' id='dialog'>
    <p className='close-edit-box'>X</p>
    <h2 className='add-recipes'>Edit</h2>
    <form
      className='container'
      onSubmit={e => {
        e.preventDefault()
        if(!newName.value.trim()){
          return
        }
        dispatch(updateRecipe(newName.value, newIngredients.value, newInstructions.value, newAuthor.value))
        newId.value = ''
        newHideIngredients.value = ''
        newName.value = ''
        newIngredients.value = ''
        newInstructions.value = ''
        newAuthor.value = ''
      }}
    >
      <input type='text'
        placeholder='Recipe name'
        ref={node => { newName = node }}
      /><br/>
      <textarea
        placeholder='Ingredients'
        ref={node => { newIngredients = node }}
      /><br/>
      <textarea 
        placeholder='Instructions'
        ref={node => { newInstructions = node }}
      /><br/>
      <input type='text'
        placeholder='Recipe author'
        ref={node => { newAuthor = node }}
      /><br/>
      <button type='submit'>
        Save recipe
      </button>
    </form>
  </div>
}







UpdateRecipe = connect()(UpdateRecipe)
export { UpdateRecipe }
/*
    let name = this.state.recipe ? this.state.recipe.name : null;
    let ingredients = this.state.recipe ? this.state.recipe.ingredients : null;
    let instructions = this.state.recipe ? this.state.recipe.instructions : null;

  render () {
    return 
      <div>
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

 * /
