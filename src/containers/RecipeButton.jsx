import React from 'react'
import { connect } from 'react-redux'

let RecipeButton = ({dispatch, id, columnSize, dispatchType, buttonLabel, buttonClass}) => {
  let input
  return <div className={'recipe-button-container ' + 'col-lg-'+columnSize+' col-md-'+columnSize+' col-sm-'+columnSize+' col-xs-'+columnSize}>
    <button className={'center-block btn btn-'+buttonClass}
      type='submit' 
      id={id}
      onClick={e => {
        let storedRecipeId=parseInt(e.currentTarget.id.match(/(\d+)$/)[0], 10)
        e.preventDefault()
        dispatch(dispatchType(storedRecipeId))
      }}
    >
      {buttonLabel}
    </button>
  </div>
}
RecipeButton = connect()(RecipeButton)
export { RecipeButton }
