import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  Header,
  Label,
  Modal,
  Segment,
  Icon,
  Divider,
  Button,
  Table,
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

class Seeker extends Component {
  componentDidMount() {
    const { data, error } = this.props.application_list
    this.props.propsGetApplicationList()
  }

  handleWithdrawApplication = payload => {
    const newPayload = { ...payload, status: 'withdrawn' }
    this.props.propsUpdateApplicationStatus(newPayload)
  }

  closeModal = () => {
    this.props.propsResetApplicationUpdate()
    this.props.history.push('/dashboard')
  }

  render() {
    const { application_list, application_update } = this.props
    const { data, message } = application_list
    const { flag, error } = application_update

    return (
      <React.Fragment>
        <Header as="h1" content="Your applications" />
        <Divider />
        {application_list.error ? (
          <Segment color="red" stacked>
            <Header as="h3" content="Error" />
            <p>{message}</p>
          </Segment>
        ) : data.length > 0 && !application_list.error ? (
          <Table striped celled>
            <SeekerTableHeader />
            <Table.Body>
              {data.map(item => {
                return (
                  <Table.Row>
                    <Table.Cell>
                      {properCaseTransform(item.job_id.title)}
                    </Table.Cell>
                    <Table.Cell>
                      <Label>{item.status}</Label>
                    </Table.Cell>
                    <Table.Cell>{dateDiffString(item.createdAt)}</Table.Cell>
                    <Table.Cell>
                      <Button
                        disabled={item.status === 'withdrawn' ? true : false}
                        compact
                        onClick={() =>
                          this.handleWithdrawApplication({
                            job_id: item.job_id._id,
                            applicant_id: item.applicant_id,
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
                        onClick={() =>
                          this.props.history.push({
                            pathname: '/view-job',
                            state: { job_id: item.job_id._id },
                          })
                        }
                      >
                        <Icon name="eye"></Icon>view job posting
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
        ) : (
          <Segment stacked padded>
            <p>You have no applications yet.</p>
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
