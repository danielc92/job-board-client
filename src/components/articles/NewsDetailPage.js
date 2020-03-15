import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getNewsDetail } from 'actions/news'
import { dateDiffString } from 'helpers/generic'
import {
  Container,
  Segment,
  Label,
  Header,
  Placeholder,
  Divider,
  Icon,
} from 'semantic-ui-react'
import { setMenuItem } from 'actions/menu'
import VerticallyPaddedContainer from 'components/layout/VerticallyPaddedContainer'
import CustomErrorMessage from 'components/reusable/CustomErrorMessage'
import FeedbackCtaSection from 'components/feedback/FeedbackCtaSection'
import { contentRenderer } from 'helpers/renderer'
import BannerGroup from 'components/banners/BannerGroup'

class NewsDetailPage extends Component {
  componentDidMount() {
    this.props.propsGetNewsDetail(this.props.match.params.slug)
    this.props.propsSetMenuItem('news')
  }
  render() {
    const { news_detail } = this.props
    const { data } = news_detail
    return (
      <section>
        <Container text>
          <VerticallyPaddedContainer size={4}>
            {news_detail.error ? (
              <Fragment>
                <Header as="h2" content="News Article Page" />
                <Divider />
                <CustomErrorMessage
                  header="An error has occured"
                  content={news_detail.message}
                />
              </Fragment>
            ) : data ? (
              <Fragment>
                <Header as="h2" content={data.title} />
                <Divider />
                <Segment stacked padded>
                  {contentRenderer(data.content)}
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
              </Fragment>
            ) : (
              <Fragment>
                <Placeholder fluid>
                  <Placeholder.Header>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                </Placeholder>

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
              </Fragment>
            )}
          </VerticallyPaddedContainer>
        </Container>
        <BannerGroup showFeedback />
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
