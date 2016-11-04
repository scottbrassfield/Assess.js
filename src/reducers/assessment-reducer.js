import { combineReducers } from 'redux'
import currentProblem from './current-problem-reducer'
import currentConcept from './current-concept-reducer'
import tested from './tested-reducer'
import { START_ASSESSMENT, END_ASSESSMENT } from '../actions'

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

const assessment = combineReducers({
  active,
  currentConcept,
  currentProblem,
  tested
})

export default assessment
