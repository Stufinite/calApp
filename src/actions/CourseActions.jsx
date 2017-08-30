export function getSearchResult(responseJson) {
  return { type: 'SEARCH_RESULT', searchResult: responseJson }
}

export function setSelected(selectCourse) {
  return { type: 'SET_SELECTED', selectCourse: selectCourse }
}
