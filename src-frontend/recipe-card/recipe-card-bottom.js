import React from 'react'
import { RecipeSubsection } from './recipe-subsection'

const cE = 'recipe__bottom';
export const RecipeCardBottom = ({
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

const getClassName = showIngredients => showIngredients ? `${cE} ${cE}--show` : `${cE} ${cE}--hide`;
