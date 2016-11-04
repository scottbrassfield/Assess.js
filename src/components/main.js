import React from 'react'
import { Link } from 'react-router'

const Main = (props) => (
  <div>
    <h1>Assess your JavaScript knowledege</h1>
    <div>
      <button><Link to='/admin'>Admin</Link></button>
      <button><Link to='/student'>Student</Link></button>
    </div>
    {props.children}
  </div>
)

export default Main
