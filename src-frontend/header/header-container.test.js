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
})
