import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { startAssessment } from '../../actions'

const Student = (props) => (
  <div>
    <button onClick={() => props.dispatch(startAssessment())}>
      <Link to='/assessment'>Start Assessment</Link>
    </button>
    {props.children}
  </div>
)

export default connect()(Student)
