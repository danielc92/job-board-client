import React, { Component } from 'react'
import { Segment, Container, Header, Grid } from 'semantic-ui-react'
export default class ActivationPage extends Component {
    render() {
        return (
            <Container>
        <VerticallyPaddedContainer size="4">
          <Grid columns={2} stackable padded>
            <Grid.Row>
              <Grid.Column>
                <Segment basic>
                    <Modal open={false}>
                      <Modal.Header>{reset_password_email.header}</Modal.Header>
                      <Modal.Content>
                        {reset_password_email.error
                          ? 'Something went wrong please check that the email is correct.'
                          : reset_password_email.loading
                          ? 'Please wait while we do the work.'
                          : 'Successfully sent reset request to your email, please check your inbox.'}
                      </Modal.Content>
                      <Modal.Actions>
                        <Button
                          loading={reset_password_email.loading}
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
