import React from 'react'
import { RecipeSubsection } from './RecipeSubsection'
export const RecipeCardBottom = ({onClick, id, hideIngredients, name, ingredients, instructions, author}) => {
  return <div>
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
      sectionTitle='Author'
    />
  </div>
}
