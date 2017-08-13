import {combineReducers} from 'redux'
import {DO_SEARCH, SET_VISIBILITY_FILTER, VisibilityFilters} from '../actions/Search.jsx'

const {SHOW_ALL} = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  console.log(action)
  switch (action.type) {
    case DO_SEARCH:
      return [
        ...state, {
          text: action.text,
          completed: false
        }
      ]
    case 2:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })
    default:
      return state
  }
}

const calApp = combineReducers({visibilityFilter, todos})

export default calApp
