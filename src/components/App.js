import './App.css'
import { checkTokenIsValid } from '../helpers/auth'
import { connect } from 'react-redux'
import { loginUser, logoutUser, loginRefresh } from '../actions/account/auth'
import { Message } from 'semantic-ui-react'
import { Route } from 'react-router-dom'
import ApplicationPage from './dashboard/users/employer/applications/ApplicationPage'
import DashboardPage from './dashboard/DashboardPage'
import FooterSection from './layout/FooterSection'
import HomePage from './home/HomePage'
import JobDetailPage from './jobs-seek/JobDetailPage'
import JobListPage from './jobs-seek/JobListPage'
import JobPostPage from './jobs-post/JobPostPage'
import LoginPage from './account/LoginPage'
import MenuSection from './layout/MenuSection'
import NewsDetailPage from './articles/NewsDetailPage'
import NewsListPage from './articles/NewsListPage'
import ProfilePage from './profile/ProfilePage'
import React, { Component, Fragment } from 'react'
import RegisterPage from './account/RegisterPage'
import ProtectedRoute from './ProtectedRoute'
import ResetPasswordPage from './account/ResetPasswordPage'
import ActivationPage from './account/ActivationPage'

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
        <Route component={ScrollToTop} />
        {/* Small message box indicating state of development*/}
        <Message
          style={{ textAlign: 'center', borderRadius: '0', margin: '0' }}
          color="violet"
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
        <Route path="/activate-account" exact component={ActivationPage} />
        <Route path="/reset-password" exact component={ResetPasswordPage} />
        <Route path="/" exact component={HomePage} />
        <Route path="/job-detail/:id" exact component={JobDetailPage} />
        <Route path="/job-list" exact component={JobListPage} />
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

const ScrollToTop = () => {
  window.scrollTo(0, 0)
  return null
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
