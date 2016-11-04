import { combineReducers } from 'redux'
import { LOAD_CURRENT_CONCEPT } from '../actions'

const details = (state = {}, action) => {
  switch(action.type) {
    case LOAD_CURRENT_CONCEPT:
      return {...action.details}
    default:
      return state
  }
}

const problems = (state = [], action) => {
  switch(action.type) {
    case LOAD_CURRENT_CONCEPT:
      return [...action.problems]
    default:
      return state
  }
}

export default combineReducers({
  details,
  problems,
})
