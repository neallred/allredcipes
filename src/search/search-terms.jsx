import React, {PropTypes} from 'react'

const SearchTerms = (onChange) => (
	<input type='text'
		   placeholder='Enter Search term(s) here'
		   onChange={onChange.onChange} />
)

SearchTerms.propTypes = {
	onChange: PropTypes.func.isRequired
}

export {SearchTerms}
