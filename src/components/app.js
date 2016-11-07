import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import Home from './home'
import Main from './main/main'
import Admin from './admin/admin'
import Student from './student/student'
import StudentDashboard from './student/student-dashboard'
import AdminDashboard from './admin/admin-dashboard'
import AddConceptForm from './admin/add-concept'
import AddProblemForm from './admin/add-problem'
import Assessment from './student/assessment'

const App = () => (
  <Router history={hashHistory}>
    <Route path='/' component={Home} />
    <Route path='/main' component={Main}>
      <Route path='/admin' component={Admin} >
        <IndexRoute component = {AdminDashboard} />
        <Route path='/concept-form' component={AddConceptForm} />
        <Route path='/problem-form' component={AddProblemForm} />
      </Route>
      <Route path='/student' component={Student}>
        <IndexRoute component={StudentDashboard} />
        <Route path='/assessment' component={Assessment} />
      </Route>
    </Route>
  </Router>
)

export default App
