import React, { Component, Fragment } from 'react'
import {
  Header,
  Container,
  Grid,
  Label,
  Placeholder,
  Segment,
  Divider,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { dateDiffString, properCaseTransform } from 'helpers/generic'
import { setMenuItem } from 'actions/menu'
import { getUserDetails } from 'actions/profile'
import VerticallyPaddedContainer from 'components/layout/VerticallyPaddedContainer'
import Seeker from './SeekerProfile'
import CustomErrorMessage from 'components/reusable/CustomErrorMessage'
import BannerGroup from 'components/banners/BannerGroup'
const { Line, Paragraph } = Placeholder

class ProfilePage extends Component {
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
    const { profile } = this.props
    const { loaded, error, data, message } = profile
    return (
      <Fragment>
        <Segment basic>
          <Container text>
            <VerticallyPaddedContainer size="4">
              <Header as="h1" content="Profile" />
              <p>Customize your profile, career details and more.</p>
              <Divider />
              {!loaded && !error ? (
                <React.Fragment>
                  <Placeholder fluid>
                    <Placeholder.Header>
                      <Placeholder.Line />
                      <Placeholder.Line />
                    </Placeholder.Header>
                  </Placeholder>

                  <Segment stacked padded>
                    <Placeholder fluid>
                      <Placeholder.Paragraph>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />

                        <Placeholder.Line />
                        <Placeholder.Line />
                      </Placeholder.Paragraph>
                    </Placeholder>
                  </Segment>
                  <Placeholder fluid>
                    <Placeholder.Header>
                      <Placeholder.Line />
                      <Placeholder.Line />
                    </Placeholder.Header>
                  </Placeholder>

                  <Segment stacked padded>
                    <Placeholder fluid>
                      <Placeholder.Paragraph>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />

                        <Placeholder.Line />
                        <Placeholder.Line />
                      </Placeholder.Paragraph>
                    </Placeholder>
                  </Segment>
                  <Placeholder fluid>
                    <Placeholder.Header>
                      <Placeholder.Line />
                      <Placeholder.Line />
                    </Placeholder.Header>
                  </Placeholder>

                  <Segment stacked padded>
                    <Placeholder fluid>
                      <Placeholder.Paragraph>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />

                        <Placeholder.Line />
                        <Placeholder.Line />
                      </Placeholder.Paragraph>
                    </Placeholder>
                  </Segment>
                </React.Fragment>
              ) : null}
              {error ? (
                <CustomErrorMessage
                  header="An error occured"
                  content={message}
                />
              ) : null}
              {loaded ? (
                <Fragment>
                  <Header as="h3" content="Personal Details" />
                  <Segment stacked padded>
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
                </Fragment>
              ) : null}
            </VerticallyPaddedContainer>
          </Container>
        </Segment>
        <BannerGroup showFeedback />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { profile, auth } = state
  return {
    profile,
    auth,
  }
}

const mapDispatchToProps = {
  propsSetMenuItem: setMenuItem,
  propsGetUserDetails: getUserDetails,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
