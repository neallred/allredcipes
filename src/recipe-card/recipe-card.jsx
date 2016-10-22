import React, {PropTypes} from 'react'
import { RecipeCardBottom } from './recipe-card-bottom'
import { RecipeCardTop } from './recipe-card-top'
const RecipeCard = ({ onClick, id, openModal, hideIngredients, name, ingredients, instructions, author}) => (
	<div className='recipe center-block'>
		<RecipeCardTop recipeId={id}
			           name={name}
			           openModal={openModal}
			           hideIngredients={hideIngredients} />
		<RecipeCardBottom onClick={onClick}
			              id={id}
			              hideIngredients={hideIngredients}
			              ingredients={ingredients}
			              instructions={instructions}
			              author={author} />
	</div>
)

RecipeCard.PropTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  ingredients: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
}

export {RecipeCard}
