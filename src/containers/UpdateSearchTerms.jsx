import { connect } from 'react-redux'
import { setSearchTerms } from '../actions'
import { SearchTerms } from '../components/SearchTerms'

const mapStateToProps = (state, ownProps) => {
  return {
    value: ownProps.filter,
    labelName: ownProps.labelName
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (e) => {
      dispatch(setSearchTerms(e.currentTarget.value))
    }
  }
}

export const UpdateSearchTerms = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchTerms)

