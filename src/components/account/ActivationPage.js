import React, { Component } from 'react'
import {
  Image,
  Segment,
  Container,
  Modal,
  Header,
  Button,
  Grid,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import {
  sendAccountActivation,
  resetAccountActivation,
} from '../../actions/account/account_activation'
import loginImage from '../../images/fingerprint_swrc.svg'
import VerticallyPaddedContainer from '../layout/VerticallyPaddedContainer'
import './LoginPage.css'
import { queryStringToObjectParser } from '../../helpers/query'

class ActivationPage extends Component {
  componentDidMount() {
    const query = queryStringToObjectParser(this.props.location.search)
    if (query && query.token) {
      this.props.propsSendAccountActivation(query)
    }
  }
  closeModal = () => {
    this.props.propsResetAccountActivation()
  }
  render() {
    const { account_activation } = this.props
    return (
      <Container>
        <VerticallyPaddedContainer size="4">
          <Grid columns={2} stackable padded>
            <Grid.Row>
              <Grid.Column>
                <Segment basic>
                  <Header as="h1" content="Activation Page" />
                  <p>
                    You're at this page because you have clicked on an email
                    link to activate your account. Please wait while we activate
                    your account.
                  </p>
                  <Modal open={!account_activation.modalIsClosed}>
                    <Modal.Header>{account_activation.header}</Modal.Header>
                    <Modal.Content>{account_activation.message}</Modal.Content>
                    <Modal.Actions>
                      <Button
                        loading={account_activation.loading}
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

const mapStateToProps = state => {
  const { account_activation } = state
  return {
    account_activation,
  }
}

const mapDispatchToProps = {
  propsSendAccountActivation: sendAccountActivation,
  propsResetAccountActivation: resetAccountActivation,
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivationPage)
