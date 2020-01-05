import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Header, Label, Modal, Segment, Icon, Divider, Button, Table} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getApplicationList } from '../../../actions/application_list';
import { updateApplicationStatus, resetApplicationUpdate } from '../../../actions/application';
import { dateDiffString } from '../../../helpers/generic';
class JobSeekerComponent extends Component {

    componentDidMount() {
        const { applicant_id } = this.props;
        const query = {
            applicant_id
        }
        this.props.propsGetApplicationList(query)
    }

    handleWithdrawApplication = (payload) => {
        const newPayload = { ...payload, status: 'withdrawn' }
        this.props.propsUpdateApplicationStatus(newPayload)
    }

    closeModal =() => {
        this.props.propsResetApplicationUpdate()
        this.props.history.push('/profile')
    }

    render() {
        const { application_list, application_update } = this.props;
        const { data } = application_list;
        const { flag, error } = application_update;

        return (
            <React.Fragment>
                <Header as="h1" content="Your applications"/>
                <Divider/>
                <Segment stacked padded>
                    { 
                        data.length > 0 ? 
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Title</Table.HeaderCell>
                                    <Table.HeaderCell>Status</Table.HeaderCell>
                                    <Table.HeaderCell>Applied</Table.HeaderCell>
                                    <Table.HeaderCell>Withdraw</Table.HeaderCell>
                                    <Table.HeaderCell>View</Table.HeaderCell>
                                </Table.Row>
                                </Table.Header>

                            <Table.Body>
                                {
                                    data.map(item => {
                                        return (
                                        <Table.Row>
                                            <Table.Cell>{ item.job_id.title }</Table.Cell>
                                            <Table.Cell><Label>{ item.status }</Label></Table.Cell>
                                            <Table.Cell>{ dateDiffString(item.createdAt) }</Table.Cell>
                                            <Table.Cell>
                                            { item.status !== 'withdrawn' ? 
                                                <Button 
                                                onClick={()=>this.handleWithdrawApplication({ 
                                                    job_id: item.job_id._id, 
                                                    applicant_id: item.applicant_id,})}
                                                size="small" 
                                                color="red">
                                                    <Icon name="window close"/>withdraw application</Button>
                                            : null}
                                            
                                            </Table.Cell>
                                            <Table.Cell>
                                            <Button color="green" onClick={()=>this.props.history.push({
                                                pathname: '/view-job',
                                                search: `?id=${item.job_id._id}`,
                                            })}><Icon name="eye"></Icon>view job posting</Button>
                                            </Table.Cell>
                                        </Table.Row>
                                        )
                                    })
                                }
                                
                            </Table.Body>
                        </Table>: 
                        'You have no job applications'
                    }
                </Segment>
                <Modal
                open={ flag && !error}
                dimmer="blurring"
                onClose={this.closeModal}>
                    <Modal.Header>Success
                    </Modal.Header>
                    <Modal.Content>
                        You have withdrawn from this job.
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                        onClick={this.closeModal} 
                        color='green'>
                            Confirm
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    const { application_list, application_update } = state;
    return {
        application_list,
        application_update,
    }
}

const mapDispatchToProps = {
    propsGetApplicationList: getApplicationList,
    propsUpdateApplicationStatus: updateApplicationStatus,
    propsResetApplicationUpdate: resetApplicationUpdate
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(JobSeekerComponent);