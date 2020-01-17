import React, { Component } from 'react'
import { queryStringToObjectParser } from '../../../../../helpers/query';
import { dateDiffString, properCaseTransform } from '../../../../../helpers/generic'
import { getApplicationEmployerList } from '../../../../../actions/application_list_employer'
import { updateApplicationStatus } from '../../../../../actions/application'
import { connect } from 'react-redux';
import {compose} from 'redux'
import { withRouter } from 'react-router-dom'
import { Container, Segment, Modal, Label, Divider, Icon, Button, Table, Header } from 'semantic-ui-react';
import VerticallyPaddedContainer from '../../../../layout/VerticallyPaddedContainer';
import ApplicationHeader from './ApplicationHeader';
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

    handleApplicationStatusChange = (status) => {
        const { modalContent } = this.state;
        const { job_id, applicant_id } = modalContent;
        const payload = {
            status,
            job_id,
            applicant_id: applicant_id._id
        }
        this.props.propsUpdateApplicationStatus(payload)
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
                    <Header as="h1" content={`Applications`}/>
        <p>Review and update statuses for your <Label size="tiny">{ properCaseTransform(this.props.history.location.state.jobTitle) }</Label> applications.</p>
                    <Divider/>
                    {
                        error ?
                        <Segment color="red" stacked >
                        <Header>An error occured</Header>
                        <p>{ application_list_employer.message }</p>
                        </Segment>
                        :
                        data.length > 0 ?
                            <Table celled striped>
                                <ApplicationHeader/>
                                <Table.Body>
                                    {
                                        data.map(x => {
                                        return (<Table.Row>
                                                    <Table.Cell content={`${properCaseTransform(x.applicant_id.first_name)} ${properCaseTransform(x.applicant_id.last_name)}`} />
                                                    <Table.Cell content={x.status}/>
                                                    <Table.Cell content={ dateDiffString(x.createdAt)}/>
                                                    <Table.Cell>
                                                        <Button 
                                                        compact 
                                                        onClick={()=>this.handleModalContentChange(x)}
                                                        color="violet">
                                                            <Icon name="eye"/>view application</Button>
                                                    </Table.Cell>
                                                </Table.Row>)})
                                    }
                                </Table.Body>
                            </Table>
                        : 
                        <Segment color="green" stacked padded>
                            There is currently no applications for this job.
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
                            <Header as="h3" content="Current status"/>
                            <Label content={modalContent.status}/>
                            <Header as="h3">Applicants message</Header>
                            <p>{modalContent.user_message ? modalContent.user_message : 'This applicant did not choose to a leave a message.'}</p>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button
                            color='green'
                            content="I'm interested"
                            onClick={()=> this.handleApplicationStatusChange('interested')}
                            />
                            <Button
                            onClick={()=> this.handleApplicationStatusChange('rejected')} 
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
    propsGetApplicationEmployerList: getApplicationEmployerList,
    propsUpdateApplicationStatus: updateApplicationStatus,
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(ReactDashboardApplicationContainer);