import { LOAD_CURRENT_PROBLEM, END_ASSESSMENT } from '../actions'

const currentProblem = (state = {}, action) => {
  switch(action.type) {
    case LOAD_CURRENT_PROBLEM:
      return {...state, ...action.problem}
    case END_ASSESSMENT:
      return {}
    default:
      return state
  }
}

export default currentProblem
