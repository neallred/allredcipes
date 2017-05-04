import React from 'react'
import {shallow} from 'enzyme'
import tape from 'tape'
import td from 'testdouble'


import register from 'ignore-styles'
register(['css', '.scss'])


const test = tape
const props = {
	recipeId: 'recipeId',
	buttonLabel: 'buttonLabel',
  buttonClass: 'buttonClass',
  onClick: ()=>{},
}

import {RecipeButton} from './recipe-button'
const cB = 'recipe-button'

test('<RecipeButton/>', (t) => {

  t.test('shows buttonLabel text', t => {
    const wrapper = shallow(<RecipeButton {...props} />)
    t.plan(1)
    t.equal(
      wrapper.find('button').text(),
      'buttonLabel',
    )
  })

  t.test('has class modifier', t => {
    const wrapper = shallow(<RecipeButton {...props} />)
    t.plan(1)
    t.equal(
      wrapper.find(`.${cB}--${props.buttonClass}`).length,
      1,
    )
  })

  t.test('clicking on button calls onClick function with recipeId as argument', t => {
    const stubOnClick = td.function()
    const wrapper = shallow(<RecipeButton {...props} onClick={stubOnClick}/>)
    t.plan(2)

    wrapper.find('button').simulate('click')

    const mockCalls = td.explain(stubOnClick).calls;
    t.equal(
      mockCalls.length,
      1,
    )

    t.equal(
      td.explain(stubOnClick).calls[0].args[0],
      props.recipeId,
    )

    td.reset()
  })
})
