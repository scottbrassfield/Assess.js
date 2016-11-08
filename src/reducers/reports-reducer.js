import { END_ASSESSMENT } from '../actions'

const report = (state = {}, action) => {
  switch(action.type) {
    case END_ASSESSMENT:
      return { ...state, timeStamp: new Date(), ...action.assessment }
    default:
      return state
  }
}


const reports = (state = [], action) => {
  switch(action.type) {
    case END_ASSESSMENT:
      return [ ...state, report(undefined, action)]
    default:
      return state
  }
}

export default reports
