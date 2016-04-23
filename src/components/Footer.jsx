import React from 'react'
import { FilterLink } from '../containers/FilterLink'

export const Footer = () => (
  <p className='center-block footer'>
    Show:
    {' '}
    <FilterLink filter='SHOW_ALL'>
      All
    </FilterLink>
    {', '}
    <FilterLink filter='SHOW_NAME'>
      By name
    </FilterLink>
    {', '}
    <FilterLink filter='SHOW_INGREDIENTS'>
      By ingredient
    </FilterLink>
    {', '}
    <FilterLink filter='SHOW_INSTRUCTIONS'>
      By instructions
    </FilterLink>
    {', '}
    <FilterLink filter='SHOW_AUTHOR'>
      By Author
    </FilterLink>
  </p>
)
