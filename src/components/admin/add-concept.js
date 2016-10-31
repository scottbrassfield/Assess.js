import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field, FieldArray } from 'redux-form'
import { addConcept } from '../../actions'


const renderInput = ({input, style}) => (
  <div style={{display:'inline-block'}}>
    <input type='text' {...input} style={style}/>
  </div>
)

const renderConcepts = ({ input, concepts }) => (
  <select {...input}>
    { concepts.map((concept, index) =>
      <option key={index}>{concept}</option>
    )}
  </select>
)

const renderRelationships = ({ input }) => (
  <select {...input}>
    <option value='precedes'>precedes</option>
    <option value='follows'>follows</option>
  </select>
)

const renderRelatedConcepts = ({ fields, concepts }) => (
  <ul>
    <li>
    <button type='button' onClick={() => fields.push({})}>Add Relationship</button>
    </li>
    {fields.map((rel, index) =>
      <li key={index}>
        <Field
          name={`${rel}.concept`}
          component={renderConcepts}
          concepts={concepts} />
        <Field
          name={`${rel}.relationship`}
          component={renderRelationships}
          concepts={concepts} />
        <button
          type='button'
          onClick={() => fields.remove(index)}
          style={{display: 'inline-block'}}>
          Remove
        </button>
      </li>
    )}
  </ul>
)

let AddConceptForm = ({ handleSubmit, concepts }) => {
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
        <FieldArray name='relatedConcepts' component={renderRelatedConcepts} concepts={concepts}/>
      </form>
    </div>
  )
}

AddConceptForm = reduxForm({
  form:'addConcept',
  onSubmit: (values, dispatch) => {
    dispatch(addConcept(values))
  }
})(AddConceptForm)

const conceptsToArray = ({concepts: { byId }}) => {
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

export default connect(mapState)(AddConceptForm)
