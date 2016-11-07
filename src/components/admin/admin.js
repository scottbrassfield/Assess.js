import React from 'react'
import Navbar from '../main/navbar'

const Admin = (props) => {

  const styles = {
    heading: {
      position: 'absolute',
      left: 20,
      top: '50%',
      transform: 'translateY(-50%)'
    },
  }

  return (
    <div>
      <Navbar>
       <h1 style={styles.heading}>Administrator Dashboard</h1>
     </Navbar>
      {props.children}
    </div>
  )
}

export default Admin
