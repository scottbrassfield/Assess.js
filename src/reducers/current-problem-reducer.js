import { combineReducers } from 'redux'

import {
  LOAD_CURRENT_PROBLEM,
  UPDATE_CURRENT_PROBLEM
} from '../actions'

const details = (state = {}, action) => {
  switch(action.type) {
    case LOAD_CURRENT_PROBLEM:
      return {...state, ...action.details}
    default:
      return state
  }
}

const status = (state = '', action) => {
  switch(action.type) {
    case UPDATE_CURRENT_PROBLEM:
      return state
    default:
      return state
  }
}


export default combineReducers({
  details,
  status
})
