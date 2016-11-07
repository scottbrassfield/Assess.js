import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import Problem from './problem'

const Assessment = (props) => {

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
}

const mapState = (state) => {
  return {
    problem: state.assessment.currentProblem,
    concept: state.assessment.currentConcept.details
  }
}

export default connect(mapState)(Assessment)
