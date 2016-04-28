import React from 'react'
import { RecipeButton } from '../containers/RecipeButton'
import { destroyRecipe } from '../actions'
import { toggleRecipe } from '../actions'
import { updateRecipe } from '../actions'
import { openModal } from '../actions'
export const RecipeCardTop = ({recipeId, name, hideIngredients}) => (
  <div className='heading'>
    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
      <h3>{name}</h3>
    </div>
    <div className='row'>
      <RecipeButton
        recipeId={recipeId}
        columnSize={'3'}
        dispatchType={openModal}
        buttonLabel={'Edit'}
        buttonClass={'warning'}
      />
      <RecipeButton
        recipeId={recipeId}
        columnSize={'6'}
        dispatchType={toggleRecipe}
        buttonLabel={hideIngredients ? 'Show Recipe' : 'Hide Recipe'}
        buttonClass={'success'}
      />
      <RecipeButton
        recipeId={recipeId}
        columnSize={'3'}
        dispatchType={destroyRecipe}
        buttonLabel={'X'}
        buttonClass={'danger'}
      />
    </div>
  </div>
)
