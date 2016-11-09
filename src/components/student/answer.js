import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Input, Button } from 'semantic-ui-react'
import { checkAnswer } from '../../actions'

const renderInput = ({ input, placeholder }) => (
  <Input type='text' {...input} placeholder={placeholder} />
)

let Answer = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Field name='answer' component={renderInput} placeholder='Enter Answer' />
    <Button color='grey' type='submit' style={{marginLeft: 10, verticalAlign: 'top'}}>Submit</Button>
  </form>
)

Answer = reduxForm({
  form: 'answerForm',
  onSubmit: (values, dispatch, { problem, concept, reset }) => {
    dispatch(checkAnswer(values, problem, concept))
    reset()
  }
})(Answer)

export default Answer
