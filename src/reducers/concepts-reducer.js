import { combineReducers } from 'redux'

import {
  ADD_CONCEPT,
  LOAD_CONCEPTS
} from '../actions.js'

const concept = (state={}, action) => {
  switch(action.type) {
    case ADD_CONCEPT:
      return state
    default:
      return state
  }
}

const byId = (state={}, action) => {
  switch(action.type) {
    case ADD_CONCEPT:
      return state
    case LOAD_CONCEPTS:
      return state
    default:
      return state
  }
}

const allIds = (state=[], action) => {
  switch(action.type) {
    case ADD_CONCEPT:
      return state
    case LOAD_CONCEPTS:
      return state
    default:
      return state
  }
}

const concepts = combineReducers({
  byId,
  allIds
})

export default concepts
