import React from 'react'
import Question from './question'
import Answer from './answer'

const Problem = (props) => (
  <div>
    <Question {...props} />
    <Answer {...props} />
  </div>
)

export default Problem
