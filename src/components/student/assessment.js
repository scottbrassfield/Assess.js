import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import { Link } from 'react-router'
import Problem from './problem'

const Assessment = (props) => {
  if (props.active) {
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
              <Link to='/report'><h4>View results</h4></Link>
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
    active: state.assessment.active
  }
}

export default connect(mapState)(Assessment)
