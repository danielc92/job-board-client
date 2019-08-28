import React, { Component } from 'react';
import { Form, Segment, Message, Container, Header } from 'semantic-ui-react';


export default class ReactLogin extends Component {
    
    state = {
        email:"",
        password:"",
        error: ""
    }

    handleInputChange = (e) => {
        this.setState({[e.target.name]:e.target.value.trim()})
        console.log(this.state)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { email, password } = this.state;
        if ((email.length > 0) & (password.length >0)) {
            console.log('Logged in')
        } else {
            this.setState({error: "You have to enter a password and email"})
        }
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

                    <Message
                    warning
                    visible={this.state.error.length > 0}
                    header="Action forbidden"
                    content={this.state.error}>
                    </Message>

                    <Form.Button primary>Submit</Form.Button>
                </Form>
            </Segment>
            </Container>
        )
    }
}
