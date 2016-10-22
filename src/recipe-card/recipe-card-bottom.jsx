import React from 'react'
import { RecipeSubsection } from './recipe-subsection'
export const RecipeCardBottom = ({hideIngredients, ingredients, instructions, author}) => {
	const recipeBottomClass =  hideIngredients ? 'recipe-bottom-hide' : 'recipe-bottom-show';
	return <div className={recipeBottomClass}>
		<RecipeSubsection dataToSanitize={ingredients} sectionTitle='Ingredients' />
		<RecipeSubsection dataToSanitize={instructions} sectionTitle='Instructions' />
		<RecipeSubsection dataToSanitize={author} sectionTitle='Author/Contributor' />
	</div>
}
