import React from 'react'
import { Link } from 'react-router'
import { List } from 'semantic-ui-react'

const Main = (props) => {

  const styles = {
    home: {
      backgroundColor: 'rgb(21, 23, 24)',
      height: 80,
      position: 'relative'
    },
    logoContainer: {
      width: '80%',
      position: 'relative',
      top: '50%',
      marginLeft: 'auto', marginRight: 'auto',
      transform: 'translatey(-50%)'
    },
    logoContent: {
      color: '#f3f3f3',
      fontSize: 35,
      fontFamily: 'cursive'
    },
    sideBar: {
      position: 'fixed',
      top: 0, bottom: 0, left: 0,
      width: 180,
      backgroundColor: 'rgb(13, 43, 54)'
    },
    mainContent: {
      marginLeft: 180,
      backgroundColor: '#f6f6f6',
      height: '100vh', width: '100vw',
      position: 'relative'
    },
    options: {
      marginTop: 30,
      paddingLeft: 20,
      listStyle: 'none'
    }
  }

  return (
    <div>
      <div style={styles.sideBar}>
        <div style={styles.home}>
          <div style={styles.logoContainer}>
            <Link to='/'>
              <div style={styles.logoContent}>Assess.js</div>
            </Link>
          </div>
        </div>
        <List inverted size={'massive'} relaxed link style={styles.options}>
          <List.Item><Link to='/student'>Student</Link></List.Item>
          <List.Item><Link to='/admin'>Admin</Link></List.Item>
        </List>
      </div>
      <div style={styles.mainContent}>
        {props.children}
      </div>
    </div>
  )
}

export default Main
