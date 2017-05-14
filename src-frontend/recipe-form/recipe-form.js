import React from 'react'
import PropTypes from 'prop-types';
import { addModifier } from '../utils/string-utils'
import Modal from '../modal/modal'

const baseClass = 'recipe-form'
let RecipeForm = ({
  recipeEdit={},
  recipeCreate={},
	onCancel,
	recipesSubmitEdit,
  handleEdit,
}) => {
  const temporaryRecipe = recipeEdit._id ? recipeEdit : recipeCreate;
  const {
    author,
    ingredients,
    instructions,
    name,
    _id,
  } = temporaryRecipe;

  const isEditing = !!recipeEdit && !!recipeEdit._id

  function onSubmit(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    recipesSubmitEdit(recipeEdit)
  }

  return <Modal title={`Edit ${name}`} isOpen={isEditing} >
    <form className={baseClass} onSubmit={(e) => onSubmit(e)}>
      <input className={`${baseClass}__field`}
        type='text'
        value={name || ''}
        placeholder='Recipe name'
        onChange={val => handleEdit(val, 'name')} />
      <textarea className={`${baseClass}__field`}
        value={ingredients || ''}
        placeholder='Ingredients'
        onChange={val => handleEdit(val, 'ingredients')} />
      <textarea className={`${baseClass}__field`}
        value={instructions || ''}
        placeholder='Instructions'
        onChange={val => handleEdit(val, 'instructions')} />
      <input className={`${baseClass}__field`}
        type='text'
        value={author || ''}
        placeholder='Recipe author'
        onChange={val => handleEdit(val, 'author')}  />
      <button className={`${baseClass}__cancel`}
        type='button'
				onClick={onCancel}
				className='btn btn-primary'
				id='cancel-edit' >
				Cancel edit
			</button><br/>
      <button type='submit' className='btn btn-success' onClick={e => onSubmit(e)}>
				Update Recipe
			</button>
		</form>
  </Modal>
}


RecipeForm.propTypes = {
	recipesSubmitEdit: PropTypes.func,
	recipesSubmitCreate: PropTypes.func,
}

export { RecipeForm }
