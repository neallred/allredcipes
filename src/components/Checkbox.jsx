import React, {PropTypes} from 'react'

const Checkbox = ({filter, active, onClick, labelName }) => (
  <label><input name='search-by' type='checkbox' filter={filter} onClick={onClick}/>{labelName}</label>
)

Checkbox.propTypes = {
  onClick: PropTypes.func.isRequired
}

export { Checkbox }
