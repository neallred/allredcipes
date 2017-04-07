import { connect } from 'react-redux'
import { searchToggle, searchHandleText } from './ducks'
import {
	SEARCH_CONTRIBUTOR,
	SEARCH_INGREDIENTS,
	SEARCH_INSTRUCTIONS,
	SEARCH_NAME
} from '../constants/action-types'
import { Search } from './search'

const mapStateToProps = (state) => {
	return {
		search: state.search,
		headerHeight: state.header && state.header.headerHeight
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		searchToggle: (type, value) => dispatch(searchToggle(type, value)),
		searchHandleText: (type, value) => dispatch(searchHandleText(type, value))
	}
}

const SearchContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Search)

export {SearchContainer}
