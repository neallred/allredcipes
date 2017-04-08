import React from 'react'
import { RecipeSubsection } from './recipe-subsection'
const RecipeCardBottom = ({
  showIngredients=false,
  ingredients='',
  instructions='',
  author=''
}) => <div className={ getClassName(showIngredients) }>
  <RecipeSubsection dataToSanitize={ingredients} sectionTitle='Ingredients' />
  <RecipeSubsection dataToSanitize={instructions} sectionTitle='Instructions' />
  <RecipeSubsection dataToSanitize={author} sectionTitle='Author/Contributor' />
</div>

export default RecipeCardBottom

const getClassName = showIngredients => showIngredients ? 'recipe__bottom recipe__bottom--show' : 'recipe__bottom recipe__bottom--hide';
