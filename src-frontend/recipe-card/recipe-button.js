import React from 'react'
import { connect } from 'react-redux'

let RecipeButton = ({
	dispatch,
	recipeId,
	columnSize,
	dispatchType,
	buttonLabel,
	buttonClass
}) => {
	return <button className={'recipe__button recipe__button--'+buttonClass}
		           type='submit' 
		           recipeId={recipeId}
		           onClick={e => { e.preventDefault(); dispatch(dispatchType(recipeId)) }} >
		{buttonLabel}
	</button>
}

RecipeButton = connect()(RecipeButton)

export { RecipeButton }
