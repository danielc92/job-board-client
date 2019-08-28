import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Segment, Form, Header } from 'semantic-ui-react';

class ReactRegister extends Component {

    state = {
        email: "",
        password: "",
        confirm_password: "",
        first_name: "",
        last_name: ""
    }

    handleInputChange = (e) => {
        const { value, name } = e.target;
        this.setState({[name]: value})
    }

    render() {
        
        const { 
            email, 
            password, 
            confirm_password, 
            first_name, 
            last_name } = this.state 
        
        return (
            <Container>
                <Segment style={{ padding: '7rem 0', border: 'none', boxShadow: 'none', margin: 'none'}}>
                    <Header as="h1">Join the community</Header>
                    <Form>
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
                        placeholder="Enter password here..." 
                        label="Password" 
                        value={password}
                        name="email"/>
            
                    <Form.Input
                        icon="lock"
                        iconPosition="left"
                        onChange={this.handleInputChange}
                        placeholder="Enter password again..." 
                        label="Confirm Password" 
                        value={confirm_password}
                        name="confirm_password"/>
        
                    <Form.Input
                        icon="lock"
                        iconPosition="left"
                        onChange={this.handleInputChange}
                        placeholder="Jane" 
                        label="First name" 
                        value={first_name}
                        name="first_name"/>

                    <Form.Input
                        icon="lock"
                        iconPosition="left"
                        onChange={this.handleInputChange}
                        placeholder="Doe" 
                        label="Last name" 
                        value={last_name}
                        name="last_name"/>

                    <Form.Button 
                    size="large" 
                    color="green">Create account</Form.Button>

                    </Form>
                </Segment>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        theme: state.theme
    }
}

export default connect(mapStateToProps)(ReactRegister)
