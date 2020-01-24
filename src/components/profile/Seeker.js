import React, { Component, Fragment } from 'react'
import { Header, Button, Segment, Input, Table, Form, Icon, TextArea, Label } from 'semantic-ui-react';
import { getCareerProfile, updateCareerProfile } from '../../actions/career_profile'
import { getSkills} from '../../actions/skills'
import { connect } from 'react-redux';
const uuidv4 = require('uuid/v4');
const marginBottom = { marginBottom: '8px'} 
class Seeker extends Component {
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

        educationSchool:'',
        educationStart:'',
        educationEnd:'',
        educationGpa:0,
        educationCourse:'',



    }

    componentDidMount() {
        this.props.propsGetCareerProfile()
        if (this.props.skill.data && this.props.skill.data.length === 0) {
            this.props.propsGetSkills()
        }
    }

    handleSummaryUpdate = () => {
        const { summary } = this.state;
        const payload = { summary }
        this.props.propsUpdateCareerProfile(payload)
    }

    handleEditSummary = () => {
        const { career_profile } = this.props;
        this.setState({ summary: career_profile.data.summary, editSummary: true})
    }

    handleUpdateSummary = () => {
        const { summary } = this.state;
        const { propsUpdateCareerProfile } = this.props;
        propsUpdateCareerProfile({ summary })
        this.setState({ editSummary: false })
    }

    handleEditPhone = () => {
        const { career_profile } = this.props;
        this.setState({ phone: career_profile.data.phone, editPhone: true})
    }

    handleUpdatePhone = () => {
        const { phone } = this.state;
        const { propsUpdateCareerProfile } = this.props;
        propsUpdateCareerProfile({ phone })
        this.setState({ editPhone: false })
    }

    handleEditAvailability = () => {
        const { career_profile } = this.props;
        this.setState({ available: career_profile.data.available, editAvailability: true})
    }

    handleUpdateAvailability = () => {
        const { available } = this.state;
        const { propsUpdateCareerProfile } = this.props;
        propsUpdateCareerProfile({ available })
        this.setState({ editAvailability: false })
    }

    handleEditExperience = () => {
        const { career_profile } = this.props;
        this.setState({ experience: career_profile.data.experience, editExperience: true})
    }

    handleUpdateExperience = () => {
        const { experience, experienceCompany, experienceDetails, experienceEnd, experienceTitle, experienceStart } = this.state;
        const newEntry = {
            company: experienceCompany,
            details: experienceDetails,
            start: experienceStart,
            end: experienceEnd,
            title: experienceTitle,
            key: uuidv4()
        }
        const { propsUpdateCareerProfile } = this.props;
        // if validation passes
        propsUpdateCareerProfile({experience: [...experience, newEntry]})
        this.setState({experience: [...experience, newEntry] })
        this.setState({ editExperience : false })
    }

    handleEditEducation = () => {
        const { career_profile } = this.props;
        this.setState({ education: career_profile.data.education, editEducation: true})
    }
    handleUpdateEducation = ()=> {
        const { education, educationCourse, educationEnd, educationGpa, educationSchool, educationStart } = this.state;
        const newEntry = {
            course: educationCourse,
            end: educationEnd,
            start:educationStart,
            school: educationSchool,
            gpa: educationGpa,
            key: uuidv4()
        }
        const { propsUpdateCareerProfile } = this.props;
        // if validation passes
        propsUpdateCareerProfile({education: [...education, newEntry]})
        this.setState({education: [...education, newEntry] })
        this.setState({ editEducation : false })
    }

    handleEditSkills = () => {
        const { career_profile } = this.props;
        this.setState({ skills: career_profile.data.skills, editSkills: true })
    }

    handleUpdateSkills = () => {
        const { skills } = this.state
        this.props.propsUpdateCareerProfile({ skills })
        this.setState({ editSkills: false })
    }

    handleChangeSkills = (event, data) => {
        console.log(data.value)
        this.setState({ skills: data.value})
        
    }

    render() {
        const {
            achievements,
            available,
            editAchievements,
            editAvailability,
            editEducation,
            editExperience,
            editPhone,
            editSkills,
            editSummary,
            education,
            experience,
            phone,
            skills,
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
            educationEnd
        } = this.state;

        const { career_profile, skill } = this.props;
        const { data } = career_profile;

        return (
            <Fragment>
            {
                data ? 
                <Fragment>
                {/* CAREER SUMMARY SECTION */}
                <Header as="h3" content="Career Details"/>
                <Segment stacked padded color="green">
                    <Header as='h5' content='Summary'/>
                    
                    {
                        editSummary ? 
                        <Fragment>
                            <Form>
                                <TextArea
                                maxLength="300"
                                style={marginBottom}
                                value={summary}
                                onChange={(e) => this.setState({summary: e.target.value })}
                                placeholder={data.summary.length === 0 ? 'You have no summary, you can create one now.' : null}
                                />
                            </Form>
                            <Button size="small" color="violet" onClick={ this.handleUpdateSummary }><Icon name="refresh"/>Update</Button>
                            <Button size="small" color="red" onClick={ ()=>this.setState({editSummary: false}) }><Icon name="cancel"/>Cancel</Button>
                        </Fragment> : 
                        <Fragment>
                            <p>{ data.summary }</p>
                            <Button size="small" color="green" onClick={ this.handleEditSummary } ><Icon name="edit outline"/>Edit</Button>
                        </Fragment>
                    }
                </Segment>

                <Header as="h3" content="Skills"/>
                <Segment stacked padded color="green">
                    {
                        editSkills ?
                        (
                            <Form>
                                <Form.Dropdown 
                                    onChange={this.handleChangeSkills}
                                    name="skills"
                                    label="Skills"
                                    placeholder='Add skills'
                                    multiple
                                    search
                                    selection
                                    options={skill.data}
                                    renderLabel={this.customRender}
                                    defaultValue={data.skills}
                                ></Form.Dropdown>
                                <Form.Field>
                                <Button size="small" color="violet" onClick={ this.handleUpdateSkills }><Icon name="refresh"/>Add Experience</Button>
                                <Button size="small" color="red" onClick={ ()=>this.setState({editSkills: false}) }><Icon name="cancel"/>Cancel</Button>
                            </Form.Field>
                            </Form>
                        )
                        :
                        (
                            <Fragment>
                                <Label.Group>
                                    { data.skills.map(skill_name => <Label color="green" basic size="medium">{ skill_name }</Label>)}
                                </Label.Group>
                                <Button size="small" color="green" onClick={ this.handleEditSkills }><Icon name="edit outline"/>Edit</Button>
                            </Fragment>
                        )
                    }
                </Segment>

                <Header as="h3" content="Availability & Phone"/>
                <Segment stacked padded color="green">
                    <Header as='h5' content='Phone'/>
                    {
                        editPhone ? 
                        <Fragment>
                            <Form>
                                <Input
                                style={marginBottom}
                                value={phone}
                                onChange={(e) => this.setState({phone: e.target.value })}
                                placeholder={data.phone.length === 0 ? 'Enter phone number.' : null}
                                />
                            </Form>
                            <Button size="small" color="violet" onClick={ this.handleUpdatePhone }><Icon name="refresh"/>Update</Button>
                            <Button size="small" color="red" onClick={ ()=>this.setState({editPhone: false}) }><Icon name="cancel"/>Cancel</Button>
                        </Fragment> : 
                        <Fragment>
                            <p>{ data.phone.length === 0 ? 'You have no phone details, press Edit to begin.' : data.phone }</p>
                            <Button size="small" color="green" onClick={ this.handleEditPhone }><Icon name="edit outline"/>Edit</Button>
                        </Fragment>
                    }
                    <Header as="h5" content="Availability"/>
                    {
                        editAvailability ? 
                        <Fragment>
                            <Form style={{marginBottom: '14px'}}>
                                <Form.Radio
                                label={ this.state.available ? 'Available' : 'Not available'}
                                toggle
                                onChange={()=>this.setState({ available: !this.state.available})}
                            />
                            </Form>
                            <Button size="small" color="violet" onClick={ this.handleUpdateAvailability }><Icon name="refresh"/>Update</Button>
                            <Button size="small" color="red" onClick={ ()=>this.setState({editAvailability: false}) }><Icon name="cancel"/>Cancel</Button>
                        </Fragment> : 
                        <Fragment>
                            <p>You are currently <strong>{ data.available ? 'available' : 'not available' } </strong>for jobs.</p>
                            <Button size="small" color="green" onClick={ this.handleEditAvailability }><Icon name="edit outline"/>Edit</Button>
                        </Fragment>
                    }
                </Segment>

                <Header as="h3" content="Work Experience"/>
                <Segment stacked padded color="green">
                
                {
                    editExperience ?
                    <Fragment>
                        <Form>
                            <Form.Field>
                                <Form.Input 
                                    label="Company/Organization" 
                                    value={ experienceCompany } 
                                    onChange={e => this.setState({ experienceCompany : e.target.value})}
                                />
                                <Form.Input 
                                    label="Job Title" 
                                    value={ experienceTitle } 
                                    onChange={e => this.setState({ experienceTitle : e.target.value})}
                                />
                                <Form.Input 
                                    label="Start Date" 
                                    value={experienceStart}
                                    onChange={e => this.setState({ experienceStart : e.target.value})}
                                />
                               <Form.Input 
                                    label="End Date" 
                                    value={experienceEnd}
                                    onChange={e => this.setState({ experienceEnd : e.target.value})}
                                />
                                <Form.TextArea 
                                    label="Additional Details" 
                                    placeholder="Achievements and/or highlights"
                                    value={experienceDetails}
                                    onChange={e => this.setState({ experienceDetails : e.target.value})}
                                    maxLength="300"
                                />
                            </Form.Field>
                            <Form.Field>
                                <Button size="small" color="violet" onClick={ this.handleUpdateExperience }><Icon name="refresh"/>Add Experience</Button>
                                <Button size="small" color="red" onClick={ ()=>this.setState({editExperience: false}) }><Icon name="cancel"/>Cancel</Button>
                            </Form.Field>
                        </Form>
                       
                    </Fragment> :
                    <Fragment>
                        {
                            data.experience.length > 0 ?
                            <Table striped celled>
                                <Table.Header>
                                    <Table.HeaderCell content="Title"/>
                                    <Table.HeaderCell content="Company"/>
                                    <Table.HeaderCell content="Started"/>
                                    <Table.HeaderCell content="Ended"/>
                                    <Table.HeaderCell content="Details"/>
                                </Table.Header>
                                <Table.Body>
                                    {
                                        data.experience.map((e, index) => (
                                            <Table.Row key={index.toString()}>
                                                <Table.Cell content={e.title}/>
                                                <Table.Cell content={e.company}/>
                                                <Table.Cell content={e.start}/>
                                                <Table.Cell content={e.end}/>
                                                <Table.Cell content={e.details}/>
                                            </Table.Row>
                                        ))
                                    }
                                </Table.Body>
                            </Table>
                            : 
                            <p>You have no experiences, click below to add some.</p>
                        }
                        <Button size="small" color="green" onClick={ this.handleEditExperience }><Icon name="edit outline"/>Edit</Button>
                    </Fragment>
                }
               
                </Segment>
                

                <Header as="h3" content="Education"/>
                <Segment stacked padded color="green">

                {
                    editEducation ?
                    <Fragment>
                        <Form>
                            <Form.Field>
                                <Form.Input 
                                    label="School/University" 
                                    value={ educationSchool } 
                                    onChange={e => this.setState({ educationSchool : e.target.value})}
                                />
                                <Form.Input 
                                    label="Course" 
                                    value={ educationCourse } 
                                    onChange={e => this.setState({ educationCourse : e.target.value})}
                                />
                                <Form.Input 
                                    label="Start Date" 
                                    value={educationStart}
                                    onChange={e => this.setState({ educationStart : e.target.value})}
                                />
                               <Form.Input 
                                    label="End Date" 
                                    value={educationEnd}
                                    onChange={e => this.setState({ educationEnd : e.target.value})}
                                />
                                <Form.Input 
                                    type="number"
                                    label="Grade/GPA" 
                                    value={educationGpa}
                                    onChange={e => this.setState({ educationGpa : e.target.value})}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Button size="small" color="violet" onClick={ this.handleUpdateEducation }><Icon name="refresh"/>Add Experience</Button>
                                <Button size="small" color="red" onClick={ ()=>this.setState({editEducation: false}) }><Icon name="cancel"/>Cancel</Button>
                            </Form.Field>
                        </Form>
                       
                    </Fragment> :
                    <Fragment>
                        {
                            data.education.length > 0 ?
                            <Table striped celled>
                                <Table.Header>
                                    <Table.HeaderCell content="School"/>
                                    <Table.HeaderCell content="Course"/>
                                    <Table.HeaderCell content="Started"/>
                                    <Table.HeaderCell content="Ended"/>
                                    <Table.HeaderCell content="Grade/GPA"/>
                                </Table.Header>
                                <Table.Body>
                                    {
                                        data.education.map((e, index) => (
                                            <Table.Row key={index.toString()}>
                                                <Table.Cell content={e.school}/>
                                                <Table.Cell content={e.course}/>
                                                <Table.Cell content={e.start}/>
                                                <Table.Cell content={e.end}/>
                                                <Table.Cell content={e.gpa}/>
                                            </Table.Row>
                                        ))
                                    }
                                </Table.Body>
                            </Table>
                            : 
                            <p>You have no experiences, click below to add some.</p>
                        }
                        <Button size="small" color="green" onClick={ this.handleEditEducation }><Icon name="edit outline"/>Edit</Button>
                    </Fragment>
                }
                </Segment>

               
            </Fragment>
                : null
            }
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    const { career_profile, skill } = state;
    return {
        career_profile,
        skill
    }
}

const mapDispatchToProps = {
    propsGetCareerProfile: getCareerProfile,
    propsUpdateCareerProfile: updateCareerProfile,
    propsGetSkills: getSkills
}

export default connect(mapStateToProps, mapDispatchToProps)(Seeker);