import React from 'react'

export const RecipeButton = ({
	dispatch,
	recipeId,
	columnSize,
	dispatchType,
	buttonLabel,
  buttonClass,
  onClick
}) => {
	return <button className={'recipe__button recipe__button--'+buttonClass}
		           type='submit' 
		           onClick={e => {
                 //e.preventDefault(); dispatch(dispatchType(recipeId))
                 console.log(recipeId)
                 onClick(recipeId)
		           }} >
		{buttonLabel}
	</button>
}


export default RecipeButton
