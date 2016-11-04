import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import Main from './main.js'
import Admin from './admin/admin'
import Student from './student/student'
import AddConceptForm from './admin/add-concept'
import AddProblemForm from './admin/add-problem'
import Assessment from './student/assessment'

const App = () => {
  return (
    <Router history={hashHistory}>
      <Route path='/' component={Main}>
        <Route path='/admin' component={Admin} >
          <Route path='/concept-form' component={AddConceptForm} />
          <Route path='/problem-form' component={AddProblemForm} />
        </Route>
        <Route path='/student' component={Student}>
          <Route path='/assessment' component={Assessment} />
        </Route>
      </Route>
      <AddConceptForm />
      <AddProblemForm />
      <div style={{marginTop: '30px'}} />
      <Assessment />
    </Router>
  )
}

export default App
