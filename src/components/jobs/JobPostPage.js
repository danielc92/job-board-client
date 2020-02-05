import React, { Component, Fragment } from 'react'
import {
  Segment,
  Modal,
  Button,
  Container,
  Header,
  Form,
  Message,
  Icon,
  Divider,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setMenuItem } from '../../actions/menu'
import { getSkills } from '../../actions/skills'
import { getBenefits } from '../../actions/benefit'
import { getCategories } from '../../actions/category'
import { getLocationList } from '../../actions/location'
import { createJob, resetJob } from '../../actions/job'
import { checkTokenIsValid } from '../../helpers/auth'
import { logoutUser } from '../../actions/auth'
import {
  StringValidator,
  IsEmptyValidator,
  SalaryRangeValidator,
  ListValidator,
} from '../../helpers/validation'
import { calculateProgress } from '../../helpers/progressbar'
import VerticallyPaddedContainer from '../layout/VerticallyPaddedContainer'
import ReactProgressContainer from './ProgressSection'
import CustomAuthMessage from '../placeholder/CustomAuthMessage'
import FeedbackCtaSection from '../feedback/FeedbackCtaSection'

class JobPostPage extends Component {
  //Internal state holds information pertaining to the form
  state = {
    title: '',
    category: '',
    skills: [],
    benefits: [],
    company_summary: '',
    job_summary: '',
    contact_summary: '',
    salary_range_low: '',
    salary_range_high: '',
    errors: [],
    location: {},
    percent: 0,
    searchQuery: '',
  }

  closeModal = () => {
    this.props.propsResetJob()
  }

  customRender = label => ({
    color: 'green',
    content: label.text,
  })

  validateForm = () => {
    const {
      title,
      category,
      skills,
      benefits,
      company_summary,
      job_summary,
      contact_summary,
      salary_range_high,
      salary_range_low,
    } = this.state

    let companyErrors = StringValidator(
      company_summary,
      0,
      500,
      'Company summary'
    )
    let jobErrors = StringValidator(job_summary, 0, 500, 'Job summary')
    let contactErrors = StringValidator(
      contact_summary,
      0,
      500,
      'Contact information'
    )
    let skillErrors = ListValidator(skills, 1, 'Skills')
    let benefitErrors = ListValidator(benefits, 1, 'Benefits')
    let titleErrors = StringValidator(title, 1, 50, 'Job title')
    let categoryErrors = IsEmptyValidator(category, 'Job category')
    let salaryLowErrors = IsEmptyValidator(salary_range_low, 'Salary (minimum)')
    let salaryHighErrors = IsEmptyValidator(
      salary_range_high,
      'Salary (maximum)'
    )
    let salaryRangeErorrs = SalaryRangeValidator(
      salary_range_low,
      salary_range_high
    )

    let errors = [
      ...companyErrors,
      ...jobErrors,
      ...contactErrors,
      ...skillErrors,
      ...benefitErrors,
      ...titleErrors,
      ...categoryErrors,
      ...salaryLowErrors,
      ...salaryHighErrors,
      ...salaryRangeErorrs,
    ]

    this.setState({ errors }, () => {
      const percent = calculateProgress([...this.state.errors])
      this.setState({ percent })
    })
  }

  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value }, () => this.validateForm())
  }

  handleDropdownChange = (event, data) => {
    const { name, value } = data
    this.setState({ [name]: value }, () => this.validateForm())
  }

  handleSubmit = e => {
    e.preventDefault()
    const { errors, location } = this.state
    // Initial check to see if token has expired
    if (!checkTokenIsValid()) {
      this.props.propsLogoutUser()
      this.props.history.push({
        pathname: '/sign-in',
        state: { redirect_message: 'You need to be logged in to post a job.' },
      })
    }
    // Check if there are errors present, before dispatching
    if (errors.length === 0) {
      const {
        title,
        category,
        skills,
        benefits,
        company_summary,
        job_summary,
        contact_summary,
        salary_range_high,
        salary_range_low,
      } = this.state

      let payload = {
        title,
        category,
        skills,
        benefits,
        company_summary,
        job_summary,
        contact_summary,
        salary_range_high,
        salary_range_low,
        creator_id: this.props.auth.user._id,
      }

      if (Object.entries(location).length > 0) {
        payload = {
          ...payload,
          location: location.location,
          location_string: location.location_string,
        }
      }

      this.props.propsCreateJob(payload)
    }
  }

  componentDidMount() {
    this.validateForm()
    this.props.propsSetMenuItem('create')
    this.props.propsGetSkills()
    this.props.propsGetCategories()
    this.props.propsGetBenefits()
    this.props.propsGetLocations()
  }

  handleBetaLocationHandler = (event, data) => {
    const { searchQuery } = data
    const { propsGetLocations, locations } = this.props
    const cleanQuery = searchQuery.trim()
    this.setState({ searchQuery: cleanQuery })
    const exists = locations.filter(i => i.search === cleanQuery)

    // No duplicate requests
    if (cleanQuery.length >= 2 && exists.length === 0) {
      propsGetLocations(searchQuery)
    }
  }

  render() {
    const {
      errors,
      job_summary,
      company_summary,
      percent,
      contact_summary,
      searchQuery,
    } = this.state
    const { auth, benefit, category, job, locations, skill } = this.props

    const locationOptions = locations.filter(
      item => item.search === searchQuery
    )

    return (
      <Fragment>
        <Segment basic>
          <Container>
            <VerticallyPaddedContainer size="4">
              <Header as="h1" content="Post a job" />
              <p>Start a new job posting for the world to see.</p>
              <Divider />
              {!auth.user.is_employer ? (
                <CustomAuthMessage
                  header="Invalid member type"
                  content="You need to be logged in as an employer to post a job."
                />
              ) : (
                <Fragment>
                  <ReactProgressContainer percent={percent} />
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths={'equal'}>
                      <Form.Input
                        onChange={this.handleInputChange}
                        name="title"
                        placeholder="Zoo keeper"
                        label="Job Title"
                      />

                      <Form.Dropdown
                        onChange={this.handleDropdownChange}
                        name="skills"
                        label="Skills"
                        placeholder="Add skills"
                        multiple
                        search
                        selection
                        options={skill.data}
                        renderLabel={this.customRender}
                      ></Form.Dropdown>

                      <Form.Dropdown
                        onChange={this.handleDropdownChange}
                        name="benefits"
                        label="Benefits"
                        placeholder="Add benefits"
                        multiple
                        search
                        selection
                        options={benefit.data}
                        renderLabel={this.customRender}
                      ></Form.Dropdown>
                    </Form.Group>

                    <Form.Group widths="equal">
                      <Form.Dropdown
                        onSearchChange={this.handleBetaLocationHandler}
                        onChange={this.handleDropdownChange}
                        name="location"
                        label="Location"
                        placeholder="Search for a location"
                        fluid
                        selectOnNavigation={false}
                        selection
                        search
                        renderLabel={this.customRender}
                        options={
                          locationOptions.length > 0
                            ? locationOptions[0]['data']
                            : null
                        }
                      />
                      <Form.Dropdown
                        onChange={this.handleDropdownChange}
                        name="category"
                        label="Category"
                        placeholder="Select category"
                        fluid
                        selection
                        search
                        options={category.data}
                      />
                      <Form.Input
                        onChange={this.handleInputChange}
                        name="salary_range_low"
                        type="number"
                        label="Minimum salary ($)"
                      />

                      <Form.Input
                        onChange={this.handleInputChange}
                        name="salary_range_high"
                        type="number"
                        label="Maximum salary ($)"
                      />
                    </Form.Group>

                    <Form.TextArea
                      width={12}
                      onChange={this.handleInputChange}
                      name="company_summary"
                      maxLength="500"
                      placeholder="A short description about the company"
                      label={`About the company (${500 -
                        company_summary.length} chars remaining)`}
                    />

                    <Form.TextArea
                      width={12}
                      onChange={this.handleInputChange}
                      name="job_summary"
                      maxLength="500"
                      placeholder="A short description about the job"
                      label={`About the job (${500 -
                        job_summary.length} chars remaining)`}
                    />

                    <Form.TextArea
                      width={12}
                      onChange={this.handleInputChange}
                      name="contact_summary"
                      maxLength="500"
                      placeholder="Enter any contact details..."
                      label={`Contact details (${500 -
                        contact_summary.length} chars remaining)`}
                    />

                    <Form.Button size="big" color="green">
                      <Icon name="add square"></Icon>Create job
                    </Form.Button>

                    <Message
                      error
                      visible={job.error}
                      header="Error"
                      content={job.message}
                    ></Message>

                    <Modal
                      open={Object.entries(job.data).length > 0}
                      dimmer="blurring"
                      onClose={this.closeModal}
                    >
                      <Modal.Header>Success</Modal.Header>
                      <Modal.Content>
                        Your job has been posted successfully!
                      </Modal.Content>
                      <Modal.Actions>
                        <Button onClick={this.closeModal} color="green">
                          Confirm
                        </Button>
                      </Modal.Actions>
                    </Modal>
                  </Form>
                  {errors.length === 0 ? (
                    <Message
                      success
                      header="Validation successful"
                      content="You may proceed to post this job."
                    ></Message>
                  ) : (
                    <Message info list={errors} header="Form requirements" />
                  )}
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
  return {
    auth: state.auth,
    benefit: state.benefit,
    category: state.category,
    job: state.job,
    skill: state.skill,
    locations: state.locationList,
  }
}

const mapDispatchToProps = {
  propsSetMenuItem: setMenuItem,
  propsGetSkills: getSkills,
  propsGetBenefits: getBenefits,
  propsGetCategories: getCategories,
  propsCreateJob: createJob,
  propsResetJob: resetJob,
  propsLogoutUser: logoutUser,
  propsGetLocations: getLocationList,
}

export default connect(mapStateToProps, mapDispatchToProps)(JobPostPage)
