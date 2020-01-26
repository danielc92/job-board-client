import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router'
import {
  Divider,
  Modal,
  Segment,
  Placeholder,
  Button,
  Header,
  Icon,
  Table,
  Pagination,
} from 'semantic-ui-react'
import { getJobListForEmployer } from '../../../../actions/job_list_employer'
import {
  resetJobStatus,
  updateJobStatus,
} from '../../../../actions/job_status_update'
import { properCaseTransform } from '../../../../helpers/generic'
import EmployerTableHeader from './EmployerTableHeader'
import { dateDiffString } from '../../../../helpers/generic'
import CustomErrorMessage from '../../../placeholder/CustomErrorMessage'
import CustomNoResultsMessage from '../../../placeholder/CustomNoResultsMessage'
const { Line, Paragraph } = Placeholder

class Employer extends Component {
  componentDidMount() {
    this.props.propsgetJobListForEmployer({})
  }

  componentWillReceiveProps() {
    // If the page has changed in router props call new data from api
    const { history, location } = this.props
    if (!history.location.state || !location.state) {
      history.push({
        pathname: '/dashboard',
        state: { page: 1 },
      })
    } else {
      if (history.location.state.page !== location.state.page) {
        this.props.propsgetJobListForEmployer({
          page: history.location.state.page,
        })
      }
    }
  }

  handlePageChange = (event, data) => {
    const { history } = this.props
    const { activePage } = data
    history.push({
      pathname: '/dashboard',
      state: { page: activePage },
    })
  }

  handleCloseJob = payload => {
    this.props.propsUpdateJobStatus(payload)
  }

  handleCloseModal = () => {
    const { propsResetJobStatus } = this.props
    propsResetJobStatus()
    this.getJobListForEmployer()
  }

  handleNavigateApplications = (job_id, jobTitle) => {
    this.props.history.push({
      pathname: '/dashboard/applications',
      state: { jobTitle, job_id },
    })
  }

  render() {
    const { job_list_employer, auth, jobUpdateStatus } = this.props
    const { error, docs, message } = job_list_employer
    return (
      <React.Fragment>
        <Header as="h1" content="My Job Postings" />
        <Divider />
        {error ? (
          <CustomErrorMessage header="An error has occured" content={message} />
        ) : docs && docs.length > 0 ? (
          <React.Fragment>
            <Table striped celled>
              <EmployerTableHeader />
              <Table.Body>
                {docs.map(item => (
                  <Table.Row>
                    <Table.Cell>
                      <Header>
                        <Header.Content>
                          {properCaseTransform(item.title)}
                          <Header.Subheader>
                            {item.job_summary.substring(0, 50)}
                          </Header.Subheader>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell
                      negative={item.open ? false : true}
                      positive={item.open ? true : false}
                    >
                      {item.open === true ? 'open' : 'closed'}
                    </Table.Cell>
                    <Table.Cell>{dateDiffString(item.createdAt)}</Table.Cell>
                    <Table.Cell>
                      <Button
                        compact
                        size="tiny"
                        content="view applications"
                        color="violet"
                        onClick={() =>
                          this.handleNavigateApplications(item._id, item.title)
                        }
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        compact
                        size="tiny"
                        disabled={!item.open}
                        content="close this job"
                        color="red"
                        onClick={() =>
                          this.handleCloseJob({
                            job_id: item._id,
                            creator_id: auth.user._id,
                          })
                        }
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <Pagination
              activePage={job_list_employer.page}
              ellipsisItem={{
                content: <Icon name="ellipsis horizontal" />,
                icon: true,
              }}
              firstItem={{
                content: <Icon name="angle double left" />,
                icon: true,
              }}
              lastItem={{
                content: <Icon name="angle double right" />,
                icon: true,
              }}
              prevItem={{ content: <Icon name="angle left" />, icon: true }}
              nextItem={{ content: <Icon name="angle right" />, icon: true }}
              totalPages={job_list_employer.totalPages}
              onPageChange={this.handlePageChange}
            />
            <Modal
              open={jobUpdateStatus.error || jobUpdateStatus.flag}
              dimmer="blurring"
              onClose={this.handleCloseModal}
            >
              <Modal.Header>
                {jobUpdateStatus.error ? 'Error' : 'Success'}
              </Modal.Header>
              <Modal.Content>{jobUpdateStatus.message}</Modal.Content>
              <Modal.Actions>
                <Button onClick={this.handleCloseModal} color="green">
                  Confirm
                </Button>
              </Modal.Actions>
            </Modal>
          </React.Fragment>
        ) : docs && docs.length === 0 ? (
          <CustomNoResultsMessage
            header="No results"
            content="It looks like you have not posted any jobs so far."
          />
        ) : (
          <Segment stacked padded>
            <Placeholder>
              <Paragraph>
                <Line /> <Line /> <Line /> <Line /> <Line /> <Line />
                <Line /> <Line /> <Line /> <Line /> <Line /> <Line />
              </Paragraph>
            </Placeholder>
          </Segment>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    job_list_employer: state.jobListEmployer,
    jobUpdateStatus: state.jobUpdateStatus,
  }
}

const mapDispatchToProps = {
  propsgetJobListForEmployer: getJobListForEmployer,
  propsUpdateJobStatus: updateJobStatus,
  propsResetJobStatus: resetJobStatus,
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Employer)
