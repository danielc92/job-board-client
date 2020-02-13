import React, { Component } from 'react'
import { connect } from 'react-redux'
import { resetRegisterState, registerUser } from '../../actions/register'
import { setMenuItem } from '../../actions/menu'
import {
  Container,
  Button,
  Modal,
  Segment,
  Form,
  Header,
  Message,
} from 'semantic-ui-react'
import {
  EmailValidator,
  StringValidator,
  PasswordMatcher,
  PasswordValidator,
} from '../../helpers/validation'
import VerticallyPaddedContainer from '../layout/VerticallyPaddedContainer'

class RegisterPage extends Component {
  state = {
    email: '',
    password: '',
    confirm_password: '',
    first_name: '',
    last_name: '',
    is_employer: false,
    errors: [],
  }

  validateForm = () => {
    const {
      email,
      password,
      confirm_password,
      first_name,
      last_name,
    } = this.state

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
      ...emailErrors,
    ]

    this.setState({ errors })
  }

  handleInputChange = e => {
    const { value, name } = e.target
    this.setState({ [name]: value }, () => this.validateForm())
  }

  handleSubmit = e => {
    e.preventDefault()

    const {
      errors,
      email,
      password,
      first_name,
      last_name,
      is_employer,
    } = this.state
    const payload = { email, password, first_name, last_name, is_employer }

    if (errors.length === 0) this.props.propsRegisterUser(payload)
  }

  handleRadioChange = () => {
    this.setState({ is_employer: !this.state.is_employer })
  }
  componentDidMount() {
    this.validateForm()
    this.props.propsSetMenuItem('register')
  }

  closeModal = () => {
    this.props.propsResetRegisterState()
  }

  handleNavigateToLogin = () => {
    this.props.history.push('/sign-in')
  }

  render() {
    const {
      errors,
      email,
      password,

      confirm_password,
      first_name,
      last_name,
    } = this.state

    const { register } = this.props
    const { flag, error, message } = register

    return (
      <Container>
        <VerticallyPaddedContainer size="4">
          <Segment basic>
            <Header as="h1" content="Join the community" />

            <Form onSubmit={this.handleSubmit}>
              <Form.Input
                icon="at"
                iconPosition="left"
                onChange={this.handleInputChange}
                placeholder="Enter email here..."
                label="Email"
                value={email}
                name="email"
              />

              <Form.Input
                type="password"
                icon="lock"
                iconPosition="left"
                onChange={this.handleInputChange}
                placeholder="Enter password here..."
                label="Password"
                value={password}
                name="password"
              />

              <Form.Input
                type="password"
                icon="lock"
                iconPosition="left"
                onChange={this.handleInputChange}
                placeholder="Enter password again..."
                label="Confirm Password"
                value={confirm_password}
                name="confirm_password"
              />

              <Form.Input
                icon="user circle"
                iconPosition="left"
                onChange={this.handleInputChange}
                placeholder="Jane"
                label="First name"
                value={first_name}
                name="first_name"
              />

              <Form.Input
                icon="user circle"
                iconPosition="left"
                onChange={this.handleInputChange}
                placeholder="Doe"
                label="Last name"
                value={last_name}
                name="last_name"
              />

              <Form.Field>
                <label>
                  I am{' '}
                  <strong>
                    {this.state.is_employer ? 'an employer' : 'a job seeker'}
                  </strong>
                </label>
              </Form.Field>
              <Form.Radio toggle onChange={this.handleRadioChange}></Form.Radio>
              <Form.Button
                disabled={errors.length > 0}
                size="large"
                color="green"
              >
                Create account
              </Form.Button>

              <Message
                warning
                list={errors}
                header="Rules"
                visible={errors.length > 0}
              ></Message>
            </Form>
          </Segment>
        </VerticallyPaddedContainer>
        <Modal open={error || flag} dimmer="blurring" onClose={this.closeModal}>
          <Modal.Header>{error ? 'Error' : 'Success'}</Modal.Header>
          <Modal.Content>{message}</Modal.Content>
          <Modal.Actions>
            <Button onClick={this.closeModal} color="green">
              Confirm
            </Button>
            {!error ? (
              <Button onClick={this.handleNavigateToLogin} color="green">
                Login
              </Button>
            ) : null}
          </Modal.Actions>
        </Modal>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    theme: state.theme,
    register: state.register,
  }
}

const mapDispatchToProps = {
  propsRegisterUser: registerUser,
  propsSetMenuItem: setMenuItem,
  propsResetRegisterState: resetRegisterState,
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)