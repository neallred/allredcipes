import tape from 'tape'
import register from 'ignore-styles'
register(['css', '.scss'])
import td from 'testdouble'

import {
  mapStateToProps,
  mapDispatchToProps
} from './header-container'

const test = tape

test('<HeaderContainer />', (t) => {

  t.test('mapDispatchToProps', t => {
    const setup = [
      'headerHandleInput',
      'headerMeasureHeight',
      'headerButtonSelect',
      'sessionLogin',
      'sessionLogout'
    ]
    t.plan(setup.length * 2)

    const mockDispatch = td.function()
    const mappedDispatch = mapDispatchToProps(mockDispatch)
    let expectedCallCount = td.explain(mockDispatch).calls.length
    setup.forEach(testData => {
      t.equal(
        Object.keys(mappedDispatch).some(key => key === testData),
        true,
        `mapped dispatches contain ${testData} function`
      )
      mappedDispatch[testData]();
      expectedCallCount = expectedCallCount + 1
      t.equal (
        expectedCallCount,
        td.explain(mockDispatch).calls.length,
        `mapped function ${testData} calls dispatch when called`
      )

    });
    td.reset()
  })

  t.test('', t => {
    const setup = [
      'sessionLogin',
      'sessionLogout',
      'headerButtonSelect',

      //state
      'session',

      //form values
      'buttonSelected',
      'email',
      'username',
      'password',
      'passwordConfirm',
    ]
    t.plan(setup.length)

    const stateObj = {
      session: '',
      header: {
        buttonSelected: '',
        email: '',
        username: '',
        password: '',
        passwordConfirm: '',
      }
    }
    const mappedState = mapStateToProps(stateObj)
    setup.forEach(testData => {
      t.equal(
        Object.keys(mappedState).some(key => key === testData),
        true,
        `mapped state contains ${testData} key`
      )
    });
  })
})
