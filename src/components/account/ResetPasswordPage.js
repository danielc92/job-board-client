import React, { Component } from 'react'
import {
  Form,
  Image,
  Segment,
  Container,
  Header,
  Grid,
  Modal,
  Button,
  Message,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import loginImage from 'images/fingerprint_swrc.svg'
import VerticallyPaddedContainer from 'components/layout/VerticallyPaddedContainer'
import './LoginPage.css'
import {
  resetPasswordResetRequest,
  sendResetPasswordRequest,
} from 'actions/account/reset_password_request'
import { queryStringToObjectParser } from 'helpers/query'
import { PasswordMatcher, PasswordValidator } from 'helpers/validation'

class LoginPage extends Component {
  state = {
    password: '',
    password_confirm: '',
    validation_errors: [],
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.validate()
    })
  }

  validate = () => {
    const { password, password_confirm } = this.state
    let validation_errors = [
      ...PasswordMatcher(password, password_confirm),
      ...PasswordValidator(password, 8, 20, 6),
    ]
    this.setState({ validation_errors })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { validation_errors, password } = this.state
    const searchObject = queryStringToObjectParser(this.props.location.search)

    if (validation_errors.length === 0 && searchObject && searchObject.token) {
      const payload = {
        password,
        token: searchObject.token,
      }
      this.props.propsSendResetPasswordRequest(payload)
    }
  }

  closeModal = () => {
    this.props.propsResetPasswordResetRequest()
  }
  componentDidMount() {
    this.validate()
  }

  render() {
    const { validation_errors, password, password_confirm } = this.state
    const { reset_password_request } = this.props
    return (
      <Container>
        <VerticallyPaddedContainer size="4">
          <Grid columns={2} stackable padded>
            <Grid.Row>
              <Grid.Column>
                <Segment basic>
                  <Header as="h1" content="Reset your password" />
                  <p>Please choose a new password below.</p>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Input
                      autoComplete="off"
                      icon="at"
                      iconPosition="left"
                      onChange={this.handleInputChange}
                      placeholder="Enter email here..."
                      label="Password"
                      value={password}
                      name="password"
                      type="password"
                    />

                    <Form.Input
                      icon="lock"
                      iconPosition="left"
                      onChange={this.handleInputChange}
                      type="password"
                      label="Confirm password"
                      value={password_confirm}
                      placeholder="Enter password here..."
                      name="password_confirm"
                    />

                    <Form.Button color="green" size="large">
                      Reset Password
                    </Form.Button>
                  </Form>

                  {validation_errors.length > 0 ? (
                    <Message
                      header="Validation reminder"
                      color="yellow"
                      list={validation_errors}
                    ></Message>
                  ) : null}
                  <Modal open={!reset_password_request.modalIsClosed}>
                    <Modal.Header>{reset_password_request.header}</Modal.Header>
                    <Modal.Content>
                      {reset_password_request.message}
                    </Modal.Content>
                    <Modal.Actions>
                      <Button
                        loading={reset_password_request.loading}
                        onClick={this.closeModal}
                        color="green"
                      >
                        Confirm
                      </Button>
                    </Modal.Actions>
                  </Modal>
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

const mapStateToProps = (state) => {
  const { reset_password_request } = state
  return { reset_password_request }
}

const mapDispatchToProps = {
  propsSendResetPasswordRequest: sendResetPasswordRequest,
  propsResetPasswordResetRequest: resetPasswordResetRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
