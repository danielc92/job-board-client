import React, { Component } from 'react'
import {
  Form,
  Image,
  Segment,
  Message,
  Container,
  Header,
  Grid,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/auth'
import { setMenuItem } from '../../actions/menu'
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

  render() {
    const { email, password, error, passwordHidden } = this.state

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

                    {this.props.auth.error ? (
                      <Message
                        content={this.props.auth.message}
                        color="red"
                        header="An error occured"
                      />
                    ) : null}

                    <Form.Button color="green" size="large">
                      Submit
                    </Form.Button>
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
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = {
  propsLoginUser: loginUser,
  propsSetMenuItem: setMenuItem,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
