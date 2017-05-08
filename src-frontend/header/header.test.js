import React from 'react'
import {shallow} from 'enzyme'
import tape from 'tape'
import td from 'testdouble'

import register from 'ignore-styles'
register(['css', '.scss'])


const test = tape
const props = {
}


import {Header} from './header'

test('<Header/>', (t) => {

  t.test('always shows a header', t => {
    const wrapperLoggedIn = shallow(<Header {...props} session={{isLoggedIn: true}}/>)
    const wrapperLoggedOut = shallow(<Header {...props} session={{isLoggedIn: false}}/>)
    t.plan(2)
    t.equal(
      wrapperLoggedIn.find('header').length,
      1,
      'when logged in'
    )
    t.equal(
      wrapperLoggedOut.find('header').length,
      1,
      'when not logged in'
    )
  })

  t.test('appropriate inputs are shown for each button selection', t => {
    const setup = [
      {
        button: 'login',
        has: [
          {placeholder: 'username'},
          {placeholder: 'password'}
        ],
        hasNot: [
          {type: 'email'},
          {placeholder: 'confirm password'}
        ]
      },
      {
        button: 'forgot',
        has: [
          {type: 'email'}
        ],
        hasNot: [
          {placeholder: 'username'},
          {placeholder: 'password'},
          {placeholder: 'confirm password'}
        ]
      },
      {
        button: 'signup',
        has: [
          {placeholder: 'username'},
          {placeholder: 'password'},
          {type: 'email'},
          {placeholder: 'confirm password'}
        ],
        hasNot: []
      },
    ];
    const formatPropToFind = (key, value) => `[${key}="${value}"]`;
    t.plan(setup.length * 4) //# of inputs for each run
    setup.forEach(testData => {
      const wrapper = shallow(<Header {...props} buttonSelected={testData.button}/>)
      const inputs = wrapper.find('.header__input')
      testData.has.forEach(hasItem => {
        const hasItemKey = Object.keys(hasItem)[0]
        const hasItemValue = hasItem[hasItemKey]
        const doesHave = inputs.some(formatPropToFind(hasItemKey, hasItemValue))
        t.equal(
          doesHave,
          true,
          `${testData.button} button has input with key ${hasItemKey} of value ${hasItemValue}`
        )
      });

      testData.hasNot.forEach(hasNotItem => {
        const hasNotItemKey = Object.keys(hasNotItem)[0]
        const hasNotItemValue = hasNotItem[hasNotItemKey]
        const doesHave = inputs.some(formatPropToFind(hasNotItemKey, hasNotItemValue))
        t.equal(
          doesHave,
          false,
          `${testData.button} button does not have input with key ${hasNotItemKey} of value ${hasNotItemValue}`
        )
      });
    });
  })

  t.test('input fields call headerHandleInput when they receive input', t => {
    const mockHandleInput = td.function()
    const wrapper = shallow(<Header {...props} 
      buttonSelected='signup'
      headerHandleInput={mockHandleInput}
      />)
    const inputs = wrapper.find('input')
    t.plan(inputs.length - 1)

    let expectedCallCount = td.explain(mockHandleInput).calls.length
    for (let i = 0 ; i < (inputs.length - 1) ; i = i + 1) {
      inputs.at(i).simulate('change', {target: {value: 'bob'}})
      expectedCallCount = expectedCallCount + 1
      t.equal(
        expectedCallCount,
        td.explain(mockHandleInput).calls.length,
        `${inputs.at(i).prop('placeholder')} input calls headerHandleInput when it receives input`
      )
    }
    td.reset()
  })

  t.test('componentDidUpdate', t => {
    t.plan(1)
    const wrapper = shallow(<Header {...props} />)
    const comp = wrapper.instance()
    comp.measureHeight = td.function()

    comp.componentDidMount()
    t.equal(
      td.explain(comp.measureHeight).callCount,
      1,
      'calls component measureHeight method'
    );
    td.reset()
  });
})
