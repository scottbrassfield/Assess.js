import React from 'react'
import { connect } from 'react-redux'
import Problem from './problem'

const Assessment = (props) => (
  <div>
    <Problem {...props} />
  </div>
)

const mapState = (state) => {
  return {
    problem: state.assessment.currentProblem,
    concept: state.assessment.currentConcept.details
  }
}

export default connect(mapState)(Assessment)
