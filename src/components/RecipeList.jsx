import React, {PropTypes} from 'react'
import { RecipeCard } from './RecipeCard'

const RecipeList = ({ recipes, onRecipeClick }) => (
  <div className='center-block'>
    {recipes.map(recipe =>
      <RecipeCard
        key={recipe.id}
        {...recipe}
        onClick={() => onRecipeClick(recipe.id)}
      />
    )}
  </div>
)

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ingredients: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onRecipeClick: PropTypes.func.isRequired
}

export {RecipeList}
