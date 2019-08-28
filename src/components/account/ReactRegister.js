import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Segment, Form, Header } from 'semantic-ui-react';

class ReactRegister extends Component {
    render() {
        return (
            <Container>
                <Segment>
                    <Header>Registration Page</Header>
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
                        label="Email" 
                        value={email}
                        name="email"/>
            
                    <Form.Input
                        icon="lock"
                        iconPosition="left"
                        onChange={this.handleInputChange}
                        placeholder="Enter password again..." 
                        label="Email" 
                        value={email}
                        name="email"/>
        
                    <Form.Input
                        icon="lock"
                        iconPosition="left"
                        onChange={this.handleInputChange}
                        placeholder="Enter first name..." 
                        label="First name" 
                        value={email}
                        name="first_name"/>

                    <Form.Input
                        icon="lock"
                        iconPosition="left"
                        onChange={this.handleInputChange}
                        placeholder="Enter password again..." 
                        label="Last name" 
                        value={email}
                        name="last_name"/>
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
