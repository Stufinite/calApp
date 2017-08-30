const course = (state = {selected: [], searchResult: []}, action) => {
  switch (action.type) {
    case 'SEARCH_RESULT':
      return {searchResult: action.searchResult}
    case 'SET_SELECTED':
      return {selected: action.selected}
    default:
      return state
  }
}

export default course
