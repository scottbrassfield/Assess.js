import { combineReducers } from 'redux'

import {
  UPDATE_TESTED_CONCEPTS,
  UPDATE_TESTED_PROBLEMS,
  END_ASSESSMENT
} from '../actions'


const concepts = (state = [], action) => {
  switch(action.type) {
    case UPDATE_TESTED_CONCEPTS:
      return [...state, action.concept]
    case END_ASSESSMENT:
      return []
    default:
      return state
  }
}

const problems = (state = [], action) => {
  switch(action.type) {
    case UPDATE_TESTED_PROBLEMS:
      return [...state, action.problem]
    case END_ASSESSMENT:
      return []
    default:
      return state
  }
}

export default combineReducers({
  concepts,
  problems
})
