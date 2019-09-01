import React, { Component } from 'react';
import { Segment, Container, Header, Form, Message } from 'semantic-ui-react';


export default class ReactJobPostContainer extends Component {

    state = {
        skills: [
            {key: 'lsiadyufgaose873', text: 'teamwork', value: 'lsiadyufgaose873'},
            {key: '3w', text: 'jumping', value: '3w'},
            {key: 'aaa', text: 'running', value: 'aaa'},
            {key: 'aa', text: 'rowing', value: 'aa'},
            {key: 'fd', text: 'communication', value: 'fd'},
            {key: 'ef', text: 'negotiation', value: 'ef'},
            {key: 'asdf', text: 'finance', value: 'asdf'}
        ],
        benefits: [
            {key: '1', value: '1', text: 'sick leave'},
            {key: '2', value: '2', text: 'paternal leave'},
            {key: '12', value: '12', text: 'flexible hours'}
        ]
    }
    render() {
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
                            label="Skills"
                            placeholder='Add skills'
                            multiple
                            search
                            selection
                            options={this.state.skills}
                            ></Form.Dropdown>

                        <Form.Dropdown 
                            label="Benefits"
                            placeholder='Add benefits'
                            multiple
                            search
                            selection
                            options={this.state.benefits}
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
                        icon="home"
                        size="big"
                        color="green">Create Job</Form.Button>
                    </Form>
                </Segment>
            </Container>
        )
    }
}
