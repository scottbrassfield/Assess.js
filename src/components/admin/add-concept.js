import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field, FieldArray } from 'redux-form'
import { addConcept } from '../../actions'
import { Input } from 'semantic-ui-react'

const renderInput = ({input, style, label}) => (
  <div style={style}>
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

const renderRelationships = ({ input }) => (
  <select onChange = {(value) => {input.onChange(value)}}
    {...input}
    style={{marginLeft: '10px'}}
  >
    <option>Choose...</option>
    <option value='precedes'>precedes</option>
    <option value='follows'>follows</option>
  </select>
)

const renderRelatedConcepts = ({ fields, concepts }) => (
  <div>
    <div style={{marginTop: '15px'}}>
      <button type='button' onClick={() => fields.push({})}>Add Relationship</button>
    </div>
    <div style={{marginTop: '10px'}}>
      {fields.map((rel, index) =>
        <div key={index}
          style={{ marginTop: '5px'}}>
          <Field
            name={`${rel}.concept`}
            component={renderConcepts}
            concepts={concepts} />
          <Field
            name={`${rel}.relationship`}
            component={renderRelationships}
            concepts={concepts} />
          <button
            onClick={() => fields.remove(index)}
            style={{display: 'inline-block', marginLeft: '10px'}}>
            Remove
          </button>
        </div>
      )}
      </div>
  </div>
)

let AddConceptForm = ({ handleSubmit, concepts }) => {
  return (
    <div>
      <h2>Add a concept</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <div style={{display: 'inline-block'}}>
            <Field style={{display: 'block'}} name='conceptName' component={renderInput} label='Concept Name'/>
          </div>
          <div style={{display: 'inline-block', marginLeft: '10px'}}>
            <Field style={{display: 'block'}} name='conceptDescr' component={renderInput} label='Description' />
          </div>
        </div>
        <FieldArray name='relatedConcepts' component={renderRelatedConcepts} concepts={concepts}/>
        <button style={{marginTop: '15px'}} type='submit'>Submit</button>
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

export default connect(mapState)(AddConceptForm)
