import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { setMenuItem } from 'actions/menu'
import { Segment, Container } from 'semantic-ui-react'
import VerticallyPaddedContainer from 'components/layout/VerticallyPaddedContainer'
import Employer from './users/employer/Employer'
import Seeker from './users/seeker/Seeker'
import FeedbackCtaSection from 'components/feedback/FeedbackCtaSection'

class DashboardPage extends Component {
  componentDidMount() {
    this.props.propsSetMenuItem('dashboard')
  }

  render() {
    const { auth } = this.props
    return (
      <Fragment>
        <Segment basic>
          <Container>
            <VerticallyPaddedContainer size="4">
              {/* Handle Auth, then Employer/Seeker case */}
              {auth.user.is_employer ? <Employer /> : <Seeker />}
            </VerticallyPaddedContainer>
          </Container>
        </Segment>
        <FeedbackCtaSection />
      </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage)
