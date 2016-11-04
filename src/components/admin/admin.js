import React from 'react'
import { Link } from 'react-router'

const Admin = (props) => (
  <div>
    <button><Link to='/concept-form'>Add Concept</Link></button>
    <button><Link to='/problem-form'>Add Problem</Link></button>
    {props.children}
  </div>
)

export default Admin
