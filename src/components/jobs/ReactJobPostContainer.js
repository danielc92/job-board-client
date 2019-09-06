import React, { Component } from 'react';
import { Segment, Container, Header, Form, Message, Icon, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setMenuItem } from '../../actions/menu';
import { getSkills } from '../../actions/skills';
import { getBenefits } from '../../actions/benefit';
import { getCategories } from '../../actions/category';
import { createJob } from '../../actions/job'; 
import { Redirect } from 'react-router'

class ReactJobPostContainer extends Component {

    //Internal state holds information pertaining to the form
    state = {
        title: "",
        category: "",
        skills: [],
        benefits: [],
        company_summary: "",
        job_summary: "",
        contact_summary: "",
        salary_range_low: "",
        salary_range_high: ""
    }

    handleInputChange = (event) => {
        const { name, value } = event.target; 
        console.log(name, value)
        this.setState({ [name] : value })
    }

    handleDropdownChange = (event, data) => {
        const { name, value } = data;
        this.setState({ [name] : value })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const { 
            title, 
            category, 
            skills, 
            benefits, 
            company_summary, 
            job_summary, 
            contact_summary, 
            salary_range_high, 
            salary_range_low } = this.state;

        const payload = { 
            title, 
            category, 
            skills, 
            benefits, 
            company_summary, 
            job_summary, 
            contact_summary, 
            salary_range_high, 
            salary_range_low,
            creator_id: this.props.auth.user._id }

        this.props.propsCreateJob(payload)

    }

    componentDidMount () {
        this.props.propsSetMenuItem('create')
        this.props.propsGetSkills()
        this.props.propsGetCategories()
        this.props.propsGetBenefits()
        
    }
    
    render() {

        const  { 
            auth,
            benefit,
            category,
            job,
            skill } = this.props;

        return (
            <Container>
                <Segment style={{ padding: '7rem 0', border: 'none', boxShadow: 'none', margin: 'none'}}>
                    <Header as="h1">Post a job</Header>
                    <Divider></Divider>
                    
                    {
                        auth.isAuthenticated ?
                        (
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Input
                                    onChange={this.handleInputChange}
                                    name="title"
                                    placeholder="Zoo keeper"
                                    label="Job Title"/>

                                <Form.Dropdown
                                    onChange={this.handleDropdownChange}
                                    name="category"
                                    label="Category"
                                    placeholder="Select category"
                                    fluid
                                    selection
                                    search
                                    options={category.data}
                                />
                                
                                <Form.Dropdown 
                                    onChange={this.handleDropdownChange}
                                    name="skills"
                                    label="Skills"
                                    placeholder='Add skills'
                                    multiple
                                    search
                                    selection
                                    options={skill.data}
                                    ></Form.Dropdown>

                                <Form.Dropdown 
                                    onChange={this.handleDropdownChange}
                                    name="benefits"
                                    label="Benefits"
                                    placeholder='Add benefits'
                                    multiple
                                    search
                                    selection
                                    options={benefit.data}
                                    ></Form.Dropdown>

                                <Form.TextArea
                                    onChange={this.handleInputChange}
                                    name="company_summary"
                                    maxlength="500"
                                    placeholder="A short description about the company"
                                    label="About the company"/>

                                <Form.TextArea 
                                    onChange={this.handleInputChange}
                                    name="job_summary"
                                    maxlength="500"
                                    placeholder="A short description about the job"
                                    label="About the job"/>

                                <Form.TextArea
                                    onChange={this.handleInputChange}
                                    name="contact_summary"
                                    maxlength="500"
                                    placeholder="Enter any contact details..."
                                    label="Contact details"/>           

                                <Form.Group>
                                    <Form.Input 
                                    onChange={this.handleInputChange}
                                    name="salary_range_low"
                                    type="number"
                                    label="Minimum salary ($)"/>

                                    <Form.Input 
                                    onChange={this.handleInputChange}
                                    name="salary_range_high"
                                    type="number"
                                    label="Maximum salary ($)"/>
                                </Form.Group>
                                
                                <Form.Button 
                                size="big"
                                color="green">
                                    <Icon name="add square"></Icon>Create job
                                </Form.Button>

                                <Message
                                    error
                                    visible={job.error}
                                    header="Error"
                                    content="An error has occured, job posting failed">
                                </Message>

                                <Message
                                    success
                                    visible={Object.entries(job.data).length > 0}
                                    header="Success"
                                    content="Your job has been posted.">
                                </Message>
                            </Form>
                        )
                        :
                        (
                            <Message 
                            warning
                            header="Authentication required"
                            content="We know you would love to get your job posted on our platform. However, you must be logged in to do so."
                            >
                            </Message>
                        )
                    }
                </Segment>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        benefit: state.benefit,
        category: state.category,
        job: state.job,
        skill: state.skill
    }
}

const mapActionsToProps = {
    propsSetMenuItem: setMenuItem,
    propsGetSkills: getSkills,
    propsGetBenefits: getBenefits,
    propsGetCategories: getCategories,
    propsCreateJob: createJob
}

export default connect(mapStateToProps, mapActionsToProps)(ReactJobPostContainer)