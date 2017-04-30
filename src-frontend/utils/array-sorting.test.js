import tape from 'tape'
const test = tape

import {stringPropertySort} from './array-sorting'

test('stringPropertySort', (t) => {
  t.test('returns a function', t => {
    const setup = [
      [false, false],
      [false, {}],
      [{}, false],
      ['i', 3],
      [null, NaN],
      [true, {}],
    ]

    t.plan(setup.length)
    setup.map(testData => {
      const result = stringPropertySort(...testData)

      t.equal(
        typeof result,
        'function',
        `returns a function when passed a ${!!testData[0]}y ${typeof testData[0]} and a ${!!testData[1]}y ${typeof testData[1]}` 
      )
    })
  })

    t.test('returns 0 (leaves order unchanged) when', t => {
      const unchangedOrder = [
        {property: 'key', ascending: true, a: {key: 'as'}, b: {key: 'as'}},
        {property: 'key', ascending: true, a: {key: 'as'}, b: {key: 'aS'}},
        {property: 'key', ascending: false, a: {key: 'as'}, b: {key: 'as'}},
        {property: 'key', ascending: false, a: {key: 'as'}, b: {key: 'aS'}},

        {property: 'key', ascending: true, a: {otherKey: 'as'}, b: {key: 'as'}},
        {property: 'key', ascending: true, a: {key: 'as'}, b: {otherKey: 'aS'}},
        {property: 'key', ascending: true, a: {otherKey: 'as'}, b: {otherKey: 'aS'}},
        {property: 'key', ascending: false, a: {key: 'as'}, b: {otherKey: 'as'}},
        {property: 'key', ascending: false, a: {otherKey: 'as'}, b: {key: 'aS'}},
        {property: 'key', ascending: false, a: {otherKey: 'as'}, b: {otherKey: 'aS'}},

        {property: 'key', ascending: false, a: 1, b: {key: 'aS'}},
        {property: 'key', ascending: false, a: {key: 'as'}, b: 2},
        {property: 'key', ascending: false, a: 1, b: 2},

        {property: 'key', ascending: true, a: 1, b: {key: 'aS'}},
        {property: 'key', ascending: true, a: {key: 'as'}, b: 2},
        {property: 'key', ascending: true, a: 1, b: 2},
      ]
  
      t.plan(unchangedOrder.length)
      unchangedOrder.map(testData => {
        const sortResult = stringPropertySort(testData.property, testData.ascending)(testData.a, testData.b)
  
        t.equal(
          sortResult,
          0,
          `order is unchanged given conditions ${JSON.stringify(testData)}` 
        )
      })
    })

    t.test('returns -1 (moves a to front of list) when:', t => {
      const aBeforeB = [
        {property: 'key', ascending: true, a: {key: 'a'}, b: {key: 'b'}},
        {property: 'key', ascending: true, a: {key: 'A'}, b: {key: 'b'}},
        {property: 'key', ascending: true, a: {key: 'a'}, b: {key: 'B'}},

        {property: 'key', ascending: false, a: {key: 'b'}, b: {key: 'a'}},
        {property: 'key', ascending: false, a: {key: 'B'}, b: {key: 'a'}},
        {property: 'key', ascending: false, a: {key: 'b'}, b: {key: 'A'}},
      ]
  
      t.plan(aBeforeB.length)
      aBeforeB.map(testData => {
        const sortResult = stringPropertySort(testData.property, testData.ascending)(testData.a, testData.b)
  
        t.equal(
          sortResult,
          -1,
          `a moved to beginning given conditions ${JSON.stringify(testData)}` 
        )
      })
    })

    t.test('returns 1 (moves a to end of list) when:', t => {
      const bBeforeA = [
        {property: 'key', ascending: true, a: {key: 'b'}, b: {key: 'a'}},
        {property: 'key', ascending: true, a: {key: 'B'}, b: {key: 'a'}},
        {property: 'key', ascending: true, a: {key: 'b'}, b: {key: 'A'}},

        {property: 'key', ascending: false, a: {key: 'a'}, b: {key: 'b'}},
        {property: 'key', ascending: false, a: {key: 'A'}, b: {key: 'b'}},
        {property: 'key', ascending: false, a: {key: 'a'}, b: {key: 'B'}},
      ]
  
      t.plan(bBeforeA.length)
      bBeforeA.map(testData => {
        const sortResult = stringPropertySort(testData.property, testData.ascending)(testData.a, testData.b)
  
        t.equal(
          sortResult,
          1,
          `a moved to end given conditions ${JSON.stringify(testData)}` 
        )
      })
    })
})
