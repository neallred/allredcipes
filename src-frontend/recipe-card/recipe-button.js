import React from 'react'

const cB = 'recipe-button'
export const RecipeButton = ({
	recipeId='',
	buttonLabel='',
  buttonClass='',
  onClick=()=>console.warn('onClick not passed down from parent'),
}) => {
	return <button className={`${cB} ${cB}--${buttonClass}`}
		           type='submit' 
		           onClick={() => onClick(recipeId) } >
		{buttonLabel}
	</button>
}


export default RecipeButton
