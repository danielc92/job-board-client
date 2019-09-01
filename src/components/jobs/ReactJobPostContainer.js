import React, { Component } from 'react';
import { Segment, Container, Header, Form, Message, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setMenuItem } from '../../actions/menu';

class ReactJobPostContainer extends Component {

    state = {
        // These are temporary until API is wired up into redux.
        categoryOptions: [
            {key: 'a', text: 'accounting and finance', value: 'a'},
            {key: 'b', text: 'engineering', value: 'b'},
            {key: 'c', texT: 'hospitality', value: 'c'}
        ],
        skillOptions: [
            {key: 'a', text: 'teamwork', value: 'a'},
            {key: 'b', text: 'jumping', value: 'b'},
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
                    <Form>
                        <Form.Input
                        placeholder="Zoo keeper"
                        label="Job Title"/>

                        <Form.Dropdown
                        label="Category"
                        placeholder="Select category"
                        fluid
                        selection
                        search
                        options={categoryOptions}
                        >

                        </Form.Dropdown>
                        
                        <Form.Dropdown 
                            label="Skills"
                            placeholder='Add skills'
                            multiple
                            search
                            selection
                            options={skillOptions}
                            ></Form.Dropdown>

                        <Form.Dropdown 
                            label="Benefits"
                            placeholder='Add benefits'
                            multiple
                            search
                            selection
                            options={benefitOptions}
                            ></Form.Dropdown>


                        <Form.TextArea
                        placeholder="A short description about the company hiring"
                        label="Company summary"/>

                        <Form.TextArea 
                        placeholder="A short description about the job"
                        label="Job summary"/>

                        
                        <Form.Group>
                            <Form.Input 
                            type="number"
                            label="Minimum salary ($)"/>

                            <Form.Input 
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

const mapActionsToProps = {
    propsSetMenuItem: setMenuItem
}

export default connect(null, mapActionsToProps)(ReactJobPostContainer)