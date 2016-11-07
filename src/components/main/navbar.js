import React from 'react'

const Navbar = (props) => {

  const styles = {
    nav: {
      position: 'fixed',
      top: 0,
      left: 180,
      zIndex: 100,
      height: 80,
      width: '100%',
      color: '#f3f3f3',
      backgroundColor: 'rgb(13,43,54)'
    }
  }
  return (
    <div style={styles.nav}>
      {props.children}
    </div>
  )
}

export default Navbar
