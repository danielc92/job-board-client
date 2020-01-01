import React, { Component } from 'react';
import { Segment, Header, Container,Button, Label } from 'semantic-ui-react';
import VerticallyPaddedContainer from '../layout/VerticallyPaddedContainer';
import { queryStringToObjectParser } from '../../helpers/query';
import { getJob } from '../../actions/job';
import { connect } from 'react-redux';
import { properCaseTransform } from '../../helpers/generic';

class ReactJobDetailContainer extends Component {
    componentDidMount() {
        const query = queryStringToObjectParser(this.props.location.search)
        this.props.propsGetJob(query.id)
    }
    render() {
        const query = queryStringToObjectParser(this.props.location.search)
        const jobSearch = this.props.jobDetails.filter(item => item._id === query.id)
        const jobDetails = jobSearch.length > 0 ? jobSearch[0] : null;
        return (
            <Segment basic>
                <Container>
                    <VerticallyPaddedContainer size="3">
                        {
                            jobDetails ? 
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

                                <Button
                                size="big" color="violet">Apply</Button>
                            </Segment>: 
                            <Segment>Job not found.</Segment>}
                    </VerticallyPaddedContainer>
                </Container>
               
            </Segment>
        )
    }
}

const mapStateToProps = state => {
    const { jobDetails } = state; 
    return {
        jobDetails
    }
}

const mapDispatchToProps = {
    propsGetJob: getJob
}


export default connect(mapStateToProps, mapDispatchToProps)(ReactJobDetailContainer);
