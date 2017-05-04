import React from 'react'
import {shallow} from 'enzyme'
import tape from 'tape'

import register from 'ignore-styles'
register(['css', '.scss'])


const test = tape
const props = {
  recipeId: '',
  name: '',
  showIngredients: false,
  toggleView: () => {},
  toggleRecipeEdit: () => {},
  isLoggedIn: false,
}


import {RecipeCardTop} from './recipe-card-top'
import {RecipeButton} from './recipe-button'

test('<RecipeCardTop/>', (t) => {

  t.test('when not logged in, only shows the hide/toggle button', t => {
    const wrapper = shallow(<RecipeCardTop {...props} />)
    t.plan(1)
    t.equal(
      wrapper.find(RecipeButton).length,
      1,
    )
  })

  t.test('when logged in, only shows the hide/toggle button', t => {
    const wrapper = shallow(<RecipeCardTop {...props} isLoggedIn/>)
    t.plan(1)
    t.equal(
      wrapper.find(RecipeButton).length,
      3,
    )
  })

  //t.test('does appropriate thing in following circumstances', t => {
  //  const setup = [
  //  ]

  //  const localProps = {
  //  }
  //  const wrapper = shallow(<RecipeCardTop {...props} {...localProps}/>)

  //  t.plan(setup.length)
  //  setup.map(testData => {

  //    t.equal(
  //      expected,
  //      actual,
  //      `test of ${testData} condition` 
  //    )
  //  })
  //})
})
