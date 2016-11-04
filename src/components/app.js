import React from 'react'
import AddConceptForm from './admin/add-concept'
import AddProblemForm from './admin/add-problem'
import Assessment from './student/assessment'

const App = () => {
  return (
    <div>
      <AddConceptForm />
      <AddProblemForm />
      <div style={{marginTop: '30px'}} />
      <Assessment />
    </div>
  )
}

export default App
