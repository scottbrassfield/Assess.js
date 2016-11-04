import { combineReducers } from 'redux'

import {
  LOAD_CURRENT_CONCEPT,
  UPDATE_CURRENT_CONCEPT
  // UPDATE_ANSWER
} from '../actions'

const details = (state = {}, action) => {
  switch(action.type) {
    case LOAD_CURRENT_CONCEPT:
      return {...action.details}
    case UPDATE_CURRENT_CONCEPT:
      return { ...state, status: action.status}
    default:
      return state
  }

}

// const updateProblem = (state = {}, action) => {
//   switch(action.type) {
//     case UPDATE_ANSWER:
//       return { ...state, status: action.status }
//     default:
//       return state
//   }
// }

const problems = (state = [], action) => {
  switch(action.type) {
    case LOAD_CURRENT_CONCEPT:
      return [...action.problems]
    // case UPDATE_ANSWER:
    //   return state.map((problem, i) => {
    //     return (i === action.index) ? updateProblem(undefined, action) : problem
    //   })
    default:
      return state
  }
}


export default combineReducers({
  details,
  problems,
})
