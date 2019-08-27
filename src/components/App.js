import React, { Component } from 'react'
import ReactMenu from './ReactMenu';
import ReactHero from './ReactHero';
import ReactFeatures from './ReactFeatures';
import ReactFooter from './ReactFooter';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../actions/auth';
import {
  Segment,
  Header,
  Message,
  Grid,
  Image,
  Container
} from 'semantic-ui-react';


class App extends Component {

  
  render() {

    return (
      <React.Fragment>
        <Container>
          <Message style={{textAlign:"center"}} color="blue">This application is currently in <strong>development</strong> phase.</Message>
        </Container>
        
        {/* Navigation Menu */}
        <ReactMenu/>
        
        {/* Hero (split into two panes) */}
        <ReactHero/>
        
        {/* Features */}
        <ReactFeatures/>

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