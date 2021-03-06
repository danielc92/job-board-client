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
import { setMenuItem } from 'actions/menu'
import { getSkills } from 'actions/skills'
import { getBenefits } from 'actions/benefit'
import { getCategories } from 'actions/category'
import { getLocationList } from 'actions/location'
import { createJob, resetJob } from 'actions/job'
import { checkTokenIsValid } from 'helpers/auth'
import { logoutUser } from 'actions/account/auth'
import {
  StringValidator,
  IsEmptyValidator,
  SalaryRangeValidator,
  ListValidator,
  StringCharacterValidator,
} from 'helpers/validation'
import { calculateProgress } from 'helpers/progressbar'
import VerticallyPaddedContainer from 'components/layout/VerticallyPaddedContainer'
import ReactProgressContainer from './ProgressSection'
import CustomAuthMessage from 'components/reusable/CustomAuthMessage'
import { SESSION_EXPIRED_MESSAGE, ALLOWED_CHARS_JOB } from 'app_constants'
import { debounce } from 'lodash'
import BannerGroup from 'components/banners/BannerGroup'
const initialState = {
  title: '',
  category: '',
  skills: [],
  benefits: [],
  company_summary: '',
  job_summary: '',
  company_name: '',
  contact_summary: '',
  salary_range_low: '',
  salary_range_high: '',
  employment_type: '',
  errors: [],
  location: {},
  percent: 0,
  searchQuery: '',
}

const employment_types = [
  'full-time',
  'part-time',
  'casual',
  'fixed-term',
  'shift worker',
  'daily/weekly hire',
  'probation',
  'outworkers',
  'other',
]

const employment_types_transformed = employment_types.map((i) => ({
  text: i,
  key: i,
  value: i,
}))

class JobPostPage extends Component {
  constructor(props) {
    super(props)
    this.handleSearchChange = debounce(this.handleSearchChange.bind(this), 500)
  }
  //Internal state holds information pertaining to the form
  state = {
    ...initialState,
  }

  closeModal = () => {
    this.props.propsResetJob()
  }

  customRender = (label) => ({
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
      company_name,
      job_summary,
      contact_summary,
      salary_range_high,
      salary_range_low,
      employment_type,
    } = this.state

    const errors = [
      ...StringValidator(company_summary, 1, 500, 'Company summary'),
      ...StringValidator(job_summary, 1, 500, 'Job summary'),
      ...StringValidator(contact_summary, 1, 500, 'Contact information'),
      ...StringValidator(company_name, 0, 50, 'Company name'),
      ...ListValidator(skills, 1, 10, 'Skills'),
      ...ListValidator(benefits, 1, 10, 'Benefits'),
      ...StringValidator(title, 1, 50, 'Job title'),
      ...StringCharacterValidator(title, ALLOWED_CHARS_JOB, 'Job title'),
      ...IsEmptyValidator(category, 'Job category'),
      ...IsEmptyValidator(employment_type, 'Employment type'),
      ...IsEmptyValidator(salary_range_low, 'Salary (minimum)'),
      ...IsEmptyValidator(salary_range_high, 'Salary (maximum)'),
      ...SalaryRangeValidator(salary_range_low, salary_range_high),
    ]

    this.setState({ errors }, () => {
      const percent = calculateProgress([...this.state.errors])
      this.setState({ percent })
    })
  }

  handleInputChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value }, () => this.validateForm())
  }

  handleDropdownChange = (event, data) => {
    const limit = 10
    const { name, value } = data
    if (value.length <= limit) {
      this.setState({ [name]: value }, () => this.validateForm())
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { errors, location } = this.state
    // Initial check to see if token has expired
    if (!checkTokenIsValid()) {
      this.props.propsLogoutUser()
      this.props.history.push({
        pathname: '/sign-in',
        state: { redirect_message: SESSION_EXPIRED_MESSAGE },
      })
      return
    }

    // Check if there are errors present, before dispatching
    if (errors.length === 0) {
      const {
        title,
        category,
        skills,
        benefits,
        company_name,
        company_summary,
        job_summary,
        contact_summary,
        salary_range_high,
        salary_range_low,
        employment_type,
      } = this.state

      let payload = {
        title,
        category,
        skills,
        benefits,
        company_name,
        company_summary,
        job_summary,
        contact_summary,
        salary_range_high,
        salary_range_low,
        employment_type,
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

  handleSearchChange = (event, data) => {
    const { searchQuery } = data
    const { propsGetLocations, locations } = this.props
    const cleanQuery = searchQuery.trim()
    this.setState({ searchQuery: cleanQuery })
    const exists = locations.filter((i) => i.search === cleanQuery)

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
      (item) => item.search === searchQuery
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
                        placeholder="Construction Labourer"
                        label="Job Title"
                        maxLength={50}
                      />
                      <Form.Dropdown
                        onChange={this.handleDropdownChange}
                        value={this.state.skills}
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
                        value={this.state.benefits}
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
                        onSearchChange={this.handleSearchChange}
                        onChange={this.handleDropdownChange}
                        name="location"
                        label="Location"
                        placeholder="Search suburb, postcode, state"
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

                      <Form.Dropdown
                        onChange={this.handleDropdownChange}
                        name="employment_type"
                        label="Employment Type"
                        placeholder="Select employment type"
                        fluid
                        selection
                        options={employment_types_transformed}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Input
                        onChange={this.handleInputChange}
                        name="salary_range_low"
                        type="number"
                        label="Minimum salary ($)"
                        min={0}
                      />

                      <Form.Input
                        onChange={this.handleInputChange}
                        name="salary_range_high"
                        type="number"
                        label="Maximum salary ($)"
                        min={0}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Input
                        onChange={this.handleInputChange}
                        name="company_name"
                        type="text"
                        label="Company name"
                        placeholder="XYZ ltd"
                        maxLength={50}
                      />
                    </Form.Group>

                    <Form.TextArea
                      width={12}
                      onChange={this.handleInputChange}
                      name="company_summary"
                      maxLength="500"
                      placeholder="A well established construction company based in the heart of Melbourne..."
                      label={`About the company (${
                        500 - company_summary.length
                      } chars remaining)`}
                    />

                    <Form.TextArea
                      width={12}
                      onChange={this.handleInputChange}
                      name="job_summary"
                      maxLength="500"
                      placeholder="A short description about the job"
                      label={`About the job (${
                        500 - job_summary.length
                      } chars remaining)`}
                    />

                    <Form.TextArea
                      width={12}
                      onChange={this.handleInputChange}
                      name="contact_summary"
                      maxLength="500"
                      placeholder="Enter any contact details..."
                      label={`Contact details (${
                        500 - contact_summary.length
                      } chars remaining)`}
                    />

                    <Form.Button
                      loading={job.loading}
                      disabled={!(errors.length === 0)}
                      size="big"
                      color="green"
                    >
                      <Icon name="add square"></Icon>Create job
                    </Form.Button>

                    <Modal
                      open={job.data || job.error ? true : false}
                      dimmer="blurring"
                      onClose={this.closeModal}
                    >
                      <Modal.Header>
                        {job.error ? 'Error' : 'Success'}
                      </Modal.Header>
                      <Modal.Content>
                        {job.error
                          ? job.message
                          : 'Your job has been posted successfully!'}
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
        <BannerGroup showFeedback />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
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
