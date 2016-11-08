import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import allConcepts from './concepts-reducer'
import assessment from './assessment-reducer'
import reports from './reports-reducer'

const rootReducer = combineReducers({
  form: formReducer,
  allConcepts,
  assessment,
  reports
})

export default rootReducer
