import React from 'react'
import { connect } from 'react-redux'
import Problem from './problem'
import { startAssessment } from '../../actions'

const Assessment = ({ dispatch, ...rest }) => (
  <div>
    <button onClick={() => dispatch(startAssessment())}>Begin Assessment</button>
    <Problem {...rest} />
  </div>
)

const mapState = (state) => {
  return {
    problem: state.assessment.currentProblem,
    concept: state.assessment.currentConcept.details
  }
}

export default connect(mapState)(Assessment)
