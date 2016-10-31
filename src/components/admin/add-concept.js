import React from 'react'
import { reduxForm, Field } from 'redux-form'


const renderInput = ({input, style}) => (
  <div style={{display:'inline-block'}}>
    <input type='text' {...input} style={style}/>
  </div>
)

const renderConceptList = () => (
  <select>
    <option>Concept 1</option>
  </select>
)

const renderRelationshipList = () => (
  <select>
    <option>Concept 1</option>
  </select>
)

const AddConceptForm = ({handleSubmit}) => {
  return (
    <div>
      <h2>Add a concept</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <div style={{display: 'inline-block'}}>
            <label style={{display: 'block'}}>Concept Name</label>
            <Field style={{display: 'block'}} name='conceptName' component={renderInput} />
          </div>
          <div style={{display: 'inline-block'}}>
            <label style={{display: 'block'}}>Description</label>
            <Field style={{display: 'block'}} name='conceptDescr' component={renderInput} />
          </div>
        </div>
        <div>
          <div style={{display: 'inline-block'}}>
            <div>
              <label style={{display: 'block'}}>Related Concept</label>
              <Field style={{display: 'block'}} name='relConceptName' component={renderConceptList} />
            </div>
            <div>
              <label style={{display: 'block'}}>Relationship</label>
              <Field style={{display: 'block'}} name='relationship' component={renderRelationshipList} />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default reduxForm({
  form:'addConcept',
  onSubmit: (values, dispatch) => {
    dispatch({
      type: 'ADD_CONCEPT',
      values
    })
  }
})(AddConceptForm)
