import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import { createRecipe } from '../actions'

let CreateRecipe = ({onSubmit}) => (
  <div className='center-block text-center'>
    <h2>Add recipes here!</h2>
    <form
      onSubmit={onSubmit}
    >
      <input type='text'
        placeholder='Recipe name'
        id='inputName'
      /><br/>
      <textarea
        placeholder='Ingredients'
        id='inputIngredients'
      /><br/>
      <textarea 
        placeholder='Instructions'
        id='inputInstructions'
      /><br/>
      <input type='text'
        placeholder='Recipe author'
        id='inputAuthor'
      /><br/>
      <button
        type='submit'
        className='btn btn-success'
      >
        Create Recipe
      </button>
    </form>
  </div>
)
CreateRecipe.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export { CreateRecipe }

