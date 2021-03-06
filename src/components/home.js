import React from 'react'
import imgUrl from '../images/learning.jpg'
import { Link } from 'react-router'
import { Button } from 'semantic-ui-react'

const Home = () => {

  const styles = {
    background: {
      position: 'fixed',
      top: 0, left: 0,
      height: '100vh',
      width: '100vw',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: 'url('+ imgUrl + ')'
    },
    overlay: {
      backgroundColor: 'rgba(0,0,0,.6)',
      position: 'fixed',
      top: 0, left: 0,
      height: '100vh',
      width: '100vw',
      zIndex: 50
    },
    nav: {
      position: 'fixed',
      top: 0, left: 0,
      zIndex: 100,
      height: 80,
      width: '100%',
      color: '#f3f3f3',
      backgroundColor: 'rgb(13,43,54)'
    },
    logoContainer: {
      width: 100,
      height: '100%',
      position: 'absolute'
    },
    logoContent: {
      color: '#f3f3f3',
      fontSize: 30,
      width: '70%',
      position: 'relative',
      top: '50%', transform: 'translateY(-50%)',
      marginLeft: 'auto', marginRight: 'auto',
      fontFamily: 'cursive'
    },
    content: {
      marginTop: 80,
      width: '100vw',
      height: '100vh',
      position: 'relative',
    },
    buttons: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '20%',
      textAlign: 'center',
      width: '90%',
    },
    button: {
      fontSize: 30
    }
  }

  return (
    <div style={styles.background}>
      <div style={styles.overlay}>
        <div style={styles.nav}>
          <div style={styles.logoContainer}>
            <div style={styles.logoContent}>Assess.js</div>
          </div>
        </div>
        <div style={styles.content}>
          <div style={styles.buttons}>
            <Link to='/student'><Button style={styles.button}>Student Login</Button></Link>
            <Link to='/admin'><Button style={styles.button}>Administrator Login</Button></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
