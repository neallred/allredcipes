import tape from 'tape'
import register from 'ignore-styles'
register(['css', '.scss'])

import {
  mapStateToProps,
  mapDispatchToProps
} from './header-container'

const test = tape

test('<HeaderContainer />', (t) => {

  t.test('', t => {
    const setup = [
      'headerHandleInput',
      'headerMeasureHeight',
      'headerButtonSelect',
      'sessionLogin',
      'sessionLogout'
    ]
    t.plan(setup.length)

    const mappedDispatch = mapDispatchToProps(()=>{})
    setup.forEach(testData => {
      t.equal(
        Object.keys(mappedDispatch).some(key => key === testData),
        true,
        `mapped dispatches contain ${testData} function`
      )
    });
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
