import React, { Component, Fragment } from 'react'
import {
  Segment,
  Container,
  Label,
  Icon,
  Divider,
  Header,
  Button,
  Placeholder,
  Pagination,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setMenuItem } from '../../actions/menu'
import VerticallyPaddedContainer from '../layout/VerticallyPaddedContainer'
import { getNewsList } from '../../actions/news'
import CustomErrorMessage from '../placeholder/CustomErrorMessage'
import { dateDiffString } from '../../helpers/generic'
import FeedbackCtaSection from '../feedback/FeedbackCtaSection'

class NewsListPage extends Component {
  componentDidMount() {
    this.props.propsSetMenuItem('news')
    this.props.propsGetNewsList({})
  }

  componentWillReceiveProps() {
    // If the page has changed in router props call new data from api
    const { history, location } = this.props
    if (!history.location.state || !location.state) {
      history.push({
        pathname: '/news/list',
        state: { page: 1 },
      })
    } else {
      if (history.location.state.page !== location.state.page) {
        this.props.propsGetNewsList({
          page: history.location.state.page,
        })
      }
    }
  }

  handleViewNewsArticle = news_id => {
    this.props.history.push({
      pathname: '/news',
      state: { news_id },
    })
  }

  handlePageChange = (e, data) => {
    this.props.history.push({
      pathname: '/news/list',
      state: { page: data.activePage },
    })
  }

  render() {
    const { news_list } = this.props
    return (
      <div>
        <Segment basic>
          <Container>
            <VerticallyPaddedContainer size="4">
              <Header as="h1" content="News" />
              <p>Read about the latest updates and progress.</p>
              <Divider />
              {news_list.error ? (
                <CustomErrorMessage
                  header="An error occured"
                  content={news_list.message}
                />
              ) : news_list.docs ? (
                <Fragment>
                  {news_list.docs.map(item => (
                    <Segment key={item._id} stacked padded>
                      <Header as="h3" content={item.title} />

                      <p>{item.summary}</p>
                      <Button
                        compact
                        color="green"
                        onClick={() => this.handleViewNewsArticle(item._id)}
                      >
                        <Icon name="eye" />
                        Read more
                      </Button>
                      <Divider />
                      <Label.Group>
                        <Label
                          icon="clock"
                          size="tiny"
                          content={`Posted ${dateDiffString(item.createdAt)}`}
                        />
                        <Label
                          icon="tag"
                          color="violet"
                          size="tiny"
                          content={item.category}
                        />
                      </Label.Group>
                    </Segment>
                  ))}
                  <Pagination
                    activePage={news_list.page}
                    firstItem={{
                      content: <Icon name="angle double left" />,
                      icon: true,
                    }}
                    lastItem={{
                      content: <Icon name="angle double right" />,
                      icon: true,
                    }}
                    prevItem={{
                      content: <Icon name="angle left" />,
                      icon: true,
                    }}
                    nextItem={{
                      content: <Icon name="angle right" />,
                      icon: true,
                    }}
                    totalPages={news_list.totalPages}
                    onPageChange={this.handlePageChange}
                  />
                </Fragment>
              ) : (
                <Fragment>
                  {new Array(5).fill(true).map(x => (
                    <Segment padded stacked>
                      <Placeholder fluid>
                        <Placeholder.Paragraph>
                          <Placeholder.Line />
                          <Placeholder.Line />
                          <Placeholder.Line />
                          <Placeholder.Line />
                          <Placeholder.Line />
                          <Placeholder.Line />
                          <Placeholder.Line />
                          <Placeholder.Line />
                        </Placeholder.Paragraph>
                      </Placeholder>
                    </Segment>
                  ))}
                </Fragment>
              )}
            </VerticallyPaddedContainer>
          </Container>
        </Segment>
        <FeedbackCtaSection />
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

export default connect(mapStateToProps, mapDispatchToProps)(NewsListPage)
