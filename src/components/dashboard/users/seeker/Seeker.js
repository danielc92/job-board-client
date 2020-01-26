import React, { Component } from 'react'
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
import { getApplicationList } from '../../../../actions/application_list'
import {
  updateApplicationStatus,
  resetApplicationUpdate,
} from '../../../../actions/application'
import {
  dateDiffString,
  properCaseTransform,
} from '../../../../helpers/generic'
import SeekerTableHeader from './SeekerTableHeader'
import CustomErrorMessage from '../../../placeholder/CustomErrorMessage'
import CustomNoResultsMessage from '../../../placeholder/CustomNoResultsMessage'
const { Line, Paragraph } = Placeholder

class Seeker extends Component {
  componentDidMount() {
    this.props.propsGetApplicationList({})
  }

  handleWithdrawApplication = payload => {
    const newPayload = { ...payload, status: 'withdrawn' }
    this.props.propsUpdateApplicationStatus(newPayload)
  }

  closeModal = () => {
    this.props.propsResetApplicationUpdate()
    this.props.history.push('/dashboard')
  }

  handleViewJobPosting = job_id => {
    this.props.history.push({
      pathname: '/job',
      state: { job_id },
    })
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
        this.props.propsGetApplicationList({
          page: history.location.state.page,
        })
      }
    }
  }

  handlePageChange = (e, data) => {
    this.props.history.push({
      pathname: '/dashboard',
      state: { page: data.activePage },
    })
  }

  render() {
    const { application_list, application_update } = this.props
    const { docs, message } = application_list
    const { flag, error } = application_update

    return (
      <React.Fragment>
        <Header as="h1" content="Your applications" />
        <Divider />
        {application_list.error ? (
          <CustomErrorMessage header="An error occured" content={message} />
        ) : docs && docs.length > 0 ? (
          <React.Fragment>
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
                        <Button
                          disabled={status === 'withdrawn' ? true : false}
                          compact
                          onClick={() =>
                            this.handleWithdrawApplication({
                              job_id: job_id._id,
                            })
                          }
                          size="small"
                          color="red"
                        >
                          <Icon name="window close" />
                          withdraw application
                        </Button>
                      </Table.Cell>
                      <Table.Cell>
                        <Button
                          compact
                          color="green"
                          onClick={() => this.handleViewJobPosting(job_id._id)}
                        >
                          <Icon name="eye"></Icon>view job posting
                        </Button>
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
          </React.Fragment>
        ) : docs && docs.length === 0 ? (
          <CustomNoResultsMessage
            header="No results"
            content="Try applying for some jobs to view your applications."
          />
        ) : (
          <Segment>
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
      </React.Fragment>
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
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Seeker)
