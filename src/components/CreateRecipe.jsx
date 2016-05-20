import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import { createRecipe } from '../actions'
import { reduxForm } from 'redux-form'

let CreateRecipe = ({
  fields: {name, ingredients, instructions, author},
  handleSubmit
}) => (
  <div className='center-block text-center'>
    <h2>Add recipes here!</h2>
    <form onSubmit={handleSubmit}>
      <input type='text'
        placeholder='Recipe name'
        {...name}
      /><br/>
      <textarea
        placeholder='Ingredients'
        {...ingredients}
      /><br/>
      <textarea 
        placeholder='Instructions'
        {...instructions}
      /><br/>
      <input type='text'
        placeholder='Recipe author'
        {...author}
      /><br/>
      <button type='submit' className='btn btn-success'>Create Recipe</button>
    </form>
  </div>
)

CreateRecipe.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

CreateRecipe = reduxForm(
  {
  form: 'createRecipe',
  fields: ['name', 'ingredients', 'instructions', 'author']
  },
  (state, ownProps) => {
    return {
    }
  },
  (dispatch, ownProps) => {
    return {
      onSubmit: (values) => {
        dispatch(createRecipe(values.name, values.ingredients, values.instructions, values.author))
      }
    }
  }
)(CreateRecipe);

export { CreateRecipe }
