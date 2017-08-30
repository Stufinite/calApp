import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getSearchResult, setSelected } from '../actions/CourseActions'
import Search from '../components/Search'

const mapStateToProps = (state) => {
  return {
    searchResult: state.course.searchResult,
    selected: state.course.selected
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchInput: (keyword) => {
      let DOMAIN = 'http://localhost.api.campass.com.tw:8080'
      let school = 'NSYSU'
      let semester = '1061'

      if (keyword.length == 0) {
        return
      }
      // Get code of courses
      fetch(`${DOMAIN}/curso/get/search/?keyword=${keyword}&school=${school}`, {
        credential: 'include',
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      }).then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json()
      }).then((responseJson) => {
        let codeStr = ''
        for (let code of responseJson) {
          codeStr += code + ' '
        }

        if (codeStr.length == 0) {
          throw new Error('Cannot find related courses')
        }
        // Get info of courses by codes
        fetch(`${DOMAIN}/api/get/course/code?semester=${semester}&school=${school}&code=${codeStr}`, {
          credential: 'include',
          method: 'GET',
          headers: {
            Accept: 'application/json'
          }
        }).then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        }).then((responseJson) => {
          // Classification
          dispatch(getSearchResult(responseJson))
        })
      })
    },
    onSelect: (course) => {
      dispatch(setSelected(course))
    }
  }
}

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)

export default SearchContainer
