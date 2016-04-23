import React from 'react'
import { RecipeButton } from '../containers/RecipeButton'
import { destroyRecipe } from '../actions'
import { toggleRecipe } from '../actions'
import { updateRecipe } from '../actions'
export const RecipeCardTop = ({id, name}) => (
  <div className='heading'>
    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
      <h3>{name}</h3>
    </div>
    <div className='row'>
      <RecipeButton
        id={'edit-'+id}
        columnSize={'3'}
        dispatchType={updateRecipe}
        buttonLabel={'Edit'}
        buttonClass={'warning'}
      />
      <RecipeButton
        id={'toggle-'+id}
        columnSize={'6'}
        dispatchType={toggleRecipe}
        buttonLabel={'Hide Recipe'}
        buttonClass={'success'}
      />
      <RecipeButton
        id={'destroy-'+id}
        columnSize={'3'}
        dispatchType={destroyRecipe}
        buttonLabel={'X'}
        buttonClass={'danger'}
      />
    </div>
  </div>
)
