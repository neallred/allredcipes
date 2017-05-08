
import React from 'react'
import {shallow} from 'enzyme'
import tape from 'tape'

import register from 'ignore-styles'
register(['css', '.scss'])
import td from 'testdouble'


const test = tape
const props = {
  recipeEdit: {},
  onCancel: () => {},
  onSubmit: () => {},
  handleEdit: () => {},
}


import Modal from '../modal/modal'
import {RecipeForm} from './recipe-form'

const baseClass = 'recipe-form'
test('<RecipeForm/>', (t) => {

  t.test('is a Modal', t => {
    const wrapper = shallow(<RecipeForm {...props} />)
    t.plan(1)
    t.equal(
      wrapper.find('Modal').length,
      1,
    )
  })

  t.test('has a form', t => {
    const modalWrapper = shallow(<RecipeForm {...props} />).find('Modal').dive()
    t.plan(1)
    t.equal(
      modalWrapper.find('form').length,
      1,
    )
  })

  t.test('form fields call handleEdit when they receive input', t => {
    const localProps = {
      handleEdit: td.function()
    }
    const wrapper = shallow(<RecipeForm {...props} {...localProps} />)
    const fields = wrapper.find(`.${baseClass}__field`)
    t.plan(fields.length)
    let expectedCallCount = td.explain(localProps.handleEdit).calls.length;
    for (let i = 0; i < fields.length ; i = i + 1) {
      fields.at(i).simulate('change', {target: {value: 'bob'}})
      expectedCallCount = expectedCallCount + 1
      t.equal(
        td.explain(localProps.handleEdit).calls.length,
        expectedCallCount,
        `${fields.at(i).prop('placeholder')} calls handleEdit when given input`
      )
    }

    td.reset();
  })
})
