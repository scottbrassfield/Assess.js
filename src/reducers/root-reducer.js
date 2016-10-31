import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import concepts from './concepts-reducer'

const rootReducer = combineReducers({
  form: formReducer,
  concepts
})

export default rootReducer
