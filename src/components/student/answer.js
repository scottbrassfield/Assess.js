import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Form, Input, Button } from 'semantic-ui-react'
import { checkAnswer } from '../../actions'

let Answer = ({ handleSubmit }) => {

  const renderInput = ({ input, placeholder }) => (
    <Input {...input} placeholder={placeholder} />
  )

  return (
    <Form onSubmit={handleSubmit}>
      <Field name='answer' component={renderInput} placeholder='Enter Answer' />
      <Button color='grey' type='submit' style={{marginLeft: 10, verticalAlign: 'top'}}>Submit</Button>
    </Form>
  )
}

Answer = reduxForm({
  form: 'answerForm',
  onSubmit: (values, dispatch, { problem, concept }) => {
    dispatch(checkAnswer(values, problem, concept))
  }
})(Answer)

export default Answer
