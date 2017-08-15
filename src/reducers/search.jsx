const search = (state = {data: []}, action) => {
  switch (action.type) {
    case 'SEARCH_RESULT':
      return {type: action.type, data: action.data}
    default:
      return state
  }
}

export default search
