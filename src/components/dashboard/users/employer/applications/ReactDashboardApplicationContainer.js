import React, { Component } from 'react'
import { queryStringToObjectParser } from '../../../../../helpers/query';
import { dateDiffString, properCaseTransform } from '../../../../../helpers/generic'
import { getApplicationEmployerList } from '../../../../../actions/application_list_employer'
import { connect } from 'react-redux';
import {compose} from 'redux'
import { withRouter } from 'react-router-dom'
import { Container, Segment, Modal, Label, Divider, Icon, Button, Table, Header } from 'semantic-ui-react';
import VerticallyPaddedContainer from '../../../../layout/VerticallyPaddedContainer';
class ReactDashboardApplicationContainer extends Component {

    state = {
        modalContent: {},
        modalShow: false,
    }

    componentDidMount() {
        const { search } = this.props.history.location;
        const object = queryStringToObjectParser(search)
        this.props.propsGetApplicationEmployerList(object)
    }

    handleModalContentChange = (modalContent) => {
        this.setState({ modalContent }, ()=> {
            this.setState({ modalShow: true })
        })
    }

    handleCloseModal = () => {
        this.setState({ modalShow: false })
    }

    render() {
        const { application_list_employer } = this.props;
        const { error, data } = application_list_employer;
        const { modalShow, modalContent } = this.state;
        return (
            <React.Fragment>
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
                                                        content={`${properCaseTransform(x.applicant_id.first_name)} ${properCaseTransform(x.applicant_id.last_name)}`} />
                                                    <Table.Cell>
                                                        { dateDiffString(x.createdAt)}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <Button 
                                                        compact 
                                                        onClick={()=>this.handleModalContentChange(x)}
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
            {
                Object.entries(modalContent).length > 0 ?
                <Modal
                    open={ modalShow }
                    dimmer="blurring"
                    onClose={this.handleCloseModal}>
                        <Modal.Header>
                            {`${properCaseTransform(modalContent.applicant_id.first_name)} ${ properCaseTransform(modalContent.applicant_id.last_name)}'s application`}
                        </Modal.Header>
                        <Modal.Content>
                            The current application status is <Label content={modalContent.status}/>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button
                            color='green'
                            content="I'm interested"
                            />
                            <Button
                            onClick={this.handleCloseModal} 
                            color='red'
                            content="I'm not interested"/>
                        </Modal.Actions>
                    </Modal>
                : null
            }
            </React.Fragment>
            
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