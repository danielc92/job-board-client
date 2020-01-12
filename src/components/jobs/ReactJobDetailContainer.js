import React, { Component } from 'react';
import { Segment, Message, TextArea, Header, Modal, Container,Button, Label, Form } from 'semantic-ui-react';
import VerticallyPaddedContainer from '../layout/VerticallyPaddedContainer';
import { queryStringToObjectParser } from '../../helpers/query';
import { getJob } from '../../actions/job';
import { setMenuItem } from '../../actions/menu';
import { createApplication, resetApplication } from '../../actions/application';
import { connect } from 'react-redux';
import { properCaseTransform } from '../../helpers/generic';

class ReactJobDetailContainer extends Component {

    state = {
        user_message: ""
    }

    componentDidMount() {
        const query = queryStringToObjectParser(this.props.location.search)
        this.props.propsGetJob(query.id)
        this.props.propsSetMenuItem('find');
    }

    applyForJob = () => {
        const { user_message } = this.state;

        let payload = {
            job_id: this.props.jobDetails[0]._id,
            applicant_id: this.props.auth.user._id,
        }

        if (user_message.length > 0) {
            payload = { ...payload, user_message }
        }
        this.props.propsCreateApplication(payload);
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        // Validate message

        // Set message
        this.setState({ [name]: value })
    }

    closeModal = () => {
        this.props.propsResetApplication();
    }

    render() {
        const query = queryStringToObjectParser(this.props.location.search)
        const jobSearch = this.props.jobDetails.filter(item => item._id === query.id)
        const jobDetails = jobSearch.length > 0 ? jobSearch[0] : null;
        const { user_message } = this.state;
        const { error, flag, message } = this.props.application; 
        return (
            <Segment basic>
                <Container>
                    <VerticallyPaddedContainer size="3">
                        {
                            jobDetails ?
                            <React.Fragment> 
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

                            </Segment>
                            {/* If the job is open allow user to apply */}
                            {
                                !jobDetails.open ? 
                                <Segment
                                    stacked
                                    color="orange">
                                    <Header>
                                        Job Unavailable
                                    </Header>
                                    <p>The member who posted this job, has closed it off and is no longer accepting applications.</p>
                                </Segment>
                                :
                                <Segment
                                stacked
                                color="violet">
                                    <Header content="Start your application here." as="h1"/>
                                    <Form>
                                        <Form.Field>
                                            <Form.TextArea
                                            value={ user_message}
                                            onChange={this.handleInputChange}
                                            name="user_message"
                                            placeholder="Some words about why you're suitable for this job."
                                            label={`Enter a message for the employer (${500 - user_message.length} remaining).`} />
                                        </Form.Field>
                                        <Form.Field>
                                            <Form.Button
                                            onClick={this.applyForJob}
                                            content="Apply for this job"
                                            color="violet" 
                                            />
                                        </Form.Field>
                                    </Form>
                                    
                                </Segment>
                            }
                            
                            
                            <Modal
                            open={ error || flag }
                            dimmer="blurring"
                            onClose={this.closeModal}>
                                <Modal.Header
                                    content={ error ? 'Error' : 'Success'}
                                />
                                <Modal.Content
                                    content={ message }
                                />
                                <Modal.Actions>
                                    <Button
                                    onClick={this.closeModal} 
                                    color={ error ? 'red' : 'green'}>
                                        Confirm
                                    </Button>
                                </Modal.Actions>
                            </Modal>
                            </React.Fragment>: 
                            <Segment>Job not found.</Segment>
                            }
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
