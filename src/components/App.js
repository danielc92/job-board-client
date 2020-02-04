import './App.css'
import { checkTokenRefresh } from '../helpers/auth'
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
import React, { Component } from 'react'
import RegisterPage from './account/RegisterPage'

class App extends Component {
  componentDidMount() {
    const result = checkTokenRefresh(this.props.auth)
    if (result) this.props.propsLoginRefresh()
  }

  render() {
    return (
      <div shit="wow this is shit">
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

        <Route path="/" exact component={HomePage} />
        <Route path="/create-jobs" exact component={JobPostPage} />
        <Route path="/job/list" exact component={JobListPage} />
        <Route path="/news/list" exact component={NewsListPage} />
        <Route path="/news" exact component={NewsDetailPage} />
        <Route path="/sign-in" exact component={LoginPage} />
        <Route path="/register" exact component={RegisterPage} />
        <Route path="/job" exact component={JobDetailPage} />
        <Route path="/profile" exact component={ProfilePage} />
        <Route path="/dashboard" exact component={DashboardPage} />
        <Route
          path="/dashboard/applications"
          exact
          component={ApplicationPage}
        />
        {/* Footer */}
        <FooterSection />
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
