import { connect } from 'react-redux'
import { searchToggleType, searchUpdateTerms } from './ducks'
import {
	SEARCH_CONTRIBUTOR,
	SEARCH_INGREDIENTS,
	SEARCH_INSTRUCTIONS,
	SEARCH_NAME
} from '../constants/action-types'
import { Search } from './search'
import debounce from '../utils/debounce';

export const mapStateToProps = (state) => {
	return {
		search: state.search,
		headerHeight: state.header && state.header.headerHeight
	}
}
export const mapDispatchToProps = (dispatch) => {
	return {
		searchToggleType: key => dispatch(searchToggleType(key)),
		searchUpdateTerms: (key, terms) => dispatch(searchUpdateTerms(key, terms))
	}
}

const SearchContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Search)

export {SearchContainer}
