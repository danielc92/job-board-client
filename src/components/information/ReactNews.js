import React, { Component } from 'react'
import {
  Segment,
  Container,
  Label,
  Icon,
  Divider,
  Header,
  Button,
  Message,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setMenuItem } from '../../actions/menu'
import VerticallyPaddedContainer from '../layout/VerticallyPaddedContainer'
import { getNewsList } from '../../actions/news_list'

class ReactNews extends Component {
  componentDidMount() {
    this.props.propsSetMenuItem('news')
    this.props.propsGetNewsList()
  }

  render() {
    const { news_list } = this.props
    return (
      <div>
        <Segment basic>
          <Container>
            <VerticallyPaddedContainer size="4">
              <Header as="h1">News</Header>
              <p>Read about the latest updates and progress.</p>
              <Divider />
              {news_list.error ? (
                <Message color="red">There is an error</Message>
              ) : news_list.docs ? (
                <React.Fragment>
                  {news_list.docs.map(item => (
                    <Segment stacked color="green">
                      <Header as="h3">{item.title}</Header>
                      <p>{item.summary}</p>
                      <Label.Group>
                        <Label size="tiny" content={item.createdAt} />
                      </Label.Group>
                      <Button color="green">
                        <Icon name="book" />
                        Read more
                      </Button>
                    </Segment>
                  ))}
                </React.Fragment>
              ) : (
                <Message>Loading</Message>
              )}
            </VerticallyPaddedContainer>
          </Container>
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { news_list } = state
  return {
    news_list,
  }
}

const mapDispatchToProps = {
  propsSetMenuItem: setMenuItem,
  propsGetNewsList: getNewsList,
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactNews)
