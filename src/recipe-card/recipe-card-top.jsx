import React from 'react'
import { RecipeButton } from './recipe-button'
import { destroyRecipe } from '../actions'
import { toggleRecipe } from '../actions'
import { isEditing } from '../actions'

import { RECIPE_DELETE_REQUEST } from '../action-types'

export const RecipeCardTop = ({recipeId, name, hideIngredients}) => (
	<div className='heading'>
		<div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
			<h3>{name}</h3>
		</div>
		<div className='row'>
			<RecipeButton recipeId={recipeId}
				          columnSize={'3'}
				          dispatchType={isEditing}
				          buttonLabel={'Edit'}
				          buttonClass={'warning'} />

			<RecipeButton recipeId={recipeId}
				          columnSize={'6'}
				          dispatchType={toggleRecipe}
				          buttonLabel={hideIngredients ? 'Show Recipe' : 'Hide Recipe'}
				          buttonClass={'success'} />

			<RecipeButton recipeId={recipeId}
				          columnSize={'3'}
						  dispatchType={(id) => {
							  console.log(`create a recipe delete request with id ${recipeId}`);
							  return {type: RECIPE_DELETE_REQUEST, value: id};
						  }}
				          buttonLabel={'X'}
				          buttonClass={'danger'} />
		</div>
	</div>
);
