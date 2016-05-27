import React, {PropTypes} from 'react'
import { updateRecipe } from '../actions'

let UpdateRecipe = ({
  fields: {recipeId, hideIngredients, name, ingredients, instructions, author},
  isEditing,
  onClick,
  handleSubmit,
}) => (
  <div className={ isEditing.isEditing ? 'modalDialog center-block text-center opened' : 'modalDialog center-block text-center closed' } id='dialog' >
    <h2 className='add-recipes'>Edit {isEditing.recipeToEdit? isEditing.recipeToEdit.name : null}</h2>
    <form className='container' onSubmit={handleSubmit}>
      <input type='hidden'
        value={isEditing.recipeToEdit ? isEditing.recipeToEdit.recipeId : null}
        defaultValue={isEditing.id}
        {...recipeId}
      /><br/>
      <input type='hidden'
        defaultValue={isEditing.hideIngredients}
        {...hideIngredients}
      /><br/>
      <input type='text'
        placeholder='Recipe name'
        defaultValue={isEditing.recipeToEdit ? isEditing.recipeToEdit.name : null}
        {...name}
      /><br/>
      <textarea
        placeholder='Ingredients'
        defaultValue={isEditing.ingredients}
        {...ingredients}
      /><br/>
      
      <textarea 
        placeholder='Instructions'
        defaultValue={isEditing.instructions}
        {...instructions}
      /><br/>
      <input type='text'
        placeholder='Recipe author'
        defaultValue={isEditing.author}
        {...author}
      /><br/>
      <button type='button' onClick={onClick} className='btn btn-primary' id='cancel-edit' >Cancel edit</button><br/>
      <button type='submit' className='btn btn-success'>Create Recipe</button>
    </form>
  </div>
)

UpdateRecipe.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}
export { UpdateRecipe }
