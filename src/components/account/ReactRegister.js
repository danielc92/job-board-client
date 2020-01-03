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
import VerticallyPaddedContainer from '../layout/VerticallyPaddedContainer';


class ReactRegister extends Component {

    state = {
        email: "",
        password: "",
        confirm_password: "",
        first_name: "",
        last_name: "",
        is_employer: false,
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

        const { errors, email, password, first_name, last_name, is_employer } = this.state
        const payload = { email, password, first_name, last_name, is_employer }

        if (errors.length === 0) this.props.propsRegisterUser(payload)
    }

    handleRadioChange = () => {
        this.setState({ is_employer: !this.state.is_employer})
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
                <VerticallyPaddedContainer size="4">
                <Segment basic>
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

                    <Form.Field>
                        <label>I am <strong>{ this.state.is_employer ? 'an employer' : 'a job seeker'}</strong></label>
                    </Form.Field>
                    <Form.Radio
                    toggle
                    onChange={this.handleRadioChange}>

                    </Form.Radio>
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
                </VerticallyPaddedContainer>
                
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

const mapDispatchToProps = {
    propsRegisterUser: registerUser,
    propsSetMenuItem: setMenuItem
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactRegister)
