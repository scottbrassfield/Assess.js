import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { addProblem } from '../../actions'
import { Input } from 'semantic-ui-react'

const renderInput = ({input, style, label}) => (
  <div style={{display: 'inline-block'}}>
    <label style={{fontSize: '24px'}}>{label}</label>
    <Input type='text' {...input} style={style}/>
  </div>
)

const renderConcepts = ({ input, concepts }) => (
  <select
    onChange = {(value) => {input.onChange(value)}}
    {...input}
  >
    <option>Choose...</option>
    { concepts.map((concept, index) =>
      <option key={index}>{concept}</option>
    )}
  </select>
)

let AddProblemForm = ({ handleSubmit, concepts }) => {
  return (
    <div style={{marginTop: '20px'}}>
      <h2>Add a Problem</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <Field name='concept' component={renderConcepts} label='Related Concept' concepts={concepts}/>
          <Field name='topic' component={renderInput} label='Topic' />
        </div>
        <div>
          <Field name='question' component={renderInput} label='Question' />
          <Field name='answer' component={renderInput} label='Answer' />
        </div>
        <button style={{marginTop: '15px'}} type='submit'>Submit</button>
      </form>
    </div>
  )
}

AddProblemForm = reduxForm({
  form:'addProblem',
  onSubmit: (values, dispatch) => {
    dispatch(addProblem(values))
  }
})(AddProblemForm)

const conceptsToArray = ({allConcepts: { byId }}) => {
  let conceptTitles = [];
  for (var prop in byId) {
    conceptTitles.push(byId[prop].title)
  }
  return conceptTitles
}

const mapState = (state) => {
  return {
    concepts: conceptsToArray(state)
  }
}

export default connect(mapState)(AddProblemForm)
