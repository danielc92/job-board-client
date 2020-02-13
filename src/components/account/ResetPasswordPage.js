import React, { Component } from 'react'
import {
  Form,
  Image,
  Segment,
  Container,
  Header,
  Grid,
  Message,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import loginImage from '../../images/fingerprint_swrc.svg'
import VerticallyPaddedContainer from '../layout/VerticallyPaddedContainer'
import './LoginPage.css'
import { queryStringToObjectParser } from '../../helpers/query'
import { PasswordMatcher, PasswordValidator } from '../../helpers/validation'

class LoginPage extends Component {
  state = {
    password: '',
    password_confirm: '',
    validation_errors: [],
  }

  handleInputChange = e => {
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

  handleSubmit = e => {
    e.preventDefault()
    const { validation_errors, password, password_confirm } = this.state
    const searchObject = queryStringToObjectParser(this.props.location.search)

    if (validation_errors.length === 0 && searchObject && searchObject.token) {
      const payload = {
        password,
        password_confirm,
        token: searchObject.token,
      }
      console.log(payload)
    }
  }

  componentDidMount() {
    this.validate()
  }

  render() {
    const { validation_errors, password, password_confirm } = this.state

    return (
      <Container>
        <VerticallyPaddedContainer size="4">
          <Grid columns={2} stackable padded>
            <Grid.Row>
              <Grid.Column>
                <Segment basic>
                  <Header as="h1" content="Reset your password" />
                  <p>
                    Proident ad nisi esse aliquip consectetur non mollit
                    reprehenderit magna nulla eu non occaecat.
                  </p>
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
  return {}
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
