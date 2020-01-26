import React, { Component } from 'react'
import ReactMenu from './layout/ReactMenu'
import ReactLogin from './account/ReactLogin'
import ReactRegister from './account/ReactRegister'
import ReactHomeContainer from './home/ReactHomeContainer'
import ReactJobPostContainer from './jobs/ReactJobPostContainer'
import ReactJobViewContainer from './jobs/ReactJobViewContainer'
import ReactJobDetailContainer from './jobs/ReactJobDetailContainer'
import ReactProfileContainer from './profile/ReactProfileContainer'
import ReactFooter from './layout/ReactFooter'
import ReactNews from './information/ReactNews'
import ReactNewsDetail from './information/ReactNewsDetail'
import { connect } from 'react-redux'
import { loginUser, logoutUser, loginRefresh } from '../actions/auth'
import { Message } from 'semantic-ui-react'
import { checkTokenRefresh } from '../helpers/auth'
import { Route } from 'react-router-dom'
import './App.css'
import NothingHereYet from './placeholder/NothingHereYet'
import ReactDashboardContainer from './dashboard/ReactDashboardContainer'
import ReactDashboardApplicationContainer from './dashboard/users/employer/applications/ReactDashboardApplicationContainer'

class App extends Component {
  componentDidMount() {
    const result = checkTokenRefresh(this.props.auth)
    if (result) this.props.propsLoginRefresh()
  }

  render() {
    return (
      <div>
        {/* Small message box indicating state of development*/}
        <Message
          style={{ textAlign: 'center', borderRadius: '0', margin: '0' }}
          color="violet"
          size="large"
        >
          This application is currently in <strong>development</strong> phase.
        </Message>

        {/* Navigation Menu */}
        <ReactMenu />

        {/* Components for home route */}

        <Route path="/" exact component={ReactHomeContainer} />
        <Route path="/create-jobs" exact component={ReactJobPostContainer} />
        <Route path="/job/list" exact component={ReactJobViewContainer} />
        <Route path="/analytics" exact component={NothingHereYet} />
        <Route path="/news/list" exact component={ReactNews} />
        <Route path="/news" exact component={ReactNewsDetail} />
        <Route path="/sign-in" exact component={ReactLogin} />
        <Route path="/register" exact component={ReactRegister} />
        <Route path="/job" exact component={ReactJobDetailContainer} />
        <Route path="/profile" exact component={ReactProfileContainer} />
        <Route path="/dashboard" exact component={ReactDashboardContainer} />
        <Route
          path="/dashboard/applications"
          exact
          component={ReactDashboardApplicationContainer}
        />
        {/* Footer */}
        <ReactFooter />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = {
  propsLoginUser: loginUser,
  propsLogoutUser: logoutUser,
  propsLoginRefresh: loginRefresh,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
