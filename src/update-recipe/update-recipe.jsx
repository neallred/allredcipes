import React, {PropTypes} from 'react'
import { updateRecipe } from '../actions'

let UpdateRecipe = ({
	fields: {
		recipeId,
		hideIngredients,
		name,
		ingredients,
		instructions,
		author
	},
	recipeEditName,
	onClick,
	handleSubmit,
	isEditing
}) => (
	<div className={`modalDialog center-block text-center ${isEditing ? 'opened' : 'closed'}`} id='dialog'>
		<h2 className='add-recipes'>Edit {recipeEditName}</h2>
		<form className='container' onSubmit={handleSubmit}>
			<input type='hidden' {...recipeId} /><br/>
			<input type='hidden' {...hideIngredients} /><br/>
			<input type='text'   {...name} placeholder='Recipe name' /><br/>
			<textarea            {...ingredients} placeholder='Ingredients' /><br/>
			<textarea            {...instructions} placeholder='Instructions' /><br/>
			<input type='text'   {...author} placeholder='Recipe author' /><br/>
			<button type='button'
				onClick={onClick}
				className='btn btn-primary'
				id='cancel-edit' >
				Cancel edit
			</button><br/>
			<button type='submit' className='btn btn-success' >
				Update Recipe
			</button>
		</form>
	</div>
)

UpdateRecipe.propTypes = {
	handleSubmit: PropTypes.func.isRequired
}
export { UpdateRecipe }
