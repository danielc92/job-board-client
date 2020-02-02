import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setMenuItem } from '../../actions/menu'
import { Segment, Container, Header, Divider, Feed } from 'semantic-ui-react'
import VerticallyPaddedContainer from '../layout/VerticallyPaddedContainer'
import Employer from './users/employer/Employer'
import Seeker from './users/seeker/Seeker'
import CustomAuthMessage from '../placeholder/CustomAuthMessage'
import FeedbackCta from '../feedback/FeedbackCta'

class ReactDashboardContainer extends Component {
  componentDidMount() {
    this.props.propsSetMenuItem('dashboard')
  }

  render() {
    const { auth } = this.props
    return (
      <React.Fragment>
        <Segment basic>
          <Container>
            <VerticallyPaddedContainer size="4">
              {/* Handle Auth, then Employer/Seeker case */}
              {!auth.isAuthenticated ? (
                <React.Fragment>
                  <Header as="h1" content="Dashboard" />
                  <p>View and update your applications/job postings.</p>
                  <Divider />
                  <CustomAuthMessage
                    content="You need to be logged in to view your dashboard."
                    header="Authentication required"
                  />
                </React.Fragment>
              ) : auth.user.is_employer ? (
                <Employer />
              ) : (
                <Seeker />
              )}
            </VerticallyPaddedContainer>
          </Container>
        </Segment>
        <FeedbackCta />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    menu: state.menu,
    auth: state.auth,
  }
}
const mapDispatchToProps = {
  propsSetMenuItem: setMenuItem,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReactDashboardContainer)
