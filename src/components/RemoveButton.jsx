import React from 'react'
import { connect } from 'react-redux'
import { destroyRecipe } from '../actions'

let RemoveButton = ({dispatch, id}) => {
  let input
  return <button className=' btn btn-danger'
    type='submit' 
    id={id}
    onClick={e => {
      e.preventDefault()
      dispatch(destroyRecipe(parseInt(e.currentTarget.id.match(/(\d+)$/)[0], 10)))
    }}
    style={{fontSize: '20px', fontWeight: '600'}}
  >
    {'\u2620'}
  </button>
}
RemoveButton = connect()(RemoveButton)
export { RemoveButton }
