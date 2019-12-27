import React, { Component } from 'react'
import ReactMenu from './layout/ReactMenu';
import ReactLogin from './account/ReactLogin';
import ReactRegister from './account/ReactRegister';
import ReactHomeContainer from './home/ReactHomeContainer';
import ReactJobPostContainer from './jobs/ReactJobPostContainer';
import ReactJobViewContainer from './jobs/ReactJobViewContainer';
import ReactFooter from './layout/ReactFooter';
import ReactNews from './information/ReactNews';
import { connect } from 'react-redux';
import { loginUser, logoutUser, loginRefresh } from '../actions/auth';
import { Message } from 'semantic-ui-react';
import { checkTokenRefresh } from '../helpers/auth';
import {Route} from 'react-router-dom';
import './App.css'
import NothingHereYet from './placeholder/NothingHereYet';



class App extends Component {

  componentDidMount() {
    const result = checkTokenRefresh(this.props.auth)
    if (result) this.props.propsLoginRefresh()
  }

  render() {

    return (
      <div>  

        {/* Small message box indicating state of development*/}
        <Message style={{textAlign:"center", borderRadius:'0', margin: '0'}} color="green">This application is currently in <strong>development</strong> phase.</Message>
        
        {/* Navigation Menu */}
        <ReactMenu/>
        
        {/* Components for home route */}
        <Route path="/" exact component={ReactHomeContainer}/>
        <Route path="/create-jobs" exact component={ReactJobPostContainer}/>
        <Route path="/view-jobs" exact component={ReactJobViewContainer}/>
        <Route path="/analytics" exact component={NothingHereYet}/>
        <Route path="/news" exact component={ReactNews}/>
        <Route path="/login" exact component={ReactLogin}/>
        <Route path="/register" exact component={ReactRegister}/>

        {/* Footer */}
        <ReactFooter/>
    
      </div>
      
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = {
  propsLoginUser: loginUser,
  propsLogoutUser: logoutUser,
  propsLoginRefresh: loginRefresh
}

export default connect(mapStateToProps, mapDispatchToProps)(App)