// import { combineReducers } from 'redux'

import {
  LOAD_CURRENT_PROBLEM,
} from '../actions'

const currentProblem = (state = {}, action) => {
  switch(action.type) {
    case LOAD_CURRENT_PROBLEM:
      return {...state, ...action.problem}
    default:
      return state
  }
}

export default currentProblem
//
// const status = (state = '', action) => {
//   switch(action.type) {
//     case UPDATE_CURRENT_PROBLEM:
//       return state = action.status
//     case LOAD_CURRENT_PROBLEM:
//       return state = ''
//     default:
//       return state
//   }
// }
//
//
// export default combineReducers({
//   details,
//   status
// })
