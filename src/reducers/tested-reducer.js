import { combineReducers } from 'redux'

import {
  UPDATE_TESTED_CONCEPTS,
  UPDATE_TESTED_PROBLEMS
} from '../actions'


const concepts = (state = [], action) => {
  switch(action.type) {
    case UPDATE_TESTED_CONCEPTS:
      return [...state, action.concept]
    default:
      return state
  }
}

const problems = (state = [], action) => {
  switch(action.type) {
    case UPDATE_TESTED_PROBLEMS:
      return [...state, action.problem]
    default:
      return state
  }
}

export default combineReducers({
  concepts,
  problems
})
