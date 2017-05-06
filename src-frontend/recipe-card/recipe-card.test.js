import React from 'react'
import {shallow} from 'enzyme'
import tape from 'tape'

import register from 'ignore-styles'
register(['css', '.scss'])


const test = tape
const props = {
}


import {RecipeCard} from './recipe-card'
import RecipeCardBottom from './recipe-card-bottom'
import { RecipeCardTop } from './recipe-card-top'

test('<RecipeCard/>', (t) => {

  t.test('has a recipeCardTop and a RecipeCardBottom', t => {
    const wrapper = shallow(<RecipeCard {...props} />)
    t.plan(2)
    t.equal(
      wrapper.find(RecipeCardTop).length,
      1,
    )
    t.equal(
      wrapper.find(RecipeCardBottom).length,
      1,
    )
  })

})
