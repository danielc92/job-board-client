import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/register';
import { setMenuItem } from '../../actions/menu';
import { Container, Segment, Form, Header, Message } from 'semantic-ui-react';
import { 
    EmailValidator, 
    StringValidator,
    PasswordMatcher,
    PasswordValidator} from '../../helpers/validation';


class ReactRegister extends Component {

    state = {
        email: "",
        password: "",
        confirm_password: "",
        first_name: "",
        last_name: "",
        errors: []
    }

    validateForm = () => {

        const {
            email, 
            password, 
            confirm_password, 
            first_name, 
            last_name} = this.state;
        
        let firstNameErrors = StringValidator(first_name, 1, 100, 'First name')
        let lastNameErrors = StringValidator(last_name, 1, 100, 'Last name')
        let matchErrors = PasswordMatcher(password, confirm_password)
        let passwordErrors = PasswordValidator(password, 8, 20, 6)
        let emailErrors = EmailValidator(email, 6, 100)

        let errors = [
            ...firstNameErrors, 
            ...lastNameErrors, 
            ...passwordErrors, 
            ...matchErrors,
            ...emailErrors]

        this.setState({errors}) 
    }

    handleInputChange = (e) => {
        const { value, name } = e.target;
        this.setState({ [name]:value }, ()=> this.validateForm())
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { errors, email, password, first_name, last_name } = this.state
        if (errors.length === 0) {
            console.log('Attempting to register user')
            this.props.propsRegisterUser(email, 
                password,
                first_name,
                last_name)
        }else {
            console.log('Validation has failed.')
        }
    }

    componentDidMount() {
        this.validateForm()
        this.props.propsSetMenuItem('register')
    }

    render() {
        const { 
            errors,
            email, 
            password, 
            confirm_password, 
            first_name, 
            last_name } = this.state;
        
        return (
            <Container>
                <Segment style={{ padding: '7rem 0', border: 'none', boxShadow: 'none', margin: 'none'}}>
                    <Header as="h1">Join the community</Header>
                    
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
                        type="password"
                        icon="lock"
                        iconPosition="left"
                        onChange={this.handleInputChange}
                        placeholder="Enter password here..." 
                        label="Password" 
                        value={password}
                        name="password"/>
            
                    <Form.Input
                        type="password"
                        icon="lock"
                        iconPosition="left"
                        onChange={this.handleInputChange}
                        placeholder="Enter password again..." 
                        label="Confirm Password" 
                        value={confirm_password}
                        name="confirm_password"/>
        
                    <Form.Input
                        icon="user circle"
                        iconPosition="left"
                        onChange={this.handleInputChange}
                        placeholder="Jane" 
                        label="First name" 
                        value={first_name}
                        name="first_name"/>

                    <Form.Input
                        icon="user circle"
                        iconPosition="left"
                        onChange={this.handleInputChange}
                        placeholder="Doe" 
                        label="Last name" 
                        value={last_name}
                        name="last_name"/>

                    <Form.Button 
                    size="large" 
                    color="green">Create account</Form.Button>

                    <Message
                        warning
                        list={errors}
                        header="Rules"
                        visible={errors.length > 0}>
                    </Message>

                    <Message
                        success
                        header="Success"
                        visible={this.props.register.success & !this.props.error}
                        content={this.props.register.message}>

                    </Message>

                    <Message
                        error
                        header="Error occured"
                        visible={this.props.register.error}
                        content={this.props.register.message}>

                    </Message>
                    </Form>

                </Segment>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        theme: state.theme,
        register: state.register
    }
}

const mapActionsToProps = {
    propsRegisterUser: registerUser,
    propsSetMenuItem: setMenuItem
}

export default connect(mapStateToProps, mapActionsToProps)(ReactRegister)
