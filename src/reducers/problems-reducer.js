import { combineReducers } from 'redux'

import {
  ADD_PROBLEM
} from '../actions.js'

const problem = (state={}, action) => {
  switch(action.type) {
    case ADD_PROBLEM:
      return state
    default:
      return state
  }
}

const byId = (state={}, action) => {
  switch(action.type) {
    case ADD_PROBLEM:
      return state
    default:
      return state
  }
}

const allIds = (state=[], action) => {
  switch(action.type) {
    case ADD_PROBLEM:
      return state
    default:
      return state
  }
}

const problems = combineReducers({
  byId,
  allIds
})

export default problems
