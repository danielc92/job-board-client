import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router';
import { Divider, Modal, Button, Label, Header, Icon, Table, Pagination } from 'semantic-ui-react'
import { getJobListForEmployer } from '../../../../actions/job_list_employer';
import { resetJobStatus, updateJobStatus } from '../../../../actions/job_status_update';
import { properCaseTransform } from '../../../../helpers/generic';
import { queryStringToObjectParser, objectToQueryStringParser } from '../../../../helpers/query';
import EmployerTableHeader from './EmployerTableHeader';
import { dateDiffString } from '../../../../helpers/generic';
class Employer extends Component {


    handlePageChange = (event, data) => {
        const { location, history } = this.props;
        const { activePage } = data;
       
        let currentQueryString = location.search; 
        let queryObject = queryStringToObjectParser(currentQueryString);
        queryObject = { ...queryObject, page: activePage, creator_id: this.props.auth.user._id }
        const search = objectToQueryStringParser(queryObject);
        history.push({
            pathname: '/dashboard',
            search,
        })
    }

    handleCloseJob =(payload) => {
        this.props.propsUpdateJobStatus(payload)
    }

    handleCloseModal = () => {
        const { propsResetJobStatus } = this.props;
        propsResetJobStatus()
        this.getJobListForEmployer()
    }

    componentDidMount() {
        // Check for query strings (placeholder)
        this.getJobListForEmployer()
    }

    getJobListForEmployer = () => {
        const { search } = this.props.location;
        let queryObject = queryStringToObjectParser(search)
        queryObject = { ...queryObject, creator_id: this.props.auth.user._id};
        this.props.propsgetJobListForEmployer(queryObject)
    }

    handleNavigateApplications = (id) => {
        console.log(id)
    }

    render() {

        const { job_list_employer, auth, jobUpdateStatus } = this.props;
        const { error, data } = job_list_employer; 
        return (
            <React.Fragment>
            <Header as="h1" content="My Job Postings"/>
            <Divider/>
                {
                    job_list_employer && error ? 
                    'An error has occured'
                    : null
                }
                {
                    ( data.data && !error && !auth.user.is_employer ) ? 
                    <p>You are a job seeker!</p>
                    : null
                }
                {
                    ( data.data && !error && auth.user.is_employer ) ? 
                    <React.Fragment>
                    <Table striped celled>
                    <EmployerTableHeader/>
                    <Table.Body>
                        {
                            data.data.docs.map(item => {
                                return (
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header>
                                                <Header.Content>
                                                    {properCaseTransform(item.title)}
                                                    <Header.Subheader>{ item.job_summary.substring(0, 50) }</Header.Subheader>
                                                </Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell 
                                        negative={ item.open ? false: true }
                                        positive={ item.open ? true: false }>
                                            { 
                                                item.open === true ? 
                                                "open": 
                                                "closed"
                                            }
                                        </Table.Cell>
                                        <Table.Cell>
                                            {dateDiffString(item.createdAt)}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Button compact content="view applications" color="violet" onClick={()=>this.handleNavigateApplications(item._id)}/>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Button compact disabled={!item.open} content="close this job" color="red" onClick={()=>this.handleCloseJob({ job_id: item._id, creator_id: auth.user._id})}/>
                                        </Table.Cell>
                           
                                    </Table.Row>
                                ) 
                            })
                        }
                        
                    </Table.Body>
                </Table>
                <Pagination
                defaultActivePage={data.data.page}
                ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                prevItem={{ content: <Icon name='angle left' />, icon: true }}
                nextItem={{ content: <Icon name='angle right' />, icon: true }}
                totalPages={data.data.totalPages}
                onPageChange={this.handlePageChange}/>
                <Modal
                    open={ jobUpdateStatus.error || jobUpdateStatus.flag }
                    dimmer="blurring"
                    onClose={this.handleCloseModal}>
                        <Modal.Header>
                            { jobUpdateStatus.error ? 'Error' : 'Success'}
                        </Modal.Header>
                        <Modal.Content>
                            { jobUpdateStatus.message }
                        </Modal.Content>
                        <Modal.Actions>
                            <Button
                            onClick={this.handleCloseModal} 
                            color='green'>
                                Confirm
                            </Button>
                        </Modal.Actions>
                    </Modal>
                </React.Fragment>
                    : null
                }
        </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
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
)(Employer);