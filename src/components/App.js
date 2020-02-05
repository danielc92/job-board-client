import './App.css'
import { checkTokenRefresh, checkTokenIsValid } from '../helpers/auth'
import { connect } from 'react-redux'
import { loginUser, logoutUser, loginRefresh } from '../actions/auth'
import { Message } from 'semantic-ui-react'
import { Route } from 'react-router-dom'
import ApplicationPage from './dashboard/users/employer/applications/ApplicationPage'
import DashboardPage from './dashboard/DashboardPage'
import FooterSection from './layout/FooterSection'
import HomePage from './home/HomePage'
import JobDetailPage from './jobs/JobDetailPage'
import JobListPage from './jobs/JobListPage'
import JobPostPage from './jobs/JobPostPage'
import LoginPage from './account/LoginPage'
import MenuSection from './layout/MenuSection'
import NewsDetailPage from './information/NewsDetailPage'
import NewsListPage from './information/NewsListPage'
import ProfilePage from './profile/ProfilePage'
import React, { Component, Fragment } from 'react'
import RegisterPage from './account/RegisterPage'
import ProtectedRoute from './ProtectedRoute'

class App extends Component {
  componentDidMount() {
    // Regenerate auth object in redux upon refresh
    const { auth } = this.props
    if (checkTokenIsValid() && !auth.isAuthenticated)
      this.props.propsLoginRefresh()
  }

  render() {
    return (
      <Fragment>
        {/* Small message box indicating state of development*/}
        <Message
          style={{ textAlign: 'center', borderRadius: '0', margin: '0' }}
          color="violet"
          size="normal"
        >
          This application is currently in <strong>development</strong> phase.
        </Message>

        {/* Navigation Menu */}
        <MenuSection />

        {/* Components for home route */}

        <ProtectedRoute path="/create-jobs" exact component={JobPostPage} />
        <ProtectedRoute path="/dashboard" exact component={DashboardPage} />
        <ProtectedRoute path="/profile" exact component={ProfilePage} />
        <ProtectedRoute
          path="/dashboard/applications"
          exact
          component={ApplicationPage}
        />
        <Route path="/" exact component={HomePage} />
        <Route path="/job" exact component={JobDetailPage} />
        <Route path="/job/list" exact component={JobListPage} />
        <Route path="/news" exact component={NewsDetailPage} />
        <Route path="/news/list" exact component={NewsListPage} />
        <Route path="/register" exact component={RegisterPage} />
        <Route path="/sign-in" exact component={LoginPage} />

        {/* Footer */}
        <FooterSection />
      </Fragment>
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
