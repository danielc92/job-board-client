import React, { Component, Fragment } from 'react'
import {
  Header,
  Button,
  Segment,
  Input,
  Message,
  Table,
  Form,
  Icon,
  TextArea,
  Label,
} from 'semantic-ui-react'
import { getCareerProfile, updateCareerProfile } from 'actions/career_profile'
import { logoutUser } from 'actions/account/auth'
import { DateValidator } from 'helpers/validation'
import { getSkills } from 'actions/skills'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router'
import { checkTokenIsValid } from 'helpers/auth'
import { SESSION_EXPIRED_MESSAGE } from 'app_constants'

const uuidv4 = require('uuid/v4')
const marginBottom = { marginBottom: '8px' }
class SeekerProfile extends Component {
  state = {
    achievements: [],
    available: false,
    editAchievements: false,
    editAvailability: false,
    editEducation: false,
    editExperience: false,
    editPhone: false,
    editSkills: false,
    editSummary: false,
    education: [],
    experience: [],
    phone: '',
    skills: [],
    summary: '',

    experienceStart: '',
    experienceEnd: '',
    experienceTitle: '',
    experienceDetails: '',
    experienceCompany: '',

    educationSchool: '',
    educationStart: '',
    educationEnd: '',
    educationGpa: 0,
    educationCourse: '',

    errorsForEducation: [],
    errorsForExperience: [],
  }

  componentDidMount() {
    this.props.propsGetCareerProfile()
    if (this.props.skill.data && this.props.skill.data.length === 0) {
      this.props.propsGetSkills()
    }
  }

  handleSummaryUpdate = () => {
    if (!checkTokenIsValid()) {
      this.props.propsLogoutUser()
      this.props.history.push({
        pathname: '/sign-in',
        state: {
          redirect_message: SESSION_EXPIRED_MESSAGE,
        },
      })
      return
    }

    const { summary } = this.state
    const payload = { summary }
    this.props.propsUpdateCareerProfile(payload)
  }

  handleEditSummary = () => {
    const { career_profile } = this.props
    this.setState({ summary: career_profile.data.summary, editSummary: true })
  }

  handleUpdateSummary = () => {
    if (!checkTokenIsValid()) {
      this.props.propsLogoutUser()
      this.props.history.push({
        pathname: '/sign-in',
        state: {
          redirect_message: SESSION_EXPIRED_MESSAGE,
        },
      })
      return
    }

    const { summary } = this.state
    const { propsUpdateCareerProfile } = this.props
    propsUpdateCareerProfile({ summary })
    this.setState({ editSummary: false })
  }

  handleEditPhone = () => {
    const { career_profile } = this.props
    this.setState({ phone: career_profile.data.phone, editPhone: true })
  }

  handleUpdatePhone = () => {
    if (!checkTokenIsValid()) {
      this.props.propsLogoutUser()
      this.props.history.push({
        pathname: '/sign-in',
        state: {
          redirect_message: SESSION_EXPIRED_MESSAGE,
        },
      })
      return
    }

    const { phone } = this.state
    const { propsUpdateCareerProfile } = this.props
    propsUpdateCareerProfile({ phone })
    this.setState({ editPhone: false })
  }

  handleEditAvailability = () => {
    const { career_profile } = this.props
    this.setState({
      available: career_profile.data.available,
      editAvailability: true,
    })
  }

  handleUpdateAvailability = () => {
    if (!checkTokenIsValid()) {
      this.props.propsLogoutUser()
      this.props.history.push({
        pathname: '/sign-in',
        state: {
          redirect_message: SESSION_EXPIRED_MESSAGE,
        },
      })
      return
    }

    const { available } = this.state
    const { propsUpdateCareerProfile } = this.props
    propsUpdateCareerProfile({ available })
    this.setState({ editAvailability: false })
  }

  handleEditExperience = () => {
    const { career_profile } = this.props
    this.setState({
      experience: career_profile.data.experience,
      editExperience: true,
    })
  }

  handleUpdateExperience = () => {
    if (!checkTokenIsValid()) {
      this.props.propsLogoutUser()
      this.props.history.push({
        pathname: '/sign-in',
        state: {
          redirect_message: SESSION_EXPIRED_MESSAGE,
        },
      })
      return
    }

    const {
      experience,
      experienceCompany,
      experienceDetails,
      experienceEnd,
      experienceTitle,
      experienceStart,
    } = this.state
    const newEntry = {
      company: experienceCompany,
      details: experienceDetails,
      start: experienceStart,
      end: experienceEnd,
      title: experienceTitle,
      key: uuidv4(),
    }
    // Validate Dates
    const startDateErrors = DateValidator('Start date', experienceStart)
    const endDateErrors = DateValidator('End date', experienceEnd)
    const errorsForExperience = [...endDateErrors, ...startDateErrors]

    if (errorsForExperience.length === 0) {
      this.props.propsUpdateCareerProfile({
        experience: [...experience, newEntry],
      })
      this.setState({ experience: [...experience, newEntry] })
      this.setState({ editExperience: false, errorsForExperience: [] })
    } else {
      this.setState({ errorsForExperience })
    }
  }

  handleEditEducation = () => {
    const { career_profile } = this.props
    this.setState({
      education: career_profile.data.education,
      editEducation: true,
    })
  }

  handleUpdateEducation = () => {
    if (!checkTokenIsValid()) {
      this.props.propsLogoutUser()
      this.props.history.push({
        pathname: '/sign-in',
        state: {
          redirect_message: SESSION_EXPIRED_MESSAGE,
        },
      })
      return
    }

    const {
      education,
      educationCourse,
      educationEnd,
      educationGpa,
      educationSchool,
      educationStart,
    } = this.state
    const newEntry = {
      course: educationCourse,
      end: educationEnd,
      start: educationStart,
      school: educationSchool,
      gpa: educationGpa,
      key: uuidv4(),
    }

    // Validate Dates
    const startDateErrors = DateValidator('Start date', educationStart)
    const endDateErrors = DateValidator('End date', educationEnd)
    const errorsForEducation = [...endDateErrors, ...startDateErrors]

    if (errorsForEducation.length === 0) {
      this.props.propsUpdateCareerProfile({
        education: [...education, newEntry],
      })
      this.setState({ education: [...education, newEntry] })
      this.setState({ editEducation: false, errorsForEducation: [] })
    } else {
      this.setState({ errorsForEducation })
    }
  }

  handleEditSkills = () => {
    const { career_profile } = this.props
    this.setState({
      skills: career_profile.data.skills,
      editSkills: true,
    })
  }

  handleUpdateSkills = () => {
    if (!checkTokenIsValid()) {
      this.props.propsLogoutUser()
      this.props.history.push({
        pathname: '/sign-in',
        state: {
          redirect_message: SESSION_EXPIRED_MESSAGE,
        },
      })
      return
    }

    const { skills } = this.state
    this.props.propsUpdateCareerProfile({ skills })
    this.setState({ editSkills: false })
  }

  handleChangeSkills = (event, data) => {
    const { value } = data
    if (value.length <= 15) {
      this.setState({ skills: data.value })
    }
  }

  handleDeleteExperience = (key) => {
    if (!checkTokenIsValid()) {
      this.props.propsLogoutUser()
      this.props.history.push({
        pathname: '/sign-in',
        state: {
          redirect_message: SESSION_EXPIRED_MESSAGE,
        },
      })
      return
    }

    let experience = this.props.career_profile.data.experience.filter(
      (item) => item.key !== key
    )
    this.props.propsUpdateCareerProfile({ experience })
  }

  handleDeleteEducation = (key) => {
    if (!checkTokenIsValid()) {
      this.props.propsLogoutUser()
      this.props.history.push({
        pathname: '/sign-in',
        state: {
          redirect_message: SESSION_EXPIRED_MESSAGE,
        },
      })
      return
    }

    let education = this.props.career_profile.data.education.filter(
      (item) => item.key !== key
    )
    this.props.propsUpdateCareerProfile({ education })
  }

  render() {
    const {
      editAvailability,
      editEducation,
      editExperience,
      editPhone,
      editSkills,
      editSummary,
      phone,
      summary,

      experienceStart,
      experienceEnd,
      experienceTitle,
      experienceDetails,
      experienceCompany,

      educationCourse,
      educationSchool,
      educationStart,
      educationGpa,
      educationEnd,

      errorsForEducation,
      errorsForExperience,
    } = this.state

    const { career_profile, skill } = this.props
    const { data } = career_profile

    return (
      <Fragment>
        {data ? (
          <Fragment>
            {/* CAREER SUMMARY SECTION */}
            <Header as="h3" content="Career Details" />
            <Segment stacked padded>
              <Header as="h5" content="Summary" />

              {editSummary ? (
                <Fragment>
                  <Form>
                    <TextArea
                      maxLength="300"
                      style={marginBottom}
                      value={summary}
                      onChange={(e) =>
                        this.setState({ summary: e.target.value })
                      }
                      placeholder={
                        data.summary.length === 0
                          ? 'You have no summary, you can create one now.'
                          : null
                      }
                    />
                  </Form>
                  <Button
                    size="small"
                    color="violet"
                    onClick={this.handleUpdateSummary}
                  >
                    <Icon name="refresh" />
                    Update
                  </Button>
                  <Button
                    size="small"
                    color="red"
                    onClick={() => this.setState({ editSummary: false })}
                  >
                    <Icon name="cancel" />
                    Cancel
                  </Button>
                </Fragment>
              ) : (
                <Fragment>
                  <p>
                    {data.summary.length > 0
                      ? data.summary
                      : 'You have no summary, click edit to begin.'}
                  </p>
                  <Button
                    size="small"
                    color="green"
                    onClick={this.handleEditSummary}
                  >
                    <Icon name="edit outline" />
                    Edit
                  </Button>
                </Fragment>
              )}
            </Segment>

            <Header as="h3" content="Skills" />
            <Segment stacked padded>
              {editSkills ? (
                <Form>
                  <Form.Dropdown
                    onChange={this.handleChangeSkills}
                    value={this.state.skills}
                    name="skills"
                    label="Skills"
                    placeholder="Add skills"
                    multiple
                    search
                    selection
                    options={skill.data}
                    renderLabel={this.customRender}
                    defaultValue={data.skills}
                  ></Form.Dropdown>
                  <Form.Field>
                    <Button
                      size="small"
                      color="violet"
                      onClick={this.handleUpdateSkills}
                    >
                      <Icon name="refresh" />
                      Update
                    </Button>
                    <Button
                      size="small"
                      color="red"
                      onClick={() => this.setState({ editSkills: false })}
                    >
                      <Icon name="cancel" />
                      Cancel
                    </Button>
                  </Form.Field>
                </Form>
              ) : (
                <Fragment>
                  {data.skills.length > 0 ? (
                    <Label.Group style={{ marginBottom: '1em' }}>
                      {data.skills.map((skill_name) => (
                        <Label color="green" basic size="medium">
                          {skill_name}
                        </Label>
                      ))}
                    </Label.Group>
                  ) : (
                    <p>You have no skills added, click edit to begin.</p>
                  )}

                  <Button
                    size="small"
                    color="green"
                    onClick={this.handleEditSkills}
                  >
                    <Icon name="edit outline" />
                    Edit
                  </Button>
                </Fragment>
              )}
            </Segment>

            <Header as="h3" content="Contact" />
            <Segment stacked padded>
              <Header as="h5" content="Phone" />
              {editPhone ? (
                <Fragment>
                  <Form>
                    <Input
                      maxLength={20}
                      style={marginBottom}
                      value={phone}
                      onChange={(e) => this.setState({ phone: e.target.value })}
                      placeholder={
                        data.phone.length === 0 ? 'Enter phone number.' : null
                      }
                    />
                  </Form>
                  <Button
                    size="small"
                    color="violet"
                    onClick={this.handleUpdatePhone}
                  >
                    <Icon name="refresh" />
                    Update
                  </Button>
                  <Button
                    size="small"
                    color="red"
                    onClick={() => this.setState({ editPhone: false })}
                  >
                    <Icon name="cancel" />
                    Cancel
                  </Button>
                </Fragment>
              ) : (
                <Fragment>
                  <p>
                    {data.phone.length === 0
                      ? 'You have no phone details, press Edit to begin.'
                      : data.phone}
                  </p>
                  <Button
                    size="small"
                    color="green"
                    onClick={this.handleEditPhone}
                  >
                    <Icon name="edit outline" />
                    Edit
                  </Button>
                </Fragment>
              )}
              <Header as="h5" content="Availability" />
              {editAvailability ? (
                <Fragment>
                  <Form style={{ marginBottom: '14px' }}>
                    <Form.Radio
                      label={
                        this.state.available ? 'Available' : 'Not available'
                      }
                      toggle
                      onChange={() =>
                        this.setState({ available: !this.state.available })
                      }
                    />
                  </Form>
                  <Button
                    size="small"
                    color="violet"
                    onClick={this.handleUpdateAvailability}
                  >
                    <Icon name="refresh" />
                    Update
                  </Button>
                  <Button
                    size="small"
                    color="red"
                    onClick={() => this.setState({ editAvailability: false })}
                  >
                    <Icon name="cancel" />
                    Cancel
                  </Button>
                </Fragment>
              ) : (
                <Fragment>
                  <p>
                    You are currently{' '}
                    <strong>
                      {data.available ? 'available' : 'not available'}{' '}
                    </strong>
                    for jobs.
                  </p>
                  <Button
                    size="small"
                    color="green"
                    onClick={this.handleEditAvailability}
                  >
                    <Icon name="edit outline" />
                    Edit
                  </Button>
                </Fragment>
              )}
            </Segment>

            <Header as="h3" content="Work Experience" />
            <Segment stacked padded>
              {editExperience ? (
                <Fragment>
                  <Form>
                    <Form.Field>
                      <Form.Input
                        maxLength={50}
                        label="Company/Organization"
                        value={experienceCompany}
                        onChange={(e) =>
                          this.setState({ experienceCompany: e.target.value })
                        }
                      />
                      <Form.Input
                        maxLength={50}
                        label="Job Title"
                        value={experienceTitle}
                        onChange={(e) =>
                          this.setState({ experienceTitle: e.target.value })
                        }
                      />
                      <Form.Input
                        maxLength={10}
                        label="Start Date"
                        value={experienceStart}
                        onChange={(e) =>
                          this.setState({ experienceStart: e.target.value })
                        }
                      />
                      <Form.Input
                        maxLength={10}
                        label="End Date"
                        value={experienceEnd}
                        onChange={(e) =>
                          this.setState({ experienceEnd: e.target.value })
                        }
                      />
                      <Form.TextArea
                        label="Additional Details"
                        placeholder="Achievements and/or highlights"
                        value={experienceDetails}
                        onChange={(e) =>
                          this.setState({ experienceDetails: e.target.value })
                        }
                        maxLength={300}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Button
                        size="small"
                        color="violet"
                        onClick={this.handleUpdateExperience}
                      >
                        <Icon name="refresh" />
                        Add Experience
                      </Button>
                      <Button
                        size="small"
                        color="red"
                        onClick={() => this.setState({ editExperience: false })}
                      >
                        <Icon name="cancel" />
                        Cancel
                      </Button>
                    </Form.Field>
                    <Message
                      warning
                      list={errorsForExperience}
                      header="Warning"
                      visible={errorsForExperience.length > 0}
                    ></Message>
                  </Form>
                </Fragment>
              ) : (
                <Fragment>
                  {data.experience.length > 0 ? (
                    <Table striped celled>
                      <Table.Header>
                        <Table.HeaderCell content="Title" />
                        <Table.HeaderCell content="Company" />
                        <Table.HeaderCell content="Started" />
                        <Table.HeaderCell content="Ended" />
                        <Table.HeaderCell content="Details" />
                        <Table.HeaderCell content="Action" />
                      </Table.Header>
                      <Table.Body>
                        {data.experience.map((e) => (
                          <Table.Row key={e.key}>
                            <Table.Cell content={e.title} />
                            <Table.Cell content={e.company} />
                            <Table.Cell content={e.start} />
                            <Table.Cell content={e.end} />
                            <Table.Cell content={e.details} />
                            <Table.Cell>
                              <Button
                                size="tiny"
                                compact
                                onClick={() =>
                                  this.handleDeleteExperience(e.key)
                                }
                                color="red"
                              >
                                <Icon name="cancel" />
                                Remove
                              </Button>
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  ) : (
                    <p>You have no experiences, click below to add some.</p>
                  )}
                  <Button
                    size="small"
                    color="green"
                    onClick={this.handleEditExperience}
                  >
                    <Icon name="add" />
                    Add experience
                  </Button>
                </Fragment>
              )}
            </Segment>

            <Header as="h3" content="Education" />
            <Segment stacked padded>
              {editEducation ? (
                <Fragment>
                  <Form>
                    <Form.Field>
                      <Form.Input
                        maxLength={50}
                        label="School/University"
                        value={educationSchool}
                        onChange={(e) =>
                          this.setState({ educationSchool: e.target.value })
                        }
                      />
                      <Form.Input
                        label="Course"
                        maxLength={50}
                        value={educationCourse}
                        onChange={(e) =>
                          this.setState({ educationCourse: e.target.value })
                        }
                      />
                      <Form.Input
                        maxLength={10}
                        label="Start Date"
                        value={educationStart}
                        onChange={(e) =>
                          this.setState({ educationStart: e.target.value })
                        }
                      />
                      <Form.Input
                        maxLength={10}
                        label="End Date"
                        value={educationEnd}
                        onChange={(e) =>
                          this.setState({ educationEnd: e.target.value })
                        }
                      />
                      <Form.Input
                        type="number"
                        label="Grade/GPA"
                        value={educationGpa}
                        onChange={(e) =>
                          this.setState({ educationGpa: e.target.value })
                        }
                      />
                    </Form.Field>
                    <Form.Field>
                      <Button
                        size="small"
                        color="violet"
                        onClick={this.handleUpdateEducation}
                      >
                        <Icon name="refresh" />
                        Add Education
                      </Button>
                      <Button
                        size="small"
                        color="red"
                        onClick={() => this.setState({ editEducation: false })}
                      >
                        <Icon name="cancel" />
                        Cancel
                      </Button>
                    </Form.Field>
                    <Message
                      warning
                      list={errorsForEducation}
                      header="Warning"
                      visible={errorsForEducation.length > 0}
                    ></Message>
                  </Form>
                </Fragment>
              ) : (
                <Fragment>
                  {data.education.length > 0 ? (
                    <Table striped celled>
                      <Table.Header>
                        <Table.HeaderCell content="School" />
                        <Table.HeaderCell content="Course" />
                        <Table.HeaderCell content="Started" />
                        <Table.HeaderCell content="Ended" />
                        <Table.HeaderCell content="Grade/GPA" />
                        <Table.HeaderCell content="Action" />
                      </Table.Header>
                      <Table.Body>
                        {data.education.map((e) => (
                          <Table.Row key={e.key}>
                            <Table.Cell content={e.school} />
                            <Table.Cell content={e.course} />
                            <Table.Cell content={e.start} />
                            <Table.Cell content={e.end} />
                            <Table.Cell content={e.gpa} />
                            <Table.Cell>
                              <Button
                                size="tiny"
                                compact
                                onClick={() =>
                                  this.handleDeleteEducation(e.key)
                                }
                                color="red"
                              >
                                <Icon name="cancel" />
                                Remove
                              </Button>
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  ) : (
                    <p>You have no education, click below to add some.</p>
                  )}
                  <Button
                    size="small"
                    color="green"
                    onClick={this.handleEditEducation}
                  >
                    <Icon name="add" />
                    Add education
                  </Button>
                </Fragment>
              )}
            </Segment>
          </Fragment>
        ) : null}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { career_profile, skill } = state
  return {
    career_profile,
    skill,
  }
}

const mapDispatchToProps = {
  propsGetCareerProfile: getCareerProfile,
  propsUpdateCareerProfile: updateCareerProfile,
  propsGetSkills: getSkills,
  propsLogoutUser: logoutUser,
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SeekerProfile)
