import React, {PropTypes} from 'react'
import { createRecipe } from '../actions'

let CreateRecipe = ({
  fields: {name, ingredients, instructions, author},
  handleSubmit
}) => (
  <div className='center-block text-center'>
    <h2>Add recipes here!</h2>
    <form onSubmit={handleSubmit}>
      <input type='text' placeholder='Recipe name'   {...name} /><br/>
      <textarea          placeholder='Ingredients'   {...ingredients} /><br/>
      <textarea          placeholder='Instructions'  {...instructions} /><br/>
      <input type='text' placeholder='Recipe author' {...author} /><br/>
      <button type='submit' className='btn btn-success'>Create Recipe</button>
    </form>
  </div>
)

CreateRecipe.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}
export { CreateRecipe }
