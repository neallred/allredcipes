import React from 'react'

export const RecipeButton = ({
	recipeId,
	columnSize,
	buttonLabel,
  buttonClass,
  onClick
}) => {
	return <button className={'recipe__button recipe__button--'+buttonClass}
		           type='submit' 
		           onClick={() => onClick(recipeId) } >
		{buttonLabel}
	</button>
}


export default RecipeButton
