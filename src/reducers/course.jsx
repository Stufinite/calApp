const course = (state = {selected: [], searchResult: []}, action) => {
  switch (action.type) {
    case 'SEARCH_RESULT':
      return {searchResult: action.searchResult}
    case 'SET_SELECTED':
      let selected = state.selected
      if (selected == undefined) {
        return {
          selected: [action.selectCourse],
          searchResult: state.searchResult
        }
      } else {
        selected = state.selected.slice()
      }
      for (let i = 0; i < selected.length; i++) {
        if (selected[i].code == action.selectCourse.code) {
          return {
            selected: state.selected,
            searchResult: state.searchResult
          }
        }
      }
      selected.push(action.selectCourse)
      return {
        selected: selected,
        searchResult: state.searchResult
      }
    default:
      return state
  }
}


export default course
