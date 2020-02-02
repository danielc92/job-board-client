import React, { Component } from 'react'
import {
  dateDiffString,
  properCaseTransform,
} from '../../../../../helpers/generic'
import { getApplicationEmployerList } from '../../../../../actions/application_list_employer'
import { getCareerProfileEmployer } from '../../../../../actions/career_profile'
import { updateApplicationStatus } from '../../../../../actions/application'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router'
import {
  Container,
  Segment,
  Modal,
  Message,
  Label,
  Divider,
  Button,
  Table,
  Placeholder,
  Header,
} from 'semantic-ui-react'
import { setMenuItem } from '../../../../../actions/menu'
import VerticallyPaddedContainer from '../../../../layout/VerticallyPaddedContainer'
import ApplicationHeader from './ApplicationHeader'
import CustomErrorMessage from '../../../../placeholder/CustomErrorMessage'
import CustomNoResultsMessage from '../../../../placeholder/CustomNoResultsMessage'
import RenderApplicantProfile from './RenderApplicantProfile'
import CustomWithdrawnMessage from '../../../../placeholder/CustomWithdrawnMessage'
const { Line, Paragraph } = Placeholder

class ReactDashboardApplicationContainer extends Component {
  state = {
    modalContent: {},
    modalShow: false,
  }

  componentDidMount() {
    this.getApplications()
    this.props.propsSetMenuItem('dashboard')
  }

  getApplications() {
    const { job_id } = this.props.history.location.state
    this.props.propsGetApplicationEmployerList({
      job_id,
    })
  }

  handleModalContentChange = modalContent => {
    this.setState({ modalContent }, () => {
      this.setState({ modalShow: true }, () => {
        console.log('THIS IS THE ID', modalContent.applicant_id._id)
        const { _id } = modalContent.applicant_id
        if (modalContent.status !== 'withdrawn')
          this.props.propsGetCareerProfileEmployer(_id)
      })
    })
  }

  handleCloseModal = () => {
    this.setState({ modalShow: false })
  }

  handleApplicationStatusChange = status => {
    const { modalContent } = this.state
    const { job_id, applicant_id } = modalContent
    const payload = {
      status,
      job_id,
      applicant_id: applicant_id._id,
    }
    this.props.propsUpdateApplicationStatus(payload)
    this.setState({ modalShow: false })
    this.getApplications()
  }

  render() {
    const {
      application_list_employer,
      history,
      career_profile_employer,
    } = this.props
    const { error, docs, message } = application_list_employer
    const { modalShow, modalContent } = this.state
    const title = history.location.state
      ? history.location.state.jobTitle
      : 'Unknown'

    return (
      <React.Fragment>
        <Segment basic>
          <Container>
            <VerticallyPaddedContainer size="4">
              <Header as="h1" content={`Applications`} />
              <p>{`Review and update statuses for your ${properCaseTransform(
                title
              )} applications.`}</p>
              <Divider />
              {error ? (
                <CustomErrorMessage
                  header="An error has occured"
                  content={message}
                />
              ) : docs && docs.length > 0 ? (
                <Table celled striped>
                  <ApplicationHeader />
                  <Table.Body>
                    {docs.map(item => {
                      const { applicant_id, status, createdAt } = item
                      return (
                        <Table.Row key={item._id}>
                          <Table.Cell
                            content={`${properCaseTransform(
                              applicant_id.first_name
                            )} ${properCaseTransform(applicant_id.last_name)}`}
                          />
                          <Table.Cell content={status} />
                          <Table.Cell content={dateDiffString(createdAt)} />
                          <Table.Cell>
                            <Button
                              compact
                              onClick={() =>
                                this.handleModalContentChange(item)
                              }
                              color="green"
                            >
                              View application
                            </Button>
                          </Table.Cell>
                        </Table.Row>
                      )
                    })}
                  </Table.Body>
                </Table>
              ) : docs && docs.length === 0 ? (
                <CustomNoResultsMessage
                  header="No reults"
                  content="There are currently no application submitted for this job, please try again later."
                />
              ) : (
                <Segment stacked padded>
                  <Placeholder fluid>
                    <Paragraph>
                      <Line /> <Line /> <Line /> <Line /> <Line /> <Line />
                      <Line /> <Line /> <Line /> <Line /> <Line /> <Line />
                    </Paragraph>
                  </Placeholder>
                </Segment>
              )}
            </VerticallyPaddedContainer>
          </Container>
        </Segment>

        {Object.entries(modalContent).length > 0 ? (
          <Modal
            open={modalShow}
            dimmer="blurring"
            onClose={this.handleCloseModal}
          >
            <Modal.Header>
              {`${properCaseTransform(
                modalContent.applicant_id.first_name
              )} ${properCaseTransform(
                modalContent.applicant_id.last_name
              )}'s application`}
            </Modal.Header>

            {modalContent.status === 'withdrawn' ? (
              <Modal.Content>
                <CustomWithdrawnMessage
                  header="Application was withdrawn"
                  content="This applicant is no longer interested in applying for this job."
                />
              </Modal.Content>
            ) : (
              <Modal.Content>
                <Header as="h3" content="Current status" />
                <Label content={modalContent.status} />
                <Header as="h3">Message</Header>
                <p>
                  {modalContent.user_message
                    ? modalContent.user_message
                    : 'This applicant did not choose to a leave a message.'}
                </p>

                {career_profile_employer.error ? (
                  <Message
                    color="red"
                    header="An error occured."
                    content="Failed to fetch applicants profile"
                  />
                ) : career_profile_employer.data ? (
                  <RenderApplicantProfile
                    data={career_profile_employer.data}
                    applicant={modalContent.applicant_id}
                  />
                ) : (
                  new Array(4).fill(true).map(i => (
                    <Segment stacked padded>
                      <Placeholder>
                        <Placeholder.Paragraph>
                          <Placeholder.Line />
                          <Placeholder.Line />
                          <Placeholder.Line />
                          <Placeholder.Line />
                        </Placeholder.Paragraph>
                      </Placeholder>
                    </Segment>
                  ))
                )}
              </Modal.Content>
            )}

            <Modal.Actions>
              <Button
                disabled={modalContent.status === 'withdrawn'}
                color="green"
                content="I'm interested"
                onClick={() => this.handleApplicationStatusChange('interested')}
              />
              <Button
                disabled={modalContent.status === 'withdrawn'}
                onClick={() => this.handleApplicationStatusChange('rejected')}
                color="red"
                content="I'm not interested"
              />
              <Button
                secondary
                onClick={this.handleCloseModal}
                content="Close"
              />
            </Modal.Actions>
          </Modal>
        ) : null}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { application_list_employer, career_profile_employer } = state
  return {
    application_list_employer,
    career_profile_employer,
  }
}
const mapDispatchToProps = {
  propsGetApplicationEmployerList: getApplicationEmployerList,
  propsUpdateApplicationStatus: updateApplicationStatus,
  propsSetMenuItem: setMenuItem,
  propsGetCareerProfileEmployer: getCareerProfileEmployer,
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ReactDashboardApplicationContainer)
