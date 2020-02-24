import React, { Component } from 'react'
import {
  Form,
  Image,
  Segment,
  Container,
  Header,
  Button,
  Grid,
  Modal,
} from 'semantic-ui-react'
import VerticallyPaddedContainer from 'components/layout/VerticallyPaddedContainer'
import feedbackImage from 'images/feedback.svg'
import { connect } from 'react-redux'
import { createFeedback, resetCreateFeedback } from 'actions/feedback'

const options = [
  { text: 'General feedback', value: 'general' },
  { text: 'Suggest a new feature', value: 'suggestion' },
  { text: 'Report an issue', value: 'report' },
  { text: 'Other', value: 'other' },
]

class FeedbackPage extends Component {
  state = {
    message: '',
    category: '',
  }

  handleDropDownChange = (e, data) => {
    this.setState({ [data.name]: data.value })
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit = e => {
    e.preventDefault()
    console.log('hey')
    const { category, message } = this.state
    this.props.propsCreateFeedback({
      category,
      message,
    })
  }
  closeModal = () => {
    this.props.propsResetFeedback()
  }
  render() {
    const { message, category } = this.state
    const { feedback } = this.props
    return (
      <Container>
        <VerticallyPaddedContainer size="4">
          <Grid columns={2} stackable padded>
            <Grid.Row>
              <Grid.Column>
                <Segment basic>
                  <Header as="h1" content="Feedback Page" />
                  <p>
                    It's important that we hear your feedback, so that we can
                    improve our services for everyone.
                  </p>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                      <Form.Dropdown
                        name="category"
                        onChange={this.handleDropDownChange}
                        search
                        selection
                        placeholder="Choose a category from the list.."
                        options={options}
                        maxLength={500}
                        label={`Category`}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Form.TextArea
                        rows={7}
                        onChange={this.handleChange}
                        placeholder="Adding this new feature would be great..."
                        maxLength={500}
                        label={`Message (${500 -
                          message.length} chars remaining)`}
                        name="message"
                      />
                    </Form.Field>

                    <Form.Button
                      disabled={message.length === 0 || category.length === 0}
                      color="green"
                      size="large"
                    >
                      Submit
                    </Form.Button>
                  </Form>
                </Segment>
                <Modal open={!feedback.modalIsClosed}>
                  <Modal.Header>{feedback.header}</Modal.Header>
                  <Modal.Content>{feedback.message}</Modal.Content>
                  <Modal.Actions>
                    <Button
                      loading={feedback.loading}
                      onClick={this.closeModal}
                      color="green"
                    >
                      Confirm
                    </Button>
                  </Modal.Actions>
                </Modal>
              </Grid.Column>
              <Grid.Column verticalAlign="middle">
                <Image
                  style={{ maxWidth: '350px' }}
                  centered
                  fluid
                  src={feedbackImage}
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
  const { feedback } = state
  return {
    feedback,
  }
}

const mapDispatchToProps = {
  propsCreateFeedback: createFeedback,
  propsResetFeedback: resetCreateFeedback,
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackPage)
