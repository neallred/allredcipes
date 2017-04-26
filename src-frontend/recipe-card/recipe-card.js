import React from 'react'
import PropTypes from 'prop-types';
import RecipeCardBottom from './recipe-card-bottom'
import { RecipeCardTop } from './recipe-card-top'
import './recipe.scss'

export const RecipeCard = ({
	author,
	ingredients,
	instructions,
	isLoggedIn,
	name,
	onClick,
	recipeId,
  dispatch,
  showIngredients=false,
  toggleRecipeEdit,
  toggleView,
}) => (
	<div className='recipe'>
		<RecipeCardTop recipeId={recipeId}
			           name={name}
                 dispatch={dispatch}
                 isLoggedIn={isLoggedIn}
                 toggleView={toggleView}
                 toggleRecipeEdit={toggleRecipeEdit}
			           showIngredients={showIngredients} />
		<RecipeCardBottom onClick={onClick}
			              recipeId={recipeId}
			              showIngredients={showIngredients}
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

export default RecipeCard
