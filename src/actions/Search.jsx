/*
 * action types
 */

export const DO_SEARCH = 'DO_SEARCH'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_OBLIGATORY: 'SHOW_OBLIGATORY',
  SHOW_OPTIONAL: 'SHOW_OPTIONAL',
  SHOW_GENERAL_EDU: 'SHOW_GENERAL_EDU',
  SHOW_PHYSICAL_EDU: 'SHOW_PHYSICAL_EDU',
  SHOW_OTHERS: 'SHOW_OTHERS'
}

/*
 * action creators
 */

export function doSearch(keyword) {
  return { type: DO_SEARCH, keyword }
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}
