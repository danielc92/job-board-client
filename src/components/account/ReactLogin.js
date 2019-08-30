import React, { Component } from 'react';
import { Form, Segment, Message, Container, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth';


class ReactLogin extends Component {
    
    state = {
        email:"",
        password:"",
        error: ""
    }

    handleInputChange = (e) => {
        const { name, value} = e.target;
        let trimmed_value = value.trim()
        this.setState({ [name] : trimmed_value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { email, password } = this.state;

        ((email.length > 0) & (password.length >0)) ?
            this.props.propsLoginUser(email, password) :
            this.setState({error: "You have to enter a password and email"})
    }

    render() {
        const { email, password }= this.state;
        return (
            <Container style={{ minHeight: '60vh'}}>      
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
                    visible={this.state.error.length > 0}
                    header="Action forbidden"
                    content={this.state.error}>
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
