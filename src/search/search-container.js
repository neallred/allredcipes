import { connect } from 'react-redux'
import { searchToggle, searchHandleText } from './ducks'
import {
	SEARCH_BY_CONTRIBUTOR,
	SEARCH_BY_INGREDIENTS,
	SEARCH_BY_INSTRUCTIONS,
	SEARCH_BY_NAME
} from '../constants/action-types'
import { Search } from './search'

const mapStateToProps = (state) => {
	return {
		search: state.search
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
