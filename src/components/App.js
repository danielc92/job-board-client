import React, { Component } from 'react'
import ReactMenu from './ReactMenu';
import ReactLogin from './account/ReactLogin';
import ReactHomeContainer from './home/ReactHomeContainer';
import ReactFooter from './ReactFooter';
import ReactNews from './news/ReactNews';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../actions/auth';
import { Message } from 'semantic-ui-react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import './App.css'
import NothingHereYet from './placeholder/NothingHereYet';


class App extends Component {
  
  render() {

    return (
      <Router>
      <React.Fragment>

        {/* Small message box indicating state of development*/}
        <Message style={{textAlign:"center", borderRadius:'0', margin: '0'}} color="green">This application is currently in <strong>development</strong> phase.</Message>
        
        {/* Navigation Menu */}
        <ReactMenu/>
        
        {/* Components for home route */}
        <Route path="/" exact component={ReactHomeContainer}/>
        <Route path="/view-jobs" exact component={NothingHereYet}/>
        <Route path="/create-jobs" exact component={NothingHereYet}/>
        <Route path="/analytics" exact component={NothingHereYet}/>
        <Route path="/news" exact component={ReactNews}/>
        <Route path="/login" exact component={ReactLogin}/>

        {/* Footer */}
        <ReactFooter/>

      </React.Fragment>
      </Router>
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