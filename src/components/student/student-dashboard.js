import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Grid, Segment, Button } from 'semantic-ui-react'
import { startAssessment } from '../../actions'

const StudentDashboard = (props) => {

  const styles = {
    btn: {
      fontSize: 14,
      padding: 15
    },
    content: {
      marginTop: 120,
      backgroundColor: '#eaeaea'
    }
  }

  return (
    <Grid padded>
      <Grid.Row>
        <Grid.Column width={1}>
        </Grid.Column>
        <Grid.Column width={13}>
          <Segment style={styles.content}>
            <Segment.Group>
              <Segment><h1>Assessments</h1></Segment>
            </Segment.Group>
            <Segment.Group>
              <Segment>
                <h2>Javascript Fundamentals</h2>
                <h4>This assessment is designed to gauge your understanding several fundamental JavaScript concepts</h4>
                <Link to='/assessment'>
                  <Button
                    color='grey'
                    style={styles.btn}
                    onClick={() => props.dispatch(startAssessment())}
                  >
                    Start Assessment
                  </Button>
                </Link>
              </Segment>
            </Segment.Group>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default connect()(StudentDashboard)
