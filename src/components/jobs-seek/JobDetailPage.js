import React, { Component, Fragment } from 'react'
import {
  Segment,
  Header,
  Modal,
  Container,
  Button,
  Form,
  Placeholder,
} from 'semantic-ui-react'
import { compose } from 'redux'
import { withRouter } from 'react-router'
import VerticallyPaddedContainer from 'components/layout/VerticallyPaddedContainer'
import { getJob } from 'actions/job'
import { setMenuItem } from 'actions/menu'
import { createApplication, resetApplication } from 'actions/application'
import { connect } from 'react-redux'
import { properCaseTransform } from 'helpers/generic'
import CustomErrorMessage from 'components/reusable/CustomErrorMessage'
import { checkTokenIsValid } from 'helpers/auth'
import { logoutUser } from 'actions/account/auth'
import { SESSION_EXPIRED_MESSAGE } from 'app_constants'
import JobDetailSegment from './JobDetailSegment'
import JobUnavailableSegment from 'components/jobs-seek/JobUnavailableSegment'
import BannerGroup from 'components/banners/BannerGroup'
const { Line, Paragraph } = Placeholder
class JobDetailContainer extends Component {
  state = {
    user_message: '',
  }

  componentDidMount() {
    this.props.propsGetJob(this.props.match.params.slug)
    this.props.propsSetMenuItem('find')
  }

  applyForJob = (job_id) => {
    if (!checkTokenIsValid()) {
      this.props.propsLogoutUser()
      this.props.history.push({
        pathname: '/sign-in',
        state: {
          redirect_message: SESSION_EXPIRED_MESSAGE,
        },
      })
      return
    }

    const { user_message } = this.state

    let payload = { job_id }
    if (user_message.length > 0) payload.user_message = user_message

    this.props.propsCreateApplication(payload)
  }

  handleInputChange = (event) => {
    const { name, value } = event.target
    // Validate message

    // Set message
    this.setState({ [name]: value })
  }

  closeModal = () => {
    this.props.propsResetApplication()
  }

  render() {
    const charLimit = 1000
    const { job_details } = this.props
    const { user_message } = this.state
    const { error, flag, message } = this.props.application
    return (
      <Fragment>
        <Segment basic>
          <Container text>
            <VerticallyPaddedContainer size="3">
              {job_details.error ? (
                <Fragment>
                  <Header as="h2" content="Job detail page" />
                  <CustomErrorMessage
                    header="An error has occured"
                    content={job_details.message}
                  />
                </Fragment>
              ) : job_details.data ? (
                <Fragment>
                  <Header as="h2">
                    {properCaseTransform(job_details.data.title)}
                  </Header>
                  <JobDetailSegment job_details={job_details} />

                  {/* If the job is open allow user to apply */}
                  {!job_details.data.open ? (
                    <JobUnavailableSegment />
                  ) : (
                    <Fragment>
                      <Header content="Start your application." as="h2" />
                      <Segment stacked padded>
                        <Form>
                          <Form.Field>
                            <Form.TextArea
                              value={user_message}
                              onChange={this.handleInputChange}
                              name="user_message"
                              placeholder="Some words about why you're suitable for this job."
                              label={`Enter a message for the employer (${
                                charLimit - user_message.length
                              } remaining).`}
                            />
                          </Form.Field>
                          <Form.Field>
                            <Form.Button
                              onClick={() =>
                                this.applyForJob(job_details.data._id)
                              }
                              content="Apply for this job"
                              color="green"
                              icon="paper plane"
                            />
                          </Form.Field>
                        </Form>
                      </Segment>
                    </Fragment>
                  )}

                  <Modal
                    open={error || flag}
                    dimmer="blurring"
                    onClose={this.closeModal}
                  >
                    <Modal.Header content={error ? 'Error' : 'Success'} />
                    <Modal.Content content={message} />
                    <Modal.Actions>
                      <Button
                        onClick={this.closeModal}
                        color={error ? 'red' : 'green'}
                      >
                        Confirm
                      </Button>
                    </Modal.Actions>
                  </Modal>
                </Fragment>
              ) : (
                <Fragment>
                  <Placeholder fluid>
                    <Placeholder.Header>
                      <Placeholder.Line />
                      <Placeholder.Line />
                    </Placeholder.Header>
                  </Placeholder>
                  <Segment padded stacked>
                    <Placeholder fluid>
                      <Paragraph>
                        <Line />
                        <Line />
                        <Line />
                        <Line />
                        <Line />
                        <Line />
                        <Line />
                        <Line />
                        <Line />
                        <Line />
                      </Paragraph>
                    </Placeholder>
                  </Segment>
                </Fragment>
              )}
            </VerticallyPaddedContainer>
          </Container>
        </Segment>
        <BannerGroup showfeedback />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { job_details, auth, application } = state
  return {
    job_details,
    application,
    auth,
  }
}

const mapDispatchToProps = {
  propsGetJob: getJob,
  propsSetMenuItem: setMenuItem,
  propsCreateApplication: createApplication,
  propsResetApplication: resetApplication,
  propsLogoutUser: logoutUser,
}
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(JobDetailContainer)
