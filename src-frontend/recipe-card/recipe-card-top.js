import React from 'react'
import { RecipeButton } from './recipe-button'
import { destroyRecipe } from '../actions'
import { toggleRecipe } from '../actions'
import { isEditing } from '../actions'

import { RECIPE_DELETE_REQUEST } from '../constants/action-types'

export const RecipeCardTop = ({
  recipeId,
  name,
  showIngredients,
  toggleView,
  isLoggedIn
}) => (
	<header className="recipe__header">
		<h3 className="recipe__title">{name}</h3>
		<div className="recipe__button-group">
			{isLoggedIn && <RecipeButton recipeId={recipeId}
				          dispatchType={isEditing}
				          buttonLabel="Edit"
				          buttonClass="yellow" />}

			<RecipeButton recipeId={recipeId}
				          dispatchType={toggleRecipe}
                  onClick={toggleView}
				          buttonLabel={showIngredients ? 'Hide Recipe' : 'Show Recipe'}
				          buttonClass="green" />

			{isLoggedIn && <RecipeButton recipeId={recipeId}
						  dispatchType={(id) => {
							  return {type: RECIPE_DELETE_REQUEST, value: id};
						  }}
				          buttonLabel="X"
				          buttonClass="red" />}
		</div>
	</header>
);
