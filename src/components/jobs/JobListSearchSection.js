import React, { Component } from 'react'
import { Segment, Container, Header, Form, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router'
import { getCategories } from '../../actions/category'
import { getJobList } from '../../actions/job_list_seeker'
import { getLocationList } from '../../actions/location'
import VerticallyPaddedContainer from '../layout/VerticallyPaddedContainer'

class JobListSearchSection extends Component {
  state = {
    title: '',
    location_string: '',
    category: '',
    searchQuery: '',
  }

  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSearchChange = (event, data) => {
    const { searchQuery } = data
    const { locations, propsGetLocations } = this.props
    const cleanQuery = searchQuery.trim()
    this.setState({ searchQuery: cleanQuery })

    const exists = locations.filter(i => i.search === cleanQuery)
    // No duplicate requests
    if (cleanQuery.length >= 2 && exists.length === 0) {
      propsGetLocations(searchQuery)
    }
  }

  handleDropDownChange = (e, data) => {
    this.setState({ [data.name]: data.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { title, location_string, category } = this.state
    const { history, propsGetJobList } = this.props
    history.push({
      pathname: '/job/list',
      state: {
        title,
        location_string: location_string.location_string,
        category,
      },
    })

    propsGetJobList({
      title,
      location_string: location_string.location_string,
      category,
    })
  }

  componentDidMount() {
    const { category } = this.props
    if (!category.data) {
      this.props.propsGetCategories()
    }
  }

  render() {
    const { title, searchQuery } = this.state
    const { locations, category } = this.props
    const locationOptions = locations.filter(
      item => item.search === searchQuery
    )
    return (
      <Segment basic>
        <Container>
          <VerticallyPaddedContainer size="3">
            <Header as="h1" content="Find your dream job." />
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Input
                  style={{ marginBottom: '12px' }}
                  label="What"
                  autoComplete="off"
                  maxLength={30}
                  name="title"
                  onChange={this.handleInputChange}
                  placeholder="Enter some keywords..."
                  value={title}
                />
                <Form.Dropdown
                  style={{ marginBottom: '12px' }}
                  clearable
                  label="Where"
                  onChange={this.handleDropDownChange}
                  onSearchChange={this.handleSearchChange}
                  options={
                    locationOptions.length > 0 ? locationOptions[0]['data'] : []
                  }
                  placeholder="Enter location, postcode, state"
                  search
                  selection
                  selectOnNavigation={false}
                  name="location_string"
                />
                <Form.Dropdown
                  style={{ marginBottom: '12px' }}
                  clearable
                  onChange={this.handleDropDownChange}
                  name="category"
                  label="Category"
                  placeholder="Select category"
                  selection
                  search
                  options={category ? category.data : []}
                />
              </Form.Group>

              <Form.Group>
                <Form.Button size="large" color="green">
                  <Icon name="search"></Icon>Search
                </Form.Button>
              </Form.Group>
            </Form>
          </VerticallyPaddedContainer>
        </Container>
      </Segment>
    )
  }
}

const mapStateToProps = state => {
  return {
    locations: state.locationList,
    category: state.category,
  }
}

const mapDispatchToProps = {
  propsGetLocations: getLocationList,
  propsGetCategories: getCategories,
  propsGetJobList: getJobList,
}
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(JobListSearchSection)
