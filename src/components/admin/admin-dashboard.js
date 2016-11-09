import React from 'react'
import { Link } from 'react-router'
import { Grid, Segment, Button } from 'semantic-ui-react'

const AdminDashboard = () => {

  const styles = {
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
        <Grid.Column width={12}>
        <Segment style={styles.content}>
          <Segment.Group>
            <Segment><h1>Actions</h1></Segment>
          </Segment.Group>
          <Segment.Group>
            <Segment>
              <h2>Add Concept</h2>
              <h4>Add a new concept to the knowledge space and define how it relates to other concepts</h4>
              <Link to='/concept-form'>
              <Button color='grey'>Add</Button>
              </Link>
            </Segment>
            <Segment>
              <h2>Add Problem</h2>
              <h4>Add a new problem to the knowledge space and connect it to its relevant concept</h4>
              <Link to='/problem-form'>
                <Button color='grey'>Add</Button>
              </Link>
            </Segment>
            </Segment.Group>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default AdminDashboard
