import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Label,
  Pagination,
  Segment,
  Placeholder,
} from 'semantic-ui-react'
import { setMenuItem } from 'actions/menu'
import { getJobList } from 'actions/job_list_seeker'
import { properCaseTransform, dateDiffString } from 'helpers/generic'
import SearchContainer from './JobListSearchSection'
import VerticallyPaddedContainer from 'components/layout/VerticallyPaddedContainer'
import CustomErrorMessage from 'components/reusable/CustomErrorMessage'
import {
  queryStringToObjectParser,
  objectToQueryStringParser,
} from 'helpers/query'
import BannerGroup from 'components/banners/BannerGroup'
const { Line, Paragraph } = Placeholder

class JobListContainer extends Component {
  componentDidMount() {
    this.props.propsSetMenuItem('find')
    const object = queryStringToObjectParser(this.props.history.location.search)
    this.props.propsGetJobList(object)
  }

  handlePageChange = (event, data) => {
    const query = this.props.history.location.search
    let object = query ? queryStringToObjectParser(query) : {}
    object.page = data.activePage
    const newQuery = objectToQueryStringParser(object)

    this.props.history.push({
      pathname: '/job-list',
      search: newQuery,
    })
  }

  handleViewJob = (slug) => {
    const { history } = this.props
    history.push({
      pathname: `/job-detail/${slug}`,
    })
  }

  componentWillReceiveProps() {
    if (
      this.props.history &&
      this.props.history.location.search !== this.props.location.search
    ) {
      const object = queryStringToObjectParser(
        this.props.history.location.search
      )
      this.props.propsGetJobList(object)
    }
  }

  render() {
    const { data, error, message } = this.props.job_list_seeker
    const { state } = this.props.history.location
    return (
      <Fragment>
        <SearchContainer />
        <Segment basic>
          <Container text>
            <VerticallyPaddedContainer size="1">
              {error ? (
                <Fragment>
                  <Header as="h1" content="Job listings" />
                  <CustomErrorMessage
                    header="An error occured"
                    content={message}
                  />
                </Fragment>
              ) : data ? (
                <Fragment>
                  <Header as="h1" content="Job listings" />
                  <p>We found {data.totalDocs} jobs matching your search</p>
                  {state ? (
                    <Label.Group>
                      {[
                        state.title,
                        state.location_string,
                        state.category,
                      ].map((i) => (i ? <Label size="tiny">{i}</Label> : null))}
                    </Label.Group>
                  ) : null}

                  <Divider></Divider>
                  {data.docs.map((item, index) => (
                    <Segment stacked padded key={index.toString()}>
                      <Header
                        as="h3"
                        content={properCaseTransform(item.title)}
                      />

                      <p>{item.job_summary}</p>

                      <Button
                        color="green"
                        size="tiny"
                        onClick={() => this.handleViewJob(item.slug)}
                      >
                        <Icon name="eye"></Icon>View this job
                      </Button>
                      <Divider />
                      <Label.Group>
                        <Label
                          icon="clock"
                          size="tiny"
                          content={`Posted ${dateDiffString(item.createdAt)}`}
                        />
                        <Label color="green" basic>
                          ${item.salary_range_low} - ${item.salary_range_high}
                        </Label>
                        <Label color="green" basic>
                          {item.category}
                        </Label>
                      </Label.Group>
                    </Segment>
                  ))}

                  <Pagination
                    activePage={data.page}
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
                    totalPages={data.totalPages}
                    onPageChange={this.handlePageChange}
                  />
                </Fragment>
              ) : (
                <Fragment>
                  <Header as="h1" content="Job listings" />

                  {new Array(6).fill(true).map((item, index) => (
                    <Segment padded stacked key={index.toString()}>
                      <Placeholder>
                        <Paragraph>
                          <Line /> <Line /> <Line /> <Line /> <Line /> <Line />
                        </Paragraph>
                      </Placeholder>
                    </Segment>
                  ))}
                </Fragment>
              )}
            </VerticallyPaddedContainer>
          </Container>
        </Segment>
        <BannerGroup showFeedback />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { job_list_seeker, theme } = state
  return {
    job_list_seeker,
    theme,
  }
}

const mapDispatchToProps = {
  propsSetMenuItem: setMenuItem,
  propsGetJobList: getJobList,
}

export default connect(mapStateToProps, mapDispatchToProps)(JobListContainer)
