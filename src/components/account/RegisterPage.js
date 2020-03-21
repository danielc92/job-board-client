import React, { Component } from 'react'
import { connect } from 'react-redux'
import { resetRegisterState, registerUser } from 'actions/account/register'
import { setMenuItem } from 'actions/menu'
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
  StringCharacterValidator,
} from 'helpers/validation'
import VerticallyPaddedContainer from 'components/layout/VerticallyPaddedContainer'
import { ALLOWED_CHARS_HUMAN_NAME } from 'app_constants'

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

    let errors = [
      ...StringValidator(first_name, 1, 100, 'First name'),
      ...StringCharacterValidator(
        first_name,
        ALLOWED_CHARS_HUMAN_NAME,
        'First name'
      ),
      ...StringValidator(last_name, 1, 100, 'Last name'),
      ...StringCharacterValidator(
        last_name,
        ALLOWED_CHARS_HUMAN_NAME,
        'Last name'
      ),
      ...PasswordMatcher(password, confirm_password),
      ...PasswordValidator(password, 8, 20, 6),
      ...EmailValidator(email, 6, 100),
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
    const { error, message, showModal, modalHeader } = register

    return (
      <Container text>
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
                loading={register.loading}
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
        <Modal open={showModal} dimmer="blurring" onClose={this.closeModal}>
          <Modal.Header>{modalHeader}</Modal.Header>
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
