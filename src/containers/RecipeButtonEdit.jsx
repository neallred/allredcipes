import React from 'react'
import { connect } from 'react-redux'

let RecipeButtonEdit = ({dispatch, id, columnSize, dispatchType, buttonLabel, buttonClass}) => {
  let input
  return <div className={'recipe-button-container ' + 'col-lg-'+columnSize+' col-md-'+columnSize+' col-sm-'+columnSize+' col-xs-'+columnSize}>
    <button className={'center-block btn btn-'+buttonClass}
      type='submit' 
      id={id}
      onClick={e => {
        document.getElementById('dialog').className='modalDialog opened center-block text-center'
        let storedRecipeId=parseInt(e.currentTarget.id.match(/(\d+)$/)[0], 10)
        e.preventDefault()
        console.log('recipe-to-open-id: '+storedRecipeId)
      }}
    >
      {buttonLabel}
    </button>
  </div>
}
RecipeButtonEdit = connect()(RecipeButtonEdit)
export { RecipeButtonEdit }
//dispatch(dispatchType(storedRecipeId))
