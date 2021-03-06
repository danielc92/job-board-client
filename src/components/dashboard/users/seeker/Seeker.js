import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router'
import {
  Header,
  Label,
  Modal,
  Pagination,
  Segment,
  Icon,
  Divider,
  Button,
  Table,
  Placeholder,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { getApplicationList } from 'actions/application_list'
import {
  updateApplicationStatus,
  resetApplicationUpdate,
} from 'actions/application'
import { dateDiffString, properCaseTransform } from 'helpers/generic'
import SeekerTableHeader from './SeekerTableHeader'
import CustomErrorMessage from '../../../reusable/CustomErrorMessage'
import CustomNoResultsMessage from '../../../reusable/CustomNoResultsMessage'
import { checkTokenIsValid } from 'helpers/auth'
import { logoutUser } from 'actions/account/auth'
import { SESSION_EXPIRED_MESSAGE } from 'app_constants'
import {
  queryStringToObjectParser,
  objectToQueryStringParser,
} from 'helpers/query'

const { Line, Paragraph } = Placeholder

class Seeker extends Component {
  componentDidMount() {
    const object = queryStringToObjectParser(this.props.history.location.search)
    this.props.propsGetApplicationList(object)
  }

  handleWithdrawApplication = payload => {
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
    const newPayload = { ...payload, status: 'withdrawn' }
    this.props.propsUpdateApplicationStatus(newPayload)
  }

  closeModal = () => {
    this.props.propsResetApplicationUpdate()
    this.props.history.push('/dashboard')
  }

  handleViewJobPosting = slug => {
    this.props.history.push({
      pathname: `/job-detail/${slug}`,
    })
  }

  componentWillReceiveProps() {
    // If the page has changed in router props call new data from api
    const { history, location, propsGetApplicationList } = this.props
    if (history && history.location.search !== location.search) {
      const object = queryStringToObjectParser(history.location.search)
      propsGetApplicationList(object)
    }
  }

  handlePageChange = (e, data) => {
    const query = this.props.history.location.search
    let object = query ? queryStringToObjectParser(query) : {}
    object.page = data.activePage
    const newQuery = objectToQueryStringParser(object)

    this.props.history.push({
      pathname: '/dashboard',
      search: newQuery,
    })
  }

  render() {
    const { application_list, application_update } = this.props
    const { docs, message } = application_list
    const { flag, error } = application_update

    return (
      <Fragment>
        <Header as="h1" content="Your applications" />
        <Divider />
        {application_list.error ? (
          <CustomErrorMessage header="An error occured" content={message} />
        ) : docs && docs.length > 0 ? (
          <Fragment>
            <Table striped celled>
              <SeekerTableHeader />
              <Table.Body>
                {docs.map(item => {
                  const { job_id, status, createdAt } = item
                  return (
                    <Table.Row>
                      <Table.Cell>
                        {properCaseTransform(item.job_id.title)}
                      </Table.Cell>
                      <Table.Cell>
                        <Label>{status}</Label>
                      </Table.Cell>
                      <Table.Cell>{dateDiffString(createdAt)}</Table.Cell>
                      <Table.Cell>
                        <Button.Group size="tiny">
                          <Button
                            disabled={status !== 'pending' ? true : false}
                            onClick={() =>
                              this.handleWithdrawApplication({
                                job_id: job_id._id,
                              })
                            }
                            color="red"
                            content="Withdraw"
                          />
                          <Button.Or />
                          <Button
                            content="View job"
                            color="green"
                            onClick={() =>
                              this.handleViewJobPosting(job_id.slug)
                            }
                          />
                        </Button.Group>
                      </Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table>
            <Pagination
              activePage={application_list.page}
              firstItem={{
                content: <Icon name="angle double left" />,
                icon: true,
              }}
              lastItem={{
                content: <Icon name="angle double right" />,
                icon: true,
              }}
              prevItem={{
                content: <Icon name="angle left" />,
                icon: true,
              }}
              nextItem={{
                content: <Icon name="angle right" />,
                icon: true,
              }}
              totalPages={application_list.totalPages}
              onPageChange={this.handlePageChange}
            />
          </Fragment>
        ) : docs && docs.length === 0 ? (
          <CustomNoResultsMessage
            header="No results"
            content="Try applying for some jobs to view your applications."
          />
        ) : (
          <Segment padded stacked>
            <Placeholder fluid>
              <Paragraph>
                <Line /> <Line /> <Line /> <Line /> <Line /> <Line />
                <Line /> <Line /> <Line /> <Line /> <Line /> <Line />
              </Paragraph>
            </Placeholder>
          </Segment>
        )}
        <Modal
          open={flag && !error}
          dimmer="blurring"
          onClose={this.closeModal}
        >
          <Modal.Header>Success</Modal.Header>
          <Modal.Content>You have withdrawn from this job.</Modal.Content>
          <Modal.Actions>
            <Button onClick={this.closeModal} color="green">
              Confirm
            </Button>
          </Modal.Actions>
        </Modal>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { application_list, application_update, auth } = state
  return {
    application_list,
    application_update,
    auth,
  }
}

const mapDispatchToProps = {
  propsGetApplicationList: getApplicationList,
  propsUpdateApplicationStatus: updateApplicationStatus,
  propsResetApplicationUpdate: resetApplicationUpdate,
  propsLogoutUser: logoutUser,
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Seeker)
