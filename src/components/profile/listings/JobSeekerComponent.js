import React, { Component } from 'react'
import { Header, Label, Segment, Divider, Button, Table} from 'semantic-ui-react';
import { connect } from 'react-redux';
import {getApplicationList} from '../../../actions/application_list' 
class JobSeekerComponent extends Component {

    componentDidMount() {
        console.log(this.props, 'SEEKER')
        const { applicant_id } = this.props;
        const query = {
            applicant_id
        }
        this.props.propsGetApplicationList(query)
    }

    render() {
        const { application_list } = this.props;
        const { data } = application_list;
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
                                    <Table.HeaderCell>Status</Table.HeaderCell>
                                    <Table.HeaderCell>Applied on</Table.HeaderCell>
                                    <Table.HeaderCell>Rating</Table.HeaderCell>
                                    <Table.HeaderCell>Action</Table.HeaderCell>
                                </Table.Row>
                                </Table.Header>

                            <Table.Body>
                                {
                                    data.map(item => {
                                        return (
                                        <Table.Row>
                                            <Table.Cell><Label color="green">{ item.status }</Label></Table.Cell>
                                            <Table.Cell>{ Date(item.createdAt) }</Table.Cell>
                                            <Table.Cell>{ item.rating }</Table.Cell>
                                            <Table.Cell><Button>Withdraw my application</Button></Table.Cell>
                                        </Table.Row>
                                        )
                                    })
                                }
                                
                            </Table.Body>
                        </Table>: 
                        'You have no job applications'
                    }
                </Segment>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    const { application_list } = state;
    return {
        application_list
    }
}

const mapDispatchToProps = {
    propsGetApplicationList: getApplicationList
}

export default connect(mapStateToProps, mapDispatchToProps)(JobSeekerComponent)
