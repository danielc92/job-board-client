import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Button, Header, Table } from 'semantic-ui-react'
import { getJobListForEmployer } from '../../actions/job_list_employer';

class Employer extends Component {

    componentDidMount() {
        const { _id } = this.props.auth.user;
        this.props.propsgetJobListForEmployer({ creator_id: _id })
    }

    render() {

        const { job_list_employer } = this.props;
        const { error } = job_list_employer; 
        console.log(job_list_employer)
        return (
            <Segment>
                <Header as="h1" content="Employer Board"/>
                {
                    job_list_employer && error ? 
                    'An error has occured'
                    : null
                }
                {
                    ( job_list_employer.data.data && !error ) ? 
                    <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                id
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Title
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Summary
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Delete
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            job_list_employer.data.data.docs.map(item => {
                                return (
                                    <Table.Row>
                                        <Table.Cell>
                                            {item._id}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {item.title}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {item.job_summary.substring(0, 50)}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Button content="delete job posting" color="red"/>
                                        </Table.Cell>
                           
                                    </Table.Row>
                                ) 
                            })
                        }
                        
                    </Table.Body>
                </Table>
                    : null
                }
               
            </Segment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        job_list_employer: state.jobListEmployer,
    }
}

const mapDispatchToProps = {
    propsgetJobListForEmployer: getJobListForEmployer

}

export default connect(mapStateToProps, mapDispatchToProps)(Employer);
