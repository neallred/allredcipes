import React from 'react'
import PropTypes from 'prop-types';
import { addModifier } from '../utils/string-utils'
import Modal from '../modal/modal'

const baseClass = 'recipe-form'
let RecipeForm = ({
  recipeEdit={},
  recipeCreate={},
	recipesToggleCreate,
	recipesToggleEdit,
	recipesSubmitEdit,
	recipesSubmitCreate,
  handleEdit,
  handleRecipeCreateChange,
}) => {
  const temporaryRecipe = recipeEdit._id ? recipeEdit : recipeCreate;
  const isEditing = (temporaryRecipe && temporaryRecipe._id)
  const isCreating = (temporaryRecipe && (!temporaryRecipe._id && recipeCreate.name !== undefined))
  const showModal = isEditing || isCreating
  const changeFunction = isEditing ? handleEdit : handleRecipeCreateChange;
  const cancelFunction = isEditing ? recipesToggleEdit : recipesToggleCreate

  function onSubmit(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    if (isEditing) {
      recipesSubmitEdit(temporaryRecipe)
    }
    else {
      recipesSubmitCreate(temporaryRecipe)
    }
  }

  return <Modal title={`Edit ${name}`} isOpen={showModal} >
    {temporaryRecipe && <form className={baseClass} onSubmit={(e) => onSubmit(e)}>
      <input className={`${baseClass}__field`}
        type='text'
        value={temporaryRecipe.name || ''}
        placeholder='Recipe name'
        onChange={val => changeFunction(val, 'name')} />
      <textarea className={`${baseClass}__field`}
        value={temporaryRecipe.ingredients || ''}
        placeholder='Ingredients'
        onChange={val => changeFunction(val, 'ingredients')} />
      <textarea className={`${baseClass}__field`}
        value={temporaryRecipe.instructions || ''}
        placeholder='Instructions'
        onChange={val => changeFunction(val, 'instructions')} />
      <input className={`${baseClass}__field`}
        type='text'
        value={temporaryRecipe.author || ''}
        placeholder='Recipe author'
        onChange={val => changeFunction(val, 'author')}  />
      <button className={`${baseClass}__cancel`}
        type='button'
				onClick={cancelFunction}
				className='btn btn-primary'
				id='cancel-edit' >
				Cancel
			</button><br/>
      <button type='submit' className='btn btn-success' onClick={e => onSubmit(e)}>
        {isEditing ? 'Edit' : 'Create' } Recipe
			</button>
		</form>}
  </Modal>
}


RecipeForm.propTypes = {
	recipesSubmitEdit: PropTypes.func,
	recipesSubmitCreate: PropTypes.func,
}

export { RecipeForm }
