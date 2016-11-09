import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field, FieldArray } from 'redux-form'
import { Link } from 'react-router'
import { addConcept } from '../../actions'
import { Grid, Segment, Form, Input, Button, Divider } from 'semantic-ui-react'

const renderInput = ({input, style, label}) => (
  <div>
    <label style={{fontSize: 22}}>{label}</label>
    <Input type='text' {...input} style={style}/>
  </div>
)

const renderConcepts = ({ input, concepts, label }) => (
  <div>
    <label>{label}</label>
    <select
      className={'ui dropdown'}
      onChange = {(value) => {input.onChange(value)}}
      {...input}
    >
      <option>Choose...</option>
      { concepts.map((concept, index) =>
        <option key={index}>{concept}</option>
      )}
    </select>
  </div>
)

const renderRelationships = ({ input, label }) => (
  <div>
    <label>{label}</label>
    <select
      className={'ui dropdown'}
      onChange = {(value) => {input.onChange(value)}}
      {...input}
    >
      <option>Choose...</option>
      <option value='precedes'>precedes</option>
      <option value='follows'>follows</option>
    </select>
  </div>
)

const renderRelatedConcepts = ({ fields, concepts }) => (
  <div>
    <div style={{marginTop: '15px'}}>
      <Button type='button'
        onClick={() => fields.push({})}>
        Add Relationship
      </Button>
    </div>
    <div style={{marginTop: '10px'}}>
      {fields.map((rel, index) =>
        <div key={index}
          style={{ marginTop: '5px'}}>
          <Form.Group widths='equal'>
            <Form.Field inline>
              <Field
                name={`${rel}.concept`}
                component={renderConcepts}
                concepts={concepts}
                label='Related Concept'
              />
            </Form.Field>
            <Form.Field inline>
              <Field
                name={`${rel}.relationship`}
                component={renderRelationships}
                concepts={concepts}
                label='Relationship'
              />
            </Form.Field>
          <button type='button'
            onClick={() => fields.remove(index)}
            style={{border: 'none', backgroundColor: 'transparent', color: 'maroon', marginTop: 10}}
          >
            Remove
          </button>
          </Form.Group>
        </div>
      )}
      </div>
  </div>
)

let AddConceptForm = ({ handleSubmit, concepts }) => {
  return (
    <Grid padded>
      <Grid.Row>
        <Grid.Column width={1}>
        </Grid.Column>
        <Grid.Column width={10}>
        <Segment style={{marginTop: 120, backgroundColor: '#eaeaea'}}>
          <Segment.Group>
            <Segment><h2>Add a Concept</h2></Segment>
          </Segment.Group>
          <Segment.Group>
            <Segment>
              <Form onSubmit={handleSubmit}>
                <div>
                  <Form.Field>
                    <Field
                      name='conceptName'
                      component={renderInput}
                      label='Concept Name'
                    />
                  </Form.Field>
                  <Form.Field>
                    <Field
                      name='conceptDescr'
                      component={renderInput}
                      label='Description'
                    />
                  </Form.Field>
                </div>
                <FieldArray
                  name='relatedConcepts'
                  component={renderRelatedConcepts}
                  concepts={concepts}
                />
                <Divider />
                <Button type='submit' color='grey'>
                  Submit
                </Button>
                <Link to='/admin'><Button basic type='button'>
                  Cancel
                </Button></Link>
              </Form>
            </Segment>
          </Segment.Group>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

AddConceptForm = reduxForm({
  form:'addConcept',
  onSubmit: (values, dispatch, { reset }) => {
    dispatch(addConcept(values))
    reset()
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
