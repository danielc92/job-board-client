import React, { Component } from 'react'
import { queryStringToObjectParser } from '../../../../../helpers/query';
import { getApplicationEmployerList } from '../../../../../actions/application_list_employer'
import { connect } from 'react-redux';
import {compose} from 'redux'
import { withRouter } from 'react-router-dom'
import { Container, Segment, Divider, Icon, Button, Table, Header } from 'semantic-ui-react';
import VerticallyPaddedContainer from '../../../../layout/VerticallyPaddedContainer';
class ReactDashboardApplicationContainer extends Component {

    componentDidMount() {
        const { search } = this.props.history.location;
        const object = queryStringToObjectParser(search)
        this.props.propsGetApplicationEmployerList(object)
    }

    render() {
        const { application_list_employer } = this.props;
        const { error, data } = application_list_employer;
        return (
            <Segment basic>
                <Container>
                    <VerticallyPaddedContainer size="4">
                    <Header as="h1" content="Applications for this job"/>
                    <Divider/>
                    {
                        error ?
                        <Segment color="red" stacked >
                        <Header>An error occured</Header>
                        <p>{ application_list_employer.message }</p>
                        </Segment>
                        :
                        <Segment color="green" stacked>
                            <Table celled striped>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell content="Name"/>
                                        <Table.HeaderCell content="Applied"/>
                                        <Table.HeaderCell content="Action"/>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {
                                        data.map(x => {
                                            return (
                                                <Table.Row>
                                                    <Table.Cell 
                                                        content={`${x.applicant_id.first_name} ${x.applicant_id.last_name}`} />
                                                    <Table.Cell>
                                                        {x.createdAt}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <Button 
                                                        compact 
                                                        color="violet">
                                                            <Icon name="eye"/>view application</Button>
                                                    </Table.Cell>
                                                </Table.Row>
                                            )
                                        })
                                    }
                                </Table.Body>
                            </Table>
                        </Segment>
                    }
                    
                    </VerticallyPaddedContainer>
                    
                </Container>
            </Segment>
        )
    }
}

const mapStateToProps = (state) => {
    const { application_list_employer } = state;
    return {
        application_list_employer
    }
}
const mapDispatchToProps = {
    propsGetApplicationEmployerList: getApplicationEmployerList
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(ReactDashboardApplicationContainer);