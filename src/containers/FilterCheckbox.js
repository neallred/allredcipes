import { connect } from 'react-redux'
import { setSearchFilters } from '../actions'
import { Checkbox } from '../components/Checkbox'

const mapStateToProps = (state, ownProps) => {
  return {
    value: ownProps.filter,
    labelName: ownProps.labelName
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setSearchFilters(ownProps.filter))
    }
  }
}

export const FilterCheckbox = connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkbox)
