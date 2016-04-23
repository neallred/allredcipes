import React from 'react'
import { RemoveButton } from './RemoveButton'
export const RecipeCardTop = ({id, name}) => (
  <div className='row heading'>
    <div className='col-lg-8 col-md-8 col-sm-8 col-xs-8'>
      <h3>{name}</h3>
    </div>
    <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2'>
      <RemoveButton
        id={'destroy-'+id}
      />
    </div>
  </div>
)
