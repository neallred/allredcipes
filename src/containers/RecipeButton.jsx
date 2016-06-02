import React from 'react'
import { connect } from 'react-redux'

let RecipeButton = ({dispatch, recipeId, columnSize, dispatchType, buttonLabel, buttonClass}) => {
  return <div className={'recipe-button-container ' + 'col-lg-'+columnSize+' col-md-'+columnSize+' col-sm-'+columnSize+' col-xs-'+columnSize}>
    <button className={'center-block btn btn-'+buttonClass}
      type='submit' 
      recipeId={recipeId}
      onClick={e => {
        e.preventDefault()
        dispatch(dispatchType(recipeId))
      }}
    >
      {buttonLabel}
    </button>
  </div>
}
RecipeButton = connect()(RecipeButton)
export { RecipeButton }
