import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router';
import { Segment, Button, Header, Icon, Table, Pagination } from 'semantic-ui-react'
import { getJobListForEmployer } from '../../actions/job_list_employer';
import { queryStringToObjectParser, objectToQueryStringParser } from '../../helpers/query';
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

    componentDidMount() {
        // Check for query strings (placeholder)
        const { search } = this.props.location;
        let queryObject = queryStringToObjectParser(search)

        queryObject = { ...queryObject, creator_id: this.props.auth.user._id};
        this.props.propsgetJobListForEmployer(queryObject)
    }

    render() {

        const { job_list_employer } = this.props;
        const { error, data } = job_list_employer; 
        return (
            <Segment>
                <Header as="h1" content="Employer Board"/>
                {
                    job_list_employer && error ? 
                    'An error has occured'
                    : null
                }
                {
                    ( data.data && !error ) ? 
                    <React.Fragment>
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
                            data.data.docs.map(item => {
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
                <Pagination
                defaultActivePage={data.data.page}
                ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                prevItem={{ content: <Icon name='angle left' />, icon: true }}
                nextItem={{ content: <Icon name='angle right' />, icon: true }}
                totalPages={data.data.totalPages}
                onPageChange={this.handlePageChange}/>
                </React.Fragment>
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

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Employer);