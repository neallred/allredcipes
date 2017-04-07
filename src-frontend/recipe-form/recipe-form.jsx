import React, {PropTypes} from 'react'
import { updateRecipe } from '../actions'

let RecipeForm = ({
	author,
	hideIngredients,
	ingredients,
	initialValues,
	instructions,
	isEditing,
	name,
	onCancel,
	onSubmit,
	recipeEditName,
	recipeId
}) => (
	<div className={`modalDialog center-block text-center ${false && (isEditing ? 'opened' : 'closed')}`} id='dialog'>
		<h2 className='add-recipes'>Edit {recipeEditName} {initialValues}</h2>
		<form className='container' onSubmit={onSubmit}>
			<input type='hidden' recipeId={recipeId} /><br/>
			<input type='hidden' hideIngredients={hideIngredients} /><br/>
			<input type='text' name={name} placeholder='Recipe name' /><br/>
			<textarea ingredients={ingredients} placeholder='Ingredients' /><br/>
			<textarea instructions={instructions} placeholder='Instructions' /><br/>
			<input type='text' author={author} placeholder='Recipe author' /><br/>
			<button type='button'
				onClick={onCancel}
				className='btn btn-primary'
				id='cancel-edit' >
				Cancel edit
			</button><br/>
			<button type='submit' className='btn btn-success' onClick={onSubmit}>
				Update Recipe
			</button>
		</form>
	</div>
)

RecipeForm.propTypes = {
	onSubmit: PropTypes.func.isRequired
}
export { RecipeForm }
