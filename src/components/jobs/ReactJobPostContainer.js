import React, { Component } from 'react';
import { Segment, Container, Header, Form, Message, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setMenuItem } from '../../actions/menu';

class ReactJobPostContainer extends Component {

    state = {
        title: "",
        category: "",
        skills: [],
        benefits: [],
        company_summary: "",
        job_summary: "",
        contact_summary: "",
        salary_range_low: "",
        salary_range_high: "",

        // These are temporary until API is wired up into redux.
        categoryOptions: [
            {key: 'ACC001', text: 'accounting and finance', value: 'ACC001'},
            {key: 'ENG001', text: 'engineering', value: 'ENG001'},
            {key: 'HOSP001', text: 'hospitality', value: 'HOSP001'}
        ],
        skillOptions: [
            {key: 'TEA001', text: 'teamwork', value: 'TEA001'},
            {key: 'c', text: 'running', value: 'c'},
            {key: 'd', text: 'rowing', value: 'd'},
            {key: 'e', text: 'communication', value: 'e'},
            {key: 'f', text: 'negotiation', value: 'f'},
            {key: 'g', text: 'finance', value: 'g'}
        ],
        benefitOptions: [
            {key: 'a', value: 'a', text: 'sick leave'},
            {key: 'b', value: 'b', text: 'paternal leave'},
            {key: 'c', value: 'c', text: 'flexible hours'}
        ]
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
        console.log('Processing form')
    }

    componentDidMount () {
        this.props.propsSetMenuItem('create')
    }
    
    render() {
        const  { benefitOptions, categoryOptions, skillOptions } = this.state;
        return (
            <Container>
                <Segment style={{ padding: '7rem 0', border: 'none', boxShadow: 'none', margin: 'none'}}>
                    <Header as="h1">Post a job</Header>
                    <Message
                    color="yellow"
                    header="Alert"
                    content="In order to post a job you need to be authenticated."
                    />
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
                            options={categoryOptions}
                        />
                        
                        <Form.Dropdown 
                            onChange={this.handleDropdownChange}
                            name="skills"
                            label="Skills"
                            placeholder='Add skills'
                            multiple
                            search
                            selection
                            options={skillOptions}
                            ></Form.Dropdown>

                        <Form.Dropdown 
                            onChange={this.handleDropdownChange}
                            name="benefits"
                            label="Benefits"
                            placeholder='Add benefits'
                            multiple
                            search
                            selection
                            options={benefitOptions}
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
                    </Form>
                </Segment>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapActionsToProps = {
    propsSetMenuItem: setMenuItem
}

export default connect(mapStateToProps, mapActionsToProps)(ReactJobPostContainer)