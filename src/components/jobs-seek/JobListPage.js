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
import { setMenuItem } from '../../actions/menu'
import { getJobList } from '../../actions/job_list_seeker'
import { properCaseTransform } from '../../helpers/generic'
import SearchContainer from './JobListSearchSection'
import VerticallyPaddedContainer from '../layout/VerticallyPaddedContainer'
import CustomErrorMessage from '../reusable/CustomErrorMessage'
import FeedbackCtaSection from '../feedback/FeedbackCtaSection'
const { Line, Paragraph } = Placeholder

class JobListContainer extends Component {
  componentDidMount() {
    this.props.propsSetMenuItem('find')
    this.props.propsGetJobList({ ...this.props.history.location.state })
  }

  handlePageChange = (event, data) => {
    const { history } = this.props
    const { activePage } = data
    history.push({
      pathname: '/job/list',
      state: { ...history.location.state, page: activePage },
    })
  }

  handleViewJob = job_id => {
    const { history } = this.props
    history.push({
      pathname: '/job',
      state: { job_id },
    })
  }

  componentWillReceiveProps() {
    try {
      if (
        this.props.history.location.state.title !==
          this.props.location.state.title ||
        this.props.history.location.state.page !==
          this.props.location.state.page ||
        this.props.history.location.state.category !==
          this.props.location.state.category ||
        this.props.history.location.state.location_string !==
          this.props.location.state.location_string
      ) {
        let queryObject = { ...this.props.history.location.state }

        if (
          this.props.history.location.state.title !==
            this.props.location.state.title ||
          this.props.history.location.state.category !==
            this.props.location.state.category ||
          this.props.history.location.state.location_string !==
            this.props.location.state.location_string
        ) {
          delete queryObject['page']
        }
        this.props.propsGetJobList(queryObject)
      }
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const { data, error, message } = this.props.job_list_seeker
    const { state } = this.props.history.location
    return (
      <Fragment>
        <SearchContainer />
        <Segment basic>
          <Container>
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
                      ].map(i => (i ? <Label size="tiny">{i}</Label> : null))}
                    </Label.Group>
                  ) : null}

                  <Divider></Divider>
                  {data.docs.map(item => (
                    <Segment stacked key={item._id}>
                      <Header
                        as="h3"
                        content={properCaseTransform(item.title)}
                      />

                      <p>{item.job_summary}</p>
                      <Label color="green" basic>
                        ${item.salary_range_low} - ${item.salary_range_high}
                      </Label>
                      <Divider />
                      <Button
                        color={this.props.theme}
                        size="tiny"
                        onClick={() => this.handleViewJob(item._id)}
                      >
                        <Icon name="eye"></Icon>view this job
                      </Button>
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

                  {new Array(6).fill(true).map(item => (
                    <Segment padded stacked>
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
        <FeedbackCtaSection />
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
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
