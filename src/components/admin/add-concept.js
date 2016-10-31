import React from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'
import { addConcept } from '../../actions'


const renderInput = ({input, style}) => (
  <div style={{display:'inline-block'}}>
    <input type='text' {...input} style={style}/>
  </div>
)

const renderConcepts = ({ input }) => (
  <select {...input}>
    <option value='concept1'>Concept 1</option>
    <option value='concept2'>Concept 2</option>
  </select>
)

const renderRelationships = ({ input }) => (
  <select {...input}>
    <option value='precedes'>precedes</option>
    <option value='follows'>follows</option>
  </select>
)

const renderRelatedConcepts = ({ fields }) => (
  <ul>
    <li>
    <button type='button' onClick={() => fields.push({})}>Add Relationship</button>
    </li>
    {fields.map((rel, index) =>
      <li key={index}>
        <Field
          name={`${rel}.concept`}
          component={renderConcepts} />
        <Field
          name={`${rel}.relationship`}
          component={renderRelationships} />
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

const AddConceptForm = ({ handleSubmit }) => {
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
        <FieldArray name='relatedConcepts' component={renderRelatedConcepts} />
      </form>
    </div>
  )
}

export default reduxForm({
  form:'addConcept',
  onSubmit: (values, dispatch) => {
    dispatch(addConcept(values))
  }
})(AddConceptForm)

// { concepts.map(concept =>
//     <option>{concept.name}</option>
// )}
