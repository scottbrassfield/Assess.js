import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { checkAnswer } from '../../actions'

let Answer = ({ handleSubmit }) => (
  <div>
  <form onSubmit={handleSubmit}>
    <Field name='answer' component='input' />
    <button type='submit'>Submit</button>
  </form>
  </div>
)

Answer = reduxForm({
  form: 'answerForm',
  onSubmit: (values, dispatch, { problem, concept }) => {
    dispatch(checkAnswer(values, problem, concept))
  }
})(Answer)

export default Answer
