import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { addProblem } from '../../actions'
import { Grid, Segment, Form, Input, Button } from 'semantic-ui-react'

const renderInput = ({input, style, label}) => (
  <div>
    <label style={{fontSize: 20}}>{label}</label>
    <Input type='text' {...input} style={style}/>
  </div>
)

const renderConcepts = ({ input, concepts, label }) => (
  <div>
    <label style={{fontSize: 20}}>{label}</label>
    <select className='ui dropdown' {...input}>
      <option>Choose...</option>
      { concepts.map((concept, index) =>
        <option key={index}>{concept}</option>
      )}
    </select>
  </div>
)

let AddProblemForm = ({ handleSubmit, concepts }) => {
  return (
    <Grid padded>
      <Grid.Row>
        <Grid.Column width={10}>
          <Segment.Group style={{marginTop: 80}}>
            <Segment><h2>Add a Problem</h2></Segment>
            <Segment>
            <div style={{marginTop: '20px'}}>
              <Form onSubmit={handleSubmit}>
                <Form.Field>
                  <Field name='concept' component={renderConcepts} label='Related Concept' concepts={concepts}/>
                </Form.Field>
                <Form.Field>
                  <Field name='topic' component={renderInput} label='Topic' /></Form.Field>
                <Form.Field>
                  <Field name='question' component={renderInput} label='Question' />
                </Form.Field>
                <Form.Field>
                  <Field name='answer' component={renderInput} label='Answer' />
                </Form.Field>
                <Button type='submit' color='grey' style={{marginTop: '15px'}}>Submit</Button>
              </Form>
            </div>
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
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