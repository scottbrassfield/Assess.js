import { combineReducers } from 'redux'
import currentProblem from './current-problem-reducer'
import currentConcept from './current-concept-reducer'
import tested from './tested-reducer'
import {
  START_ASSESSMENT,
  END_ASSESSMENT,
  CLEAR_ASSESSMENT
} from '../actions'

const status = (state = 'not started', action) => {
  switch(action.type) {
    case START_ASSESSMENT:
      return state = 'in progress'
    case END_ASSESSMENT:
      return state = 'completed'
    case CLEAR_ASSESSMENT:
      return state = 'not started'
    default:
      return state
  }
}

const assessment = combineReducers({
  status,
  currentConcept,
  currentProblem,
  tested
})

export default assessment
