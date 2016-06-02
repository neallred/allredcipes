import React from 'react'
import { RecipeSubsection } from './RecipeSubsection'
export const RecipeCardBottom = ({hideIngredients, ingredients, instructions, author}) => {
  return <div
    className={
      hideIngredients ? 'recipe-bottom-hide' : 'recipe-bottom-show'
    }
  >
    <RecipeSubsection
      dataToSanitize={ingredients}
      sectionTitle='Ingredients'
    />
    <RecipeSubsection
      dataToSanitize={instructions}
      sectionTitle='Instructions'
    />
    <RecipeSubsection
      dataToSanitize={author}
      sectionTitle='Author/Contributor'
    />
  </div>
}
