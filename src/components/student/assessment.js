import React from 'react'
import { connect } from 'react-redux'
import { Grid, Button } from 'semantic-ui-react'
import { Link } from 'react-router'
import Problem from './problem'
import { CLEAR_ASSESSMENT } from '../../actions'

const Assessment = (props) => {

  if (props.status === 'not started') {
    return <div />

  } else if (props.status ==='in progress') {
    return (
      <Grid padded>
        <Grid.Row style={{marginTop: 100}}>
          <Grid.Column width={1}>
          </Grid.Column>
          <Grid.Column width={13}>
            <div>
              <Problem {...props} />
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  } else {
    return (
      <Grid padded>
        <Grid.Row style={{marginTop: 100}}>
          <Grid.Column width={1}>
          </Grid.Column>
          <Grid.Column width={13}>
            <div>
              <h1>The Assessment has completed</h1>
              <Link to='/report'><Button onClick={() => props.dispatch({type: CLEAR_ASSESSMENT})}>View results</Button></Link>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

}

const mapState = (state) => {
  return {
    problem: state.assessment.currentProblem,
    concept: state.assessment.currentConcept.details,
    status: state.assessment.status
  }
}

export default connect(mapState)(Assessment)
