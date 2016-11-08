import React from 'react'
import { connect } from 'react-redux'
import { Grid, Segment, Divider, Table } from 'semantic-ui-react'

const Problem = ({ problem }) => (
  <Table.Row>
    <Table.Cell>{problem.question}</Table.Cell>
    <Table.Cell>{problem.studentAnswer}</Table.Cell>
  </Table.Row>
)

const Problems = ({ problems }) => {
  return (
    <Table celled>
      <Table.Body>
        {problems.map(problem => {
          return <Problem key={problem._id} problem={problem} />
        })}
      </Table.Body>
    </Table>
  )
}

const Concept = ({ concept }) => (
  <h4>{concept}</h4>
)

const Concepts = ({ concepts }) => {
  return (
    <div>
      {concepts.map(concept => {
        return (
          <div key={concept.details._id} style={{marginTop: 20}}>
            <Concept concept={concept.details.title} />
            <Problems problems={concept.problems} />
          </div>
        )
      })}
    </div>
  )
}

const Report = ({ understood, toStudy }) => {
  return (
    <Grid padded>
      <Grid.Row style={{marginTop: 100}}>
        <Grid.Column width={1}>
        </Grid.Column>
        <Grid.Column width={14}>
          <Segment style={{backgroundColor: '#eaeaea'}}>
            <Segment.Group>
              <Segment><h1>Assessment Report</h1></Segment>
            </Segment.Group>
            <Segment.Group horizontal>
              <Segment>
                <h3>Concepts Understood</h3>
                <Divider />
                { understood && <Concepts concepts={understood} /> }
              </Segment>
              <Segment>
                <h3>Concepts to Study</h3>
                <Divider />
                { toStudy && <Concepts concepts={toStudy} /> }
              </Segment>
            </Segment.Group>
          </Segment>
        </Grid.Column>
        <Grid.Column width={1}>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

const getConcepts = (type, { reports }) => {
  const report = reports[reports.length - 1]
  if (report) {
    let theConcepts = report.concepts
      .filter(concept => {
        return concept.status === type
      })
      .map(concept => {
        let conceptProblems = report.problems.filter(prob => {
          return prob.concept === concept.details._id
        })
        return { ...concept, problems: conceptProblems }
      })
      return theConcepts
  }
}

const mapState = (state) => {
  return {
    understood: getConcepts('understood', state),
    toStudy: getConcepts('developing', state)
  }
}


export default connect(mapState)(Report)
