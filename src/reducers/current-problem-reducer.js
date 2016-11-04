import { LOAD_CURRENT_PROBLEM } from '../actions'

const currentProblem = (state = {}, action) => {
  switch(action.type) {
    case LOAD_CURRENT_PROBLEM:
      return {...state, ...action.problem}
    default:
      return state
  }
}

export default currentProblem
