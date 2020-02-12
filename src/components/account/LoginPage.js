import React, { Component } from 'react'
import {
  Form,
  Image,
  Segment,
  Message,
  Container,
  Modal,
  Button,
  Header,
  Grid,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/auth'
import { setMenuItem } from '../../actions/menu'
import {
  sendResetPassword,
  resetSendResetPassword,
} from '../../actions/reset_password_request'
import loginImage from '../../images/fingerprint_swrc.svg'
import VerticallyPaddedContainer from '../layout/VerticallyPaddedContainer'
import './LoginPage.css'

class LoginPage extends Component {
  state = {
    email: '',
    password: '',
    error: false,
    passwordHidden: true,
  }

  closeModal = () => {
    this.props.propsResetSendResetPassword()
  }

  handleInputChange = e => {
    const { name, value } = e.target
    let trimmed_value = value.trim()
    this.setState({ [name]: trimmed_value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { email, password } = this.state

    if ((email.length > 0) & (password.length > 0)) {
      this.props.propsLoginUser(email, password)
      this.setState({ error: false })
    } else {
      this.setState({ error: true })
    }
  }

  handleTogglePasswordView = e => {
    this.setState({ passwordHidden: !this.state.passwordHidden })
  }

  componentDidMount() {
    this.props.propsSetMenuItem('login')
  }

  resetPassword = () => {
    const { email } = this.state
    if (email.length > 0) {
      this.props.propsSendResetPassword({ email })
    }
  }

  render() {
    const { email, password, error, passwordHidden } = this.state
    const { location, auth, password_reset_request } = this.props
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/')
    }

    return (
      <Container>
        <VerticallyPaddedContainer size="4">
          <Grid columns={2} stackable padded>
            <Grid.Row>
              <Grid.Column>
                <Segment basic>
                  <Header as="h1" content="Login Page" />
                  <p>
                    Unlock all the features by creating an account and signing
                    in.
                  </p>
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
                      icon="lock"
                      iconPosition="left"
                      onChange={this.handleInputChange}
                      type={passwordHidden ? 'password' : 'text'}
                      label="Password"
                      value={password}
                      placeholder="Enter password here..."
                      name="password"
                    />

                    <Form.Radio
                      label={passwordHidden ? 'Show password' : 'Hide password'}
                      toggle
                      onChange={this.handleTogglePasswordView}
                    />

                    <Message
                      visible={error}
                      warning
                      header="Action forbidden"
                      content="Email and password is required to login."
                    ></Message>

                    {location.state && location.state.redirect_message ? (
                      <Message
                        visible={error}
                        color="blue"
                        header="Session expired"
                        content={location.state.redirect_message}
                      ></Message>
                    ) : null}

                    {auth.error ? (
                      <Message
                        content={auth.message}
                        color="red"
                        header="An error occured"
                      />
                    ) : null}

                    <Form.Button color="green" size="large">
                      Submit
                    </Form.Button>
                    <Modal open={!password_reset_request.flag}>
                      <Modal.Header>
                        {password_reset_request.error
                          ? 'Error'
                          : password_reset_request.loading
                          ? 'Loading'
                          : 'Success'}
                      </Modal.Header>
                      <Modal.Content>
                        {error
                          ? 'Something went wrong please check that the email is correct.'
                          : password_reset_request.loading
                          ? 'Please wait while we do the work.'
                          : 'Successfully sent reset request to your email, please check your inbox.'}
                      </Modal.Content>
                      <Modal.Actions>
                        <Button
                          loading={password_reset_request.loading}
                          onClick={this.closeModal}
                          color="green"
                        >
                          Confirm
                        </Button>
                      </Modal.Actions>
                    </Modal>
                    <p>
                      Forgotten password? Fill in your email and{' '}
                      <a
                        style={{ cursor: 'pointer' }}
                        onClick={this.resetPassword}
                      >
                        click here
                      </a>{' '}
                      to reset your password.
                    </p>
                  </Form>
                </Segment>
              </Grid.Column>
              <Grid.Column verticalAlign="middle">
                <Image
                  style={{ maxWidth: '350px' }}
                  centered
                  fluid
                  src={loginImage}
                ></Image>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </VerticallyPaddedContainer>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const { auth, password_reset_request } = state
  return {
    auth,
    password_reset_request,
  }
}

const mapDispatchToProps = {
  propsLoginUser: loginUser,
  propsSetMenuItem: setMenuItem,
  propsResetSendResetPassword: resetSendResetPassword,
  propsSendResetPassword: sendResetPassword,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
