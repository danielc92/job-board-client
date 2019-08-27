import React, { Component } from 'react'
import ReactMenu from './ReactMenu';
import ReactHomeContainer from './ReactHomeContainer';
import ReactFooter from './ReactFooter';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../actions/auth';
import { Message } from 'semantic-ui-react';


class App extends Component {
  
  render() {

    return (
      <React.Fragment>

        {/* Small message box indicating state of development*/}
        <Message style={{textAlign:"center", borderRadius:'0', margin: '0'}} color="green">This application is currently in <strong>development</strong> phase.</Message>
        
        {/* Navigation Menu */}
        <ReactMenu/>
        
        {/* Components for home route */}
        <ReactHomeContainer/>

        {/* Footer */}
        <ReactFooter/>

      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapActionsToProps = {
  propsLoginUser: loginUser,
  propsLogoutUser: logoutUser
}

export default connect(mapStateToProps, mapActionsToProps)(App)