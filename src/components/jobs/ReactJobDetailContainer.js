import React, { Component } from 'react';
import { Segment, Message, Header, Modal, Container,Button, Label } from 'semantic-ui-react';
import VerticallyPaddedContainer from '../layout/VerticallyPaddedContainer';
import { queryStringToObjectParser } from '../../helpers/query';
import { getJob } from '../../actions/job';
import { setMenuItem } from '../../actions/menu';
import { createApplication, resetApplication } from '../../actions/application';
import { connect } from 'react-redux';
import { properCaseTransform } from '../../helpers/generic';

class ReactJobDetailContainer extends Component {
    componentDidMount() {
        const query = queryStringToObjectParser(this.props.location.search)
        this.props.propsGetJob(query.id)
        this.props.propsSetMenuItem('find');
    }

    applyForJob = () => {
        const payload = {
            job_id: this.props.jobDetails[0]._id,
            applicant_id: this.props.auth.user._id,
        }
        this.props.propsCreateApplication(payload);
    }

    closeModal = () => {
        this.props.propsResetApplication();
    }
    render() {
        const query = queryStringToObjectParser(this.props.location.search)
        const jobSearch = this.props.jobDetails.filter(item => item._id === query.id)
        const jobDetails = jobSearch.length > 0 ? jobSearch[0] : null;
        const { error, flag } = this.props.application; 
        return (
            <Segment basic>
                <Container>
                    <VerticallyPaddedContainer size="3">
                        {
                            jobDetails ? 
                            <React.Fragment>
                            <Modal
                            open={ !error && flag }
                            dimmer="blurring"
                            onClose={this.closeModal}>
                                <Modal.Header>Success
                                </Modal.Header>
                                <Modal.Content>
                                    {`Your application for ${properCaseTransform(jobDetails.title)} was successful.`}
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button
                                    onClick={this.closeModal} 
                                    color='green'>
                                        Confirm
                                    </Button>
                                </Modal.Actions>
                            </Modal>

                            

                            <Segment color="green" padded stacked>
                                 
                                <Header as="h1">{properCaseTransform(jobDetails.title)}<Label color='green' tertiary>{jobDetails.category}</Label></Header>
                                <Header.Subheader> { jobDetails.location_string }</Header.Subheader>
                                
                                <Header>About the job</Header>
                                <p>{jobDetails.job_summary}</p>

                                <Header>Salary</Header>
                                <Label color="green" basic size="large">${ jobDetails.salary_range_low} - ${ jobDetails.salary_range_high }</Label>
                                
                                <Header>Skills</Header>
                                <Label.Group>
                                { jobDetails.skills.map(item => <Label basic color="green">{item}</Label>)}
                                </Label.Group>
                                
                                
                                <Header>Benefits</Header>
                                <Label.Group>
                                { jobDetails.benefits.map(item => <Label basic color="green">{item}</Label>)}
                                </Label.Group>

                                <Header>About the company</Header>
                                <p>{ jobDetails.company_summary }</p>
                                <Header>Contact Summary</Header>
                                <p>{ jobDetails.contact_summary }</p>

                                
                                {
                                    !jobDetails.open ? 
                                    <Message  
                                        warning
                                        header="Job Closed"
                                        content="This job has been closed and is no longer accepting applications."/>: 
                                    <Button
                                        disabled={!jobDetails.open}
                                        onClick={this.applyForJob}
                                        size="big" 
                                        color="violet"
                                        content="Apply"/>
                                }
                            </Segment>
                            </React.Fragment>: 
                            <Segment>Job not found.</Segment>}
                    </VerticallyPaddedContainer>
                </Container>

               
               
            </Segment>
        )
    }
}

const mapStateToProps = state => {
    const { jobDetails, auth, application } = state; 
    return {
        jobDetails,
        application,
        auth
    }
}

const mapDispatchToProps = {
    propsGetJob: getJob,
    propsSetMenuItem: setMenuItem,
    propsCreateApplication: createApplication,
    propsResetApplication: resetApplication,
}


export default connect(mapStateToProps, mapDispatchToProps)(ReactJobDetailContainer);
