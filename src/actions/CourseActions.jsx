export function getSearchResult(responseJson) {
  return { type: 'SEARCH_RESULT', searchResult: responseJson }
}

export function setSelected(course) {
  return { type: 'SET_SELECTED', selectCourse: course }
}

export function delSelected(course) {
  return { type: 'DEL_SELECTED', deleteCourse: course }
}
