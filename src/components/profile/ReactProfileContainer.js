import React, { Component } from 'react'
import {
  Header,
  Container,
  Grid,
  Label,
  Placeholder,
  Segment,
  Divider,
  Feed,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { dateDiffString, properCaseTransform } from '../../helpers/generic'
import { setMenuItem } from '../../actions/menu'
import { getUserDetails } from '../../actions/profile'
import { loginRefresh } from '../../actions/auth'
import VerticallyPaddedContainer from '../layout/VerticallyPaddedContainer'
import Seeker from './Seeker'
import CustomAuthMessage from '../placeholder/CustomAuthMessage'
import CustomErrorMessage from '../placeholder/CustomErrorMessage'
import FeedbackCta from '../feedback/FeedbackCta'
const { Line, Paragraph } = Placeholder

class ReactProfileContainer extends Component {
  state = {
    sent: false,
  }
  componentDidMount() {
    const { propsSetMenuItem, propsGetUserDetails, auth } = this.props

    if (auth.isAuthenticated) {
      propsGetUserDetails(auth.user._id)
    }

    propsSetMenuItem('profile')
  }

  componentDidUpdate() {
    const { auth, propsGetUserDetails, profile } = this.props
    const { loaded, error } = profile
    if (!loaded && !error) {
      propsGetUserDetails(auth.user._id)
    }
  }

  render() {
    const { profile, auth } = this.props
    const { loaded, error, data, message } = profile
    if (!auth.isAuthenticated) {
      return (
        <section>
          <Segment basic>
            <Container>
              <VerticallyPaddedContainer size="4">
                <Header as="h1" content="Profile" />
                <p>Customize your profile, career details and more.</p>
                <Divider />
                <CustomAuthMessage
                  header="Authentication required"
                  content="You need to be logged in to view your profile."
                />
              </VerticallyPaddedContainer>
            </Container>
          </Segment>
          <FeedbackCta />
        </section>
      )
    }
    return (
      <React.Fragment>
        <Segment basic>
          <Container>
            <VerticallyPaddedContainer size="4">
              <Header as="h1" content="Profile" />
              <p>Customize your profile, career details and more.</p>
              <Divider />
              {!loaded && !error ? (
                <Segment stacked padded>
                  <Placeholder fluid>
                    <Paragraph>
                      <Line />
                      <Line />
                      <Line />
                      <Line />
                      <Line />
                      <Line />
                    </Paragraph>
                  </Placeholder>
                </Segment>
              ) : null}
              {error ? (
                <CustomErrorMessage
                  header="An error occured"
                  content={message}
                />
              ) : null}
              {loaded ? (
                <React.Fragment>
                  <Header as="h3" content="Personal Details" />
                  <Segment stacked padded color="green">
                    <Grid divided="vertically">
                      <Grid.Row columns={2}>
                        <Grid.Column>
                          <Header content="Name" as="h5" />
                          <p>{`${properCaseTransform(
                            data.first_name
                          )} ${properCaseTransform(data.last_name)}`}</p>
                          <Header content="Email" as="h5" />
                          <p>{data.email}</p>
                        </Grid.Column>
                        <Grid.Column>
                          <Header content="Joined" as="h5" />
                          {dateDiffString(data.createdAt)}
                          <Header content="Member Type" as="h5" />
                          <Label
                            color="violet"
                            basic
                            content={
                              data.is_employer ? 'employer' : 'job seeker'
                            }
                          />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Segment>
                  {!data.is_employer ? <Seeker /> : null}
                </React.Fragment>
              ) : null}
            </VerticallyPaddedContainer>
          </Container>
        </Segment>
        <FeedbackCta />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { profile, auth } = state
  return {
    profile,
    auth,
  }
}

const mapDispatchToProps = {
  propsSetMenuItem: setMenuItem,
  propsGetUserDetails: getUserDetails,
  propsLoginRefresh: loginRefresh,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReactProfileContainer)
