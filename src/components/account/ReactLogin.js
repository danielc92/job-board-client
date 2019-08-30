import React, { Component } from 'react';
import { Form, Button, Segment, Message, Container, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth';
import { Redirect } from 'react-router';

class ReactLogin extends Component {
    
    state = {
        email:"",
        password:"",
        error: false
    }

    handleInputChange = (e) => {
        const { name, value} = e.target;
        let trimmed_value = value.trim()
        this.setState({ [name] : trimmed_value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { email, password } = this.state;

        if ((email.length > 0) & (password.length >0)) {
            this.props.propsLoginUser(email, password)
            this.setState({error: false})
        } else {
            this.setState({error: true})
        }  
    }

    render() {
        const { email, password, error }= this.state;
        return (
            
            <Container style={{ minHeight: '60vh'}}>   
            {this.props.auth.isAuthenticated ? <Redirect to="/"/>: null}  
                <Segment style={{margin: '0', padding: '7rem 0rem', border: 'none', boxShadow:'none'}}>
                    <Header as="h1">Login Page</Header>
                    <p>Unlock all the features by creating an account and signing in.</p>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '500px'}}>
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
                            visible={error}
                            header="Action forbidden"
                            content="Email and password is required to login.">
                        </Message>
                        
                        <Message
                            error
                            header="Failed to login."
                            content="Please check your credentials are correct, and try again."
                            visible={this.props.auth.error}>
                        </Message>

                        <Form.Button color="green" size="large">Submit</Form.Button>
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
    propsLoginUser: loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(ReactLogin)

