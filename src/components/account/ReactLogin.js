import React, { Component } from 'react';
import { Form, Segment, Icon, Grid,  Container, Header } from 'semantic-ui-react';


export default class ReactLogin extends Component {
    
    state = {
        email:"",
        password:""
    }

    handleInputChange = (e) => {
        this.setState({[e.target.name]:e.target.value.trim()})
        console.log(this.state)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log('Submitted')
    }

    render() {
        const { email, password }= this.state;
        return (
            <Container style={{ minHeight: '60vh'}}>      
            <Segment padded="very">
                <Header as="h3">Login Page</Header>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Input
                        icon="at"
                        iconPosition="left"
                        onChange={this.handleInputChange}
                        placeholder="Enter email here..." 
                        label="Email" 
                        value={email}
                        name="email"/>
                    <Form.Input 
                        icon="lock"
                        iconPosition="left"
                        onChange={this.handleInputChange}
                        type="password"
                        label="Password" 
                        value={password}
                        placeholder="Enter password here..."
                        name="password"/>
                    <Form.Button primary>Submit</Form.Button>
                </Form>
            </Segment>
            </Container>
        )
    }
}
