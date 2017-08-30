import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getSearchResult } from '../actions/CourseActions'
import Selected from '../components/Selected'

const mapStateToProps = (state) => {
  return {
    selected: state.course.selected,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const SelectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Selected)

export default SelectedContainer
