const course = (state = {selected: [], searchResult: []}, action) => {
  let PREV_SELECTED = state.selected == undefined ? []:state.selected.slice()
  let PREV_SEARCH_RESULT = state.searchResult == undefined ? []:state.searchResult.slice()
  
  switch (action.type) {
    case 'SEARCH_RESULT':
      return {searchResult: action.searchResult}
    case 'SET_SELECTED':
      if (isCourseSelected(PREV_SELECTED, action.selectCourse)) {
        return {
          selected: PREV_SELECTED,
          searchResult: PREV_SEARCH_RESULT
        }
      } else {
        PREV_SELECTED.push(action.selectCourse)
        return {
          selected: PREV_SELECTED,
          searchResult: setCourseFilter(PREV_SELECTED, PREV_SEARCH_RESULT)
        }
      }
    case 'DEL_SELECTED':
      let selected = deleteCourse(PREV_SELECTED, action.deleteCourse)
      return {
        selected: selected,
        searchResult: setCourseFilter(selected, PREV_SEARCH_RESULT)
      }
    default:
      return state
  }
}

function isCourseSelected(selected, course) {
  let flag = false
  for (let i = 0; i < selected.length; i++) {
    if (selected[i].code == course.code) {
      flag = true
    }
  }
  return flag
}

function deleteCourse(selected, course) {
  for (let i = 0; i < selected.length; i++) {
    if (selected[i].code == course.code) {
      selected.splice(i, 1)
      break
    }
  }
  return selected
}

function setCourseFilter(selected, searchResult) {
  for (let i = 0; i < searchResult.length; i++) {
    searchResult[i].selected = isCourseSelected(selected, searchResult[i]) ? true : false
  }
  return searchResult
}

export default course
