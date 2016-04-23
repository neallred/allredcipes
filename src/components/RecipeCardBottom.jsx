import React from 'react'
export const RecipeCardBottom = ({onClick, id, hideIngredients, name, ingredients, instructions, author}) => (
  <div
    className={
      hideIngredients ?
        'ingredients':
        'ingredients hide-ingredients'
    }
  >
    <div className='col-lg-12'>
      <p className='ingredient-list'><strong>Ingredients:</strong></p>
    </div>
    <div className='col-lg-12'>
      <p className='instructions'
        dangerouslySetInnerHTML={{__html: '<ul><li class="ingredient">' +
          ingredients
            .replace(/[<>]/g, '')
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
          instructions
            .replace(/[<>]/g, '')
            .replace(/(?:\r\n|\r|\n)/g, '</li><li class="ingredient">') +
          '</li></ul>'}}
      />
    </div>
    <div className='col-lg-12'>
      <p className='instructions heading'><strong>Author:</strong></p>
    </div>
    <div className='col-lg-12'>
      <p className='author'
        dangerouslySetInnerHTML={{__html: '<ul><li class="ingredient">' +
          author
            .replace(/[<>]/g, '')
            .replace(/(?:\r\n|\r|\n)/g, '</li><li class="ingredient">') +
          '</li></ul>'}}
      />
    </div>
  </div>
)
