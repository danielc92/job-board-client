import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getNewsDetail } from '../../actions/news'
import { dateDiffString } from '../../helpers/generic'
import {
  Container,
  Segment,
  Label,
  Message,
  Header,
  Placeholder,
  Divider,
  Icon,
} from 'semantic-ui-react'
import { setMenuItem } from '../../actions/menu'
import VerticallyPaddedContainer from '../layout/VerticallyPaddedContainer'

class ReactNewsDetail extends Component {
  componentDidMount() {
    console.log(this.props.location.state, 'NEWS DETAIL PROPS')
    this.props.propsGetNewsDetail(this.props.location.state.news_id)
    this.props.propsSetMenuItem('news')
  }
  render() {
    const { news_detail } = this.props
    const { data } = news_detail
    return (
      <Container>
        <VerticallyPaddedContainer size={4}>
          <Header as="h2" content="News Article Page" />
          <Divider />
          {news_detail.error ? (
            <Message color="red">Error occured {data.message}</Message>
          ) : data ? (
            <Segment stacked padded>
              <Header as="h3" content={data.title} />
              <Label.Group>
                <Label>
                  <Icon name="clock" />
                  {dateDiffString(data.createdAt)}
                </Label>
                <Label color="violet">
                  <Icon name="tag" />
                  {data.category}
                </Label>
              </Label.Group>
              {data.content.map(para => (
                <p>{para}</p>
              ))}
            </Segment>
          ) : (
            <Segment stacked padded>
              <Placeholder fluid>
                <Placeholder.Paragraph>
                  <Placeholder.Line /> <Placeholder.Line /> <Placeholder.Line />{' '}
                  <Placeholder.Line /> <Placeholder.Line /> <Placeholder.Line />{' '}
                  <Placeholder.Line />
                  <Placeholder.Line /> <Placeholder.Line /> <Placeholder.Line />{' '}
                  <Placeholder.Line />
                  <Placeholder.Line /> <Placeholder.Line /> <Placeholder.Line />{' '}
                  <Placeholder.Line /> <Placeholder.Line /> <Placeholder.Line />
                </Placeholder.Paragraph>
              </Placeholder>
            </Segment>
          )}
        </VerticallyPaddedContainer>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const { news_detail } = state
  return {
    news_detail,
  }
}

const mapDispatchToProps = {
  propsGetNewsDetail: getNewsDetail,
  propsSetMenuItem: setMenuItem,
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactNewsDetail)
