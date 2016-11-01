import { combineReducers } from 'redux'
import { loadConcepts } from './util'

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
      return {...state,
        ...loadConcepts(undefined, action)
      }
    default:
      return state
  }
}

const allIds = (state=[], action) => {
  switch(action.type) {
    case ADD_CONCEPT:
      return state
    case LOAD_CONCEPTS:
      return Object.keys(loadConcepts(undefined, action))
    default:
      return state
  }
}

const concepts = combineReducers({
  byId,
  allIds
})

export default concepts
