import tape from 'tape'
const test = tape


import {addModifier} from './string-utils'

test('addModifier', (t) => {

  t.test('always shows markup', t => {
    const setup = [
      ['a', 'b', true, 'a a--b'],
      ['a', 'b', false, 'a'],
    ]
    t.plan(setup.length)
    setup.map(testData => {
      const classResult = addModifier(testData[0], testData[1], testData[2])

      t.equal(
        classResult,
        testData[3],
        `when logic is ${testData[2]}, returns ${testData[3]}` 
      )
    })

  })
})
