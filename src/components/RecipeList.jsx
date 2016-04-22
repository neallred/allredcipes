import {React}, PropTypes from 'react'
import Recipe form './Recipes'

const RecipeList = ({ recipes, onRecipeClick }) => (
  <ul>
    {recipes.map(recipe =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onRecipeClick(recipe.id)}
      />
    )}
  </ul>
)

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ingredients: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
  }).isRequired).isRequired,
}

export {RecipeList}
