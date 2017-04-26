import React from 'react'
import PropTypes from 'prop-types';
import { updateRecipe } from '../actions'
import { addModifier } from '../utils/string-utils'
import Modal from '../modal/modal'

const baseClass = 'recipe-form'
let RecipeForm = ({
  recipeEdit={},
	onCancel,
	onSubmit,
}) => {
  const {
    author,
    ingredients,
    instructions,
    name,
    _id,
  } = recipeEdit;

  const isEditing = !!recipeEdit && !!recipeEdit._id
  return <Modal title={`Edit ${name}`} isOpen={isEditing} >
		<form className={baseClass} onSubmit={onSubmit}>
      <input className={`${baseClass}__field`}
        type='text'
        value={name}
        placeholder='Recipe name'
        onChange={val => handleEdit(val)} />
      <textarea className={`${baseClass}__field`}
        value={ingredients}
        placeholder='Ingredients'
        onChange={val => handleEdit(val)} />
      <textarea className={`${baseClass}__field`}
        value={instructions}
        placeholder='Instructions'
        onChange={val => handleEdit(val)} />
      <input className={`${baseClass}__field`}
        type='text'
        value={author}
        placeholder='Recipe author'
        onChange={val => handleEdit(val)}  />
      <button className={`${baseClass}__field`}
        type='button'
				onClick={onCancel}
				className='btn btn-primary'
				id='cancel-edit' >
				Cancel edit
			</button><br/>
			<button type='submit' className='btn btn-success' onClick={onSubmit}>
				Update Recipe
			</button>
		</form>
  </Modal>
}

RecipeForm.propTypes = {
	onSubmit: PropTypes.func.isRequired
}

export { RecipeForm }
