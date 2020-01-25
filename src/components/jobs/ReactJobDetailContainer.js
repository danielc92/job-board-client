import React, { Component, Fragment } from 'react'
import {
  Segment,
  Header,
  Modal,
  Container,
  Button,
  Label,
  Form,
} from 'semantic-ui-react'
import VerticallyPaddedContainer from '../layout/VerticallyPaddedContainer'
import { queryStringToObjectParser } from '../../helpers/query'
import { getJob } from '../../actions/job'
import { setMenuItem } from '../../actions/menu'
import { createApplication, resetApplication } from '../../actions/application'
import { connect } from 'react-redux'
import { properCaseTransform } from '../../helpers/generic'

class ReactJobDetailContainer extends Component {
  state = {
    user_message: '',
  }

  componentDidMount() {
    this.props.propsGetJob(this.props.location.state.job_id)
    this.props.propsSetMenuItem('find')
  }

  applyForJob = () => {
    const { user_message } = this.state

    let payload = {
      job_id: this.props.jobDetails[0]._id,
      applicant_id: this.props.auth.user._id,
    }

    if (user_message.length > 0) {
      payload = { ...payload, user_message }
    }
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
    const jobSearch = this.props.jobDetails.filter(
      item => item._id === this.props.location.state.job_id
    )
    const jobDetails = jobSearch.length > 0 ? jobSearch[0] : null
    const { user_message } = this.state
    const { error, flag, message } = this.props.application
    return (
      <Segment basic>
        <Container>
          <VerticallyPaddedContainer size="3">
            {jobDetails ? (
              <React.Fragment>
                <Header as="h2">
                  {properCaseTransform(jobDetails.title)}
                  <Label color="violet" content={jobDetails.category} basic />
                </Header>
                <Segment padded stacked>
                  <Header as="h5" content="Location" />
                  <p>{jobDetails.location_string}</p>

                  <Header as="h5">About the job</Header>
                  <p>{jobDetails.job_summary}</p>

                  <Header as="h5">Salary</Header>
                  <Label color="green" basic size="large">
                    ${jobDetails.salary_range_low} - $
                    {jobDetails.salary_range_high}
                  </Label>

                  <Header as="h5">Skills</Header>
                  <Label.Group>
                    {jobDetails.skills.map(item => (
                      <Label basic color="green">
                        {item}
                      </Label>
                    ))}
                  </Label.Group>

                  <Header as="h5">Benefits</Header>
                  <Label.Group>
                    {jobDetails.benefits.map(item => (
                      <Label basic color="green">
                        {item}
                      </Label>
                    ))}
                  </Label.Group>

                  <Header as="h5">About the company</Header>
                  <p>{jobDetails.company_summary}</p>
                  <Header as="h5">Contact Summary</Header>
                  <p>{jobDetails.contact_summary}</p>
                </Segment>
                {/* If the job is open allow user to apply */}
                {!jobDetails.open ? (
                  <Segment stacked color="orange">
                    <Header>Job Unavailable</Header>
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
                            onClick={this.applyForJob}
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
              </React.Fragment>
            ) : (
              <Segment>Job not found.</Segment>
            )}
          </VerticallyPaddedContainer>
        </Container>
      </Segment>
    )
  }
}

const mapStateToProps = state => {
  const { jobDetails, auth, application } = state
  return {
    jobDetails,
    application,
    auth,
  }
}

const mapDispatchToProps = {
  propsGetJob: getJob,
  propsSetMenuItem: setMenuItem,
  propsCreateApplication: createApplication,
  propsResetApplication: resetApplication,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReactJobDetailContainer)
