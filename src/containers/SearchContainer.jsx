import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getSearchResult } from '../actions/SearchActions'
import Search from '../components/Search'

const mapStateToProps = (state) => {
  return {
    data: state.search.data,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchInput: (keyword) => {
      // Start
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
          let data = responseJson
          fetch(`${DOMAIN}/cphelper/get/Genra/?school=${school}`, {
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
            for (let i = 0; i < data.length; i++) {
              let c = data[i]
              let types = Object.keys(responseJson)
              for (let t of types) {
                for (let d of Object.keys(responseJson[t])) {
                  if (c.department === d) {
                    c['type'] = t
                  }
                }
              }
            }
            dispatch(getSearchResult(data))
          })
        })
      })
    }
  }
}

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)

export default SearchContainer
