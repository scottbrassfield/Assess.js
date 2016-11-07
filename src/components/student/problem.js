import React from 'react'
import { Segment } from 'semantic-ui-react'
import Question from './question'
import Answer from './answer'

const Problem = (props) => {

  return (
    <Segment.Group>
      <Segment style={{backgroundColor: '#eaeaea'}}>
        <Segment.Group>
          <Segment><h1>JavaScript Fundamentals</h1></Segment>
          </Segment.Group>
          <Segment.Group>
            <Segment padded='very'>
              <Question {...props} />
            </Segment>
            <Segment padded='very'>
              <Answer {...props} />
            </Segment>
          </Segment.Group>
        </Segment>
      </Segment.Group>
  )
}

export default Problem
