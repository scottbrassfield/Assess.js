import { combineReducers } from 'redux'

import {
  LOAD_CURRENT_CONCEPT,
  UPDATE_CURRENT_CONCEPT
} from '../actions'

const details = (state = {}, action) => {
  switch(action.type) {
    case LOAD_CURRENT_CONCEPT:
      return {...state, ...action.details}
    default:
      return state
  }

}

const problems = (state = [], action) => {
  switch(action.type) {
    case LOAD_CURRENT_CONCEPT:
      return [...state, ...action.problems]
    default:
      return state
  }
}

const status = (state = null, action) => {
  switch(action.type) {
    case UPDATE_CURRENT_CONCEPT:
      return state
    default:
      return state
  }
}


export default combineReducers({
  details,
  problems,
  status
})
