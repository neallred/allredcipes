import React, {PropTypes} from 'react';
const Recipe = ({name, ingredients, instructions, author}) => (
  <div>
    <li>{name}</li>
    <li>{ingredients}</li>
    <li>{instructions}</li>
    <li>{author}</li>
  </div> 
)

Recipe.propTypes = {
  name: PropTypes.string.isRequired,
  ingredients: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
}

export {Recipe}

/*
export const Recipe = ({recipe_id, name, ingredients, instructions, onClick, isSelected, removeRecipe}) => (
  <div className='recipe' onClick={onClick}>
    <div className='row heading'>
      <div className='col-lg-8 col-md-8 col-sm-8 col-xs-8'>
        <h3>{name}</h3>
      </div>
      <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2'>
        <button className=' btn btn-danger'
          type='submit' 
          onClick={removeRecipe}
          >X</button>
      </div>
    </div>
    <div className='ingredients hide-ingredients'>
      <div className='col-lg-12'>
        <p className='ingredient-list'><strong>Ingredients:</strong></p>
      </div>
      <div className='col-lg-12'>
        <p className='instructions'
          dangerouslySetInnerHTML={{__html: '<ul><li class="ingredient">' +
            ingredients.replace(/[<>]/g, '')
            .replace(/(?:\r\n|\r|\n)/g, '</li><li class="ingredient">') +
            '</li></ul>'}}
        />
      </div>
      <div className='col-lg-12'>
        <p className='instructions heading'><strong>Instructions:</strong></p>
      </div>
      <div className='col-lg-12'>
        <p className='instructions'
          dangerouslySetInnerHTML={{__html: '<ul><li class="ingredient">' +
            instructions.replace(/[<>]/g, '')
            .replace(/(?:\r\n|\r|\n)/g, '</li><li class="ingredient">') +
            '</li></ul>'}}
        />
      </div>
      <li className='btn btn-warning edit' id={recipe_id}>Edit</li>
    </div>
  </div>
);
*/
