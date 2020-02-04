import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getNewsDetail } from '../../actions/news'
import { dateDiffString } from '../../helpers/generic'
import {
  Container,
  Segment,
  Label,
  Header,
  Placeholder,
  Divider,
  Icon,
} from 'semantic-ui-react'
import { setMenuItem } from '../../actions/menu'
import VerticallyPaddedContainer from '../layout/VerticallyPaddedContainer'
import CustomErrorMessage from '../placeholder/CustomErrorMessage'
import FeedbackCtaSection from '../feedback/FeedbackCtaSection'

class NewsDetailPage extends Component {
  componentDidMount() {
    this.props.propsGetNewsDetail(this.props.location.state.news_id)
    this.props.propsSetMenuItem('news')
  }
  render() {
    const { news_detail } = this.props
    const { data } = news_detail
    return (
      <section>
        <Container>
          <VerticallyPaddedContainer size={4}>
            <Header as="h2" content="News Article Page" />
            <Divider />
            {news_detail.error ? (
              <CustomErrorMessage
                header="An error has occured"
                content={news_detail.message}
              />
            ) : data ? (
              <Segment stacked padded>
                <Header as="h3" content={data.title} />

                {data.content.map(para => (
                  <p>{para}</p>
                ))}
                <Divider />
                <Label.Group>
                  <Label>
                    <Icon name="clock" />
                    Posted {dateDiffString(data.createdAt)}
                  </Label>
                  <Label color="violet">
                    <Icon name="tag" />
                    {data.category}
                  </Label>
                </Label.Group>
              </Segment>
            ) : (
              <Segment stacked padded>
                <Placeholder fluid>
                  <Placeholder.Paragraph>
                    <Placeholder.Line /> <Placeholder.Line />{' '}
                    <Placeholder.Line /> <Placeholder.Line />{' '}
                    <Placeholder.Line /> <Placeholder.Line />{' '}
                    <Placeholder.Line />
                    <Placeholder.Line /> <Placeholder.Line />{' '}
                    <Placeholder.Line /> <Placeholder.Line />
                    <Placeholder.Line /> <Placeholder.Line />{' '}
                    <Placeholder.Line /> <Placeholder.Line />{' '}
                    <Placeholder.Line /> <Placeholder.Line />
                  </Placeholder.Paragraph>
                </Placeholder>
              </Segment>
            )}
          </VerticallyPaddedContainer>
        </Container>
        <FeedbackCtaSection />
      </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewsDetailPage)
