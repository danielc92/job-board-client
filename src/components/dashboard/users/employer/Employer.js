import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router'
import { logoutUser } from 'actions/account/auth'
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
import { getJobListForEmployer } from 'actions/job_list_employer'
import { resetJobStatus, updateJobStatus } from 'actions/job_status_update'
import { properCaseTransform } from 'helpers/generic'
import EmployerTableHeader from './EmployerTableHeader'
import { dateDiffString } from 'helpers/generic'
import CustomErrorMessage from '../../../reusable/CustomErrorMessage'
import CustomNoResultsMessage from '../../../reusable/CustomNoResultsMessage'
import { checkTokenIsValid } from 'helpers/auth'
import { SESSION_EXPIRED_MESSAGE } from 'app_constants'
import {
  queryStringToObjectParser,
  objectToQueryStringParser,
} from 'helpers/query'
const { Line, Paragraph } = Placeholder

class Employer extends Component {
  componentDidMount() {
    const object = queryStringToObjectParser(this.props.history.location.search)
    this.props.propsGetJobListForEmployer(object)
  }

  componentWillReceiveProps() {
    // If the page has changed in router props call new data from api
    const { history, location, propsGetJobListForEmployer } = this.props
    if (history && history.location.search !== location.search) {
      const object = queryStringToObjectParser(history.location.search)
      propsGetJobListForEmployer(object)
    }
  }

  handlePageChange = (event, data) => {
    const query = this.props.history.location.search
    let object = query ? queryStringToObjectParser(query) : {}
    object.page = data.activePage
    const newQuery = objectToQueryStringParser(object)

    this.props.history.push({
      pathname: '/dashboard',
      search: newQuery,
    })
  }

  handleCloseJob = payload => {
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
    this.props.propsUpdateJobStatus(payload)
  }

  handleCloseModal = () => {
    const { propsResetJobStatus, history } = this.props
    propsResetJobStatus()
    this.props.propsGetJobListForEmployer({
      page: history.location.state.page,
    })
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
      <Fragment>
        <Header as="h1" content="My Job Postings" />
        <Divider />
        {error ? (
          <CustomErrorMessage header="An error has occured" content={message} />
        ) : docs && docs.length > 0 ? (
          <Fragment>
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
                      <Button.Group size="tiny">
                        <Button
                          content="View applications"
                          color="green"
                          onClick={() =>
                            this.handleNavigateApplications(
                              item._id,
                              item.title
                            )
                          }
                        />
                        <Button.Or />
                        <Button
                          disabled={!item.open}
                          content="Close job"
                          color="red"
                          onClick={() =>
                            this.handleCloseJob({
                              job_id: item._id,
                              creator_id: auth.user._id,
                            })
                          }
                        />
                      </Button.Group>
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
          </Fragment>
        ) : docs && docs.length === 0 ? (
          <CustomNoResultsMessage
            header="No results"
            content="It looks like you have not posted any jobs so far."
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
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { auth, job_list_employer, jobUpdateStatus } = state
  return {
    auth,
    job_list_employer,
    jobUpdateStatus,
  }
}

const mapDispatchToProps = {
  propsGetJobListForEmployer: getJobListForEmployer,
  propsUpdateJobStatus: updateJobStatus,
  propsResetJobStatus: resetJobStatus,
  propsLogoutUser: logoutUser,
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Employer)
