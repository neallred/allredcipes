import React from 'react'

export const RecipeButton = ({
	dispatch,
	recipeId,
	columnSize,
	dispatchType,
	buttonLabel,
	buttonClass
}) => {
	return <button className={'recipe__button recipe__button--'+buttonClass}
		           type='submit' 
		           onClick={e => { e.preventDefault(); dispatch(dispatchType(recipeId)) }} >
		{buttonLabel}
	</button>
}


export default RecipeButton
