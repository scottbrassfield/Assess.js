import { combineReducers } from 'redux'
import { LOAD_CURRENT_CONCEPT, END_ASSESSMENT } from '../actions'

const details = (state = {}, action) => {
  switch(action.type) {
    case LOAD_CURRENT_CONCEPT:
      return {...action.details}
    case END_ASSESSMENT:
      return {}
    default:
      return state
  }
}

const problems = (state = [], action) => {
  switch(action.type) {
    case LOAD_CURRENT_CONCEPT:
      return [...action.problems]
    case END_ASSESSMENT:
      return []
    default:
      return state
  }
}

export default combineReducers({
  details,
  problems,
})
