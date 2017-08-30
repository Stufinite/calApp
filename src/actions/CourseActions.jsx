export function getSearchResult(responseJson) {
  return { type: 'SEARCH_RESULT', searchResult: responseJson }
}

export function setSelected(selected) {
  return { type: 'SET_SELECTED', selected: selected }
}
