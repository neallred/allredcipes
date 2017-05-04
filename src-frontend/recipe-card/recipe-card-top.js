import React from 'react'
import { RecipeButton } from './recipe-button'

import { RECIPE_DELETE_REQUEST } from '../constants/action-types'

const cB = 'recipe'
export const RecipeCardTop = ({
  recipeId='',
  name='',
  showIngredients=false,
  toggleView=()=>console.warn('toggleView not passed down from parent'),
  toggleRecipeEdit=()=>console.warn('toggleView not passed down from parent'),
  isLoggedIn=false
}) => (
	<header className={`${cB}__header`}>
		<h3 className={`${cB}__title`}>{name}</h3>
		<div className={`${cB}__button-group`}>
			{isLoggedIn && <RecipeButton recipeId={recipeId}
                  onClick={toggleRecipeEdit}
				          buttonLabel="Edit"
				          buttonClass="edit" />}

			<RecipeButton recipeId={recipeId}
                  onClick={toggleView}
				          buttonLabel={showIngredients ? 'Hide Recipe' : 'Show Recipe'}
				          buttonClass="view" />

			{isLoggedIn && <RecipeButton recipeId={recipeId}
				          buttonLabel="X"
				          buttonClass="delete" />}
		</div>
	</header>
);
