import React, { Component, Fragment } from 'react'
import {
  Segment,
  Header,
  Modal,
  Container,
  Grid,
  Button,
  Label,
  Form,
  Placeholder,
} from 'semantic-ui-react'
import { compose } from 'redux'
import { withRouter } from 'react-router'
import VerticallyPaddedContainer from '../layout/VerticallyPaddedContainer'
import { getJob } from '../../actions/job'
import { setMenuItem } from '../../actions/menu'
import { createApplication, resetApplication } from '../../actions/application'
import { connect } from 'react-redux'
import { properCaseTransform } from '../../helpers/generic'
import CustomErrorMessage from '../reusable/CustomErrorMessage'
import FeedbackCtaSection from '../feedback/FeedbackCtaSection'
import { checkTokenIsValid } from '../../helpers/auth'
import { logoutUser } from '../../actions/account/auth'
import { SESSION_EXPIRED_MESSAGE } from '../../constants'
const { Line, Paragraph } = Placeholder
class JobDetailContainer extends Component {
  state = {
    user_message: '',
  }

  componentDidMount() {
    console.log('D', this.props)
    this.props.propsGetJob(this.props.match.params.slug)
    this.props.propsSetMenuItem('find')
  }

  applyForJob = job_id => {
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

  handleInputChange = event => {
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
          <Container>
            <VerticallyPaddedContainer size="3">
              {job_details.data ? (
                <Header as="h2">
                  {properCaseTransform(job_details.data.title)}
                  <Label
                    color="violet"
                    content={job_details.data.category}
                    basic
                  />
                </Header>
              ) : (
                <Header as="h2" content="Job detail page" />
              )}
              <p>Quis laboris excepteur eiusmod aliqua nisi magna labore.</p>
              {job_details.error ? (
                <CustomErrorMessage
                  header="An error has occured"
                  content={job_details.message}
                />
              ) : job_details.data ? (
                <Fragment>
                  <Segment padded stacked>
                    <Header as="h5" content="About the job" />
                    <p>{job_details.data.job_summary}</p>
                    <Grid stackable>
                      <Grid.Row>
                        <Grid.Column width={8}>
                          <Header as="h5" content="Salary" />
                          <Label color="blue" basic>
                            ${job_details.data.salary_range_low} - $
                            {job_details.data.salary_range_high}
                          </Label>
                        </Grid.Column>
                        <Grid.Column width={8}>
                          <Header as="h5" content="Location" />
                          <p>{job_details.data.location_string}</p>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>

                    <Grid stackable>
                      <Grid.Row>
                        <Grid.Column width={8}>
                          <Header as="h5" content="Skills" />
                          <Label.Group>
                            {job_details.data.skills.map(item => (
                              <Label basic color="green">
                                {item}
                              </Label>
                            ))}
                          </Label.Group>
                        </Grid.Column>
                        <Grid.Column width={8}>
                          <Header as="h5" content="Benefits" />
                          <Label.Group>
                            {job_details.data.benefits.map(item => (
                              <Label basic color="green">
                                {item}
                              </Label>
                            ))}
                          </Label.Group>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>

                    <Header as="h5" content="About the company" />
                    <p>{job_details.data.company_summary}</p>
                    <Header as="h5" content="Contact Summary" />
                    <p>{job_details.data.contact_summary}</p>
                  </Segment>
                  {/* If the job is open allow user to apply */}
                  {!job_details.data.open ? (
                    <Segment stacked color="orange">
                      <Header content="Job Unavailable" />
                      <p>
                        The member who posted this job, has closed it off and is
                        no longer accepting applications.
                      </p>
                    </Segment>
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
                              label={`Enter a message for the employer (${charLimit -
                                user_message.length} remaining).`}
                            />
                          </Form.Field>
                          <Form.Field>
                            <Form.Button
                              onClick={() =>
                                this.applyForJob(job_details.data._id)
                              }
                              content="Apply for this job"
                              color="violet"
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
              )}
            </VerticallyPaddedContainer>
          </Container>
        </Segment>
        <FeedbackCtaSection />
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
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