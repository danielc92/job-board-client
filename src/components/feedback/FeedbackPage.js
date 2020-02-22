import React, { Component } from 'react'
import {
  Form,
  Image,
  Segment,
  Container,
  Header,
  Grid,
} from 'semantic-ui-react'
import VerticallyPaddedContainer from '../layout/VerticallyPaddedContainer'
import feedbackImage from '../../images/feedback.svg'

class FeedbackPage extends Component {
  state = {
    message: '',
    category: null,
  }

  render() {
    const options = [
      { text: 'Suggest a new feature', value: 'suggestion' },
      { text: 'Report an issue', value: 'report' },
      { text: 'Other', value: 'other' },
    ]
    const handleDropDownChange = (e, data) => {
      this.setState({ [data.name]: data.value })
    }
    const handleChange = e => {
      this.setState({ [e.target.name]: e.target.value })
    }
    const { message } = this.state
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
                        onChange={handleDropDownChange}
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
                        onChange={handleChange}
                        placeholder="Adding this new feature would be great..."
                        maxLength={500}
                        label={`Message (${500 -
                          message.length} chars remaining)`}
                        name="message"
                      />
                    </Form.Field>

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

export default FeedbackPage
