import React from 'react'
import { RecipeButton } from './recipe-button'

import { RECIPE_DELETE_REQUEST } from '../constants/action-types'

export const RecipeCardTop = ({
  recipeId,
  name,
  showIngredients,
  toggleView,
  toggleRecipeEdit,
  isLoggedIn
}) => (
	<header className="recipe__header">
		<h3 className="recipe__title">{name}</h3>
		<div className="recipe__button-group">
			{isLoggedIn && <RecipeButton recipeId={recipeId}
                  onClick={toggleRecipeEdit}
				          buttonLabel="Edit"
				          buttonClass="yellow" />}

			<RecipeButton recipeId={recipeId}
                  onClick={toggleView}
				          buttonLabel={showIngredients ? 'Hide Recipe' : 'Show Recipe'}
				          buttonClass="green" />

			{isLoggedIn && <RecipeButton recipeId={recipeId}
				          buttonLabel="X"
				          buttonClass="red" />}
		</div>
	</header>
);
