import React, {PropTypes} from 'react'
import { RecipeCardBottom } from './RecipeCardBottom'
import { RecipeCardTop } from './RecipeCardTop'
const RecipeCard = ({ onClick, id, openModal, hideIngredients, name, ingredients, instructions, author}) => (
  <div className='recipe center-block'>
    <RecipeCardTop
      id={id}
      name={name}
      openModal={openModal}
      hideIngredients={hideIngredients}
    />
    <RecipeCardBottom
      onClick={onClick}
      id={id}
      hideIngredients={hideIngredients}
      ingredients={ingredients}
      instructions={instructions}
      author={author}
    />
  </div>
)

/* Recipe.propTypes is development version only*/
/* as of develpotime. this prop is a number and it is required. it trhows a warning. nathan doesn t use, uses a tyep system called flow. and its at compile time, nto run time. Flow type is done by Facebook, but don't worry about*/
RecipeCard.PropTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  ingredients: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
}

export {RecipeCard}
