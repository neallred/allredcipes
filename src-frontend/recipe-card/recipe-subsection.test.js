
import React from 'react'
import {shallow} from 'enzyme'
import tape from 'tape'

import register from 'ignore-styles'
register(['css', '.scss'])


const test = tape
const props = {
}


import {RecipeSubsection} from './recipe-subsection'

test('<RecipeSubsection/>', (t) => {

  t.test('has section heading and list', t => {
    const wrapper = shallow(<RecipeSubsection {...props} />)
    t.plan(2)
    t.equal(
      wrapper.find('.recipe__subsection__heading').length,
      1,
    )
    t.equal(
      wrapper.find('.recipe__list').length,
      1,
    )
  })

  t.test('renders one more list item than the number of line breaks (Unix and/or Windows style)', t => {
    const dataToSanitize = 'first item\r\nsecond item\rthird item\nfourth item';
    const wrapper = shallow(<RecipeSubsection {...props} dataToSanitize={dataToSanitize} />).render()
    t.plan(1)
    t.equal(
      wrapper.find('.recipe__list-item').length,
      4,
    )
  })

})
