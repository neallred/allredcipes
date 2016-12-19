import React from 'react'
import { RecipeSubsection } from './recipe-subsection'
export const RecipeCardBottom = ({
	hideIngredients,
	ingredients,
	instructions,
	author
}) => {
	const recipeBottomClass =  hideIngredients ? 'recipe__bottom recipe__bottom--hide' : 'recipe__bottom recipe__bottom--show';
	return <div className={ 'recipe__bottom recipe__bottom--show' || recipeBottomClass}>
		<RecipeSubsection dataToSanitize={ingredients} sectionTitle='Ingredients' />
		<RecipeSubsection dataToSanitize={instructions} sectionTitle='Instructions' />
		<RecipeSubsection dataToSanitize={author} sectionTitle='Author/Contributor' />
	</div>
}
