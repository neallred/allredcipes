import tape from 'tape'
import register from 'ignore-styles'
register(['css', '.scss'])

import {
  mapStateToProps,
  mapDispatchToProps
} from './recipe-form-container'

const test = tape

test('<SearchContainer />', (t) => {

  t.test('mapped dispatches ', t => {
    const setup = [
      'recipesSubmitEdit',
      'recipesSubmitCreate',
      'onCancel',
      'handleEdit',
    ]
    t.plan(setup.length)

    const mappedDispatch = mapDispatchToProps(()=>{})
    setup.forEach(testData => {
      t.equal(
        Object.keys(mappedDispatch).some(key => key === testData && typeof mappedDispatch[key] === 'function'),
        true,
        `contains ${testData} function`
      )
    });
  })

  t.test('mapped state', t => {
    const setup = [
      'recipeEdit',
    ]
    t.plan(setup.length)

    const mappedState = mapStateToProps(()=>{})
    setup.forEach(testData => {
      t.equal(
        Object.keys(mappedState).some(key => key === testData),
        true,
        `contain ${testData} data`
      )
    });
  })
})

