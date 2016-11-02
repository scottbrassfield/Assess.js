import { combineReducers } from 'redux'
import currentProblem from './current-problem-reducer'
import currentConcept from './current-concept-reducer'
import { ADD_CONCEPT_GROUP, START_ASSESSMENT, END_ASSESSMENT } from '../actions'

const active = (state = false, action) => {
  switch(action.type) {
    case START_ASSESSMENT:
      return state = true
    case END_ASSESSMENT:
      return state = false
    default:
      return state
  }
}

const conceptGroup = (state = [], action) => {
  switch(action.type) {
    case ADD_CONCEPT_GROUP:
      return [...state, ...action.concepts]
    default:
      return state
  }
}

const assessment = combineReducers({
  active,
  conceptGroup,
  currentConcept,
  currentProblem,
})

export default assessment
