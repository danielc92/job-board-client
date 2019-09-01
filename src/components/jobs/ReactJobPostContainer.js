import React, { Component } from 'react';
import { Segment, Container, Header, Form, Button } from 'semantic-ui-react';


export default class ReactJobPostContainer extends Component {

    state = {
        skills: [{id:1, name: 'teamwork'},
    {id:2, name:'friendship'},
{id: 3, name: 'jumping'}]
    }
    render() {
        return (
            <Container>
                <Segment style={{ padding: '7rem 0', border: 'none', boxShadow: 'none', margin: 'none'}}>
                    <Header as="h1">Post a job</Header>
                    <p>Note you must be logged in to create a job post.</p>
                    <Form>
                        <Form.Input 
                        label="Job Title"/>

                        <Form.TextArea
                        placeholder="A short description about the company hiring"
                        label="Company summary"/>

                        <Form.TextArea 
                        placeholder="A short description about the job"
                        label="Job summary"/>

                        <Form.Input 
                        type="number"
                        label="Minimum salary ($)"/>

                        <Form.Input 
                        type="number"
                        label="Maximum salary ($)"/>

                        
                        <Form.Dropdown
                        label="Select skills"
                        ></Form.Dropdown>
                      
                        <Form.Button 
                        size="big"
                        color="green">Create Job</Form.Button>
                    </Form>
                </Segment>
            </Container>
        )
    }
}
