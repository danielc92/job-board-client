import React, { Component, Fragment } from 'react'
import { Header, Button, Segment, Input, Table, Form, Icon, TextArea } from 'semantic-ui-react';
import { getCareerProfile, updateCareerProfile } from '../../actions/career_profile'
import { connect } from 'react-redux';

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

        experienceInputStarted: '',
        experienceInputEnded: '',
        experienceInputTitle: '',
        experienceInputDetails: '',
        experienceInputCompany: '',


    }

    componentDidMount() {
        this.props.propsGetCareerProfile()
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
        const { experience, experienceInputCompany, experienceInputDetails, experienceInputEnded, experienceInputTitle, experienceInputStarted } = this.state;
        const newEntry = {
            company: experienceInputCompany,
            details: experienceInputDetails,
            start: experienceInputStarted,
            end: experienceInputEnded,
            title: experienceInputTitle,
        }
        const { propsUpdateCareerProfile } = this.props;
        // if validation passes
        propsUpdateCareerProfile({experience: [...experience, newEntry]})
        this.setState({experience: [...experience, newEntry] })
        this.setState({ editExperience : false })
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

            experienceInputStarted,
            experienceInputEnded,
            experienceInputTitle,
            experienceInputDetails,
            experienceInputCompany,
        } = this.state;
        const { career_profile } = this.props;
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
                                    value={ experienceInputCompany } 
                                    onChange={e => this.setState({ experienceInputCompany : e.target.value})}
                                />
                                <Form.Input 
                                    label="Job Title" 
                                    value={ experienceInputTitle } 
                                    onChange={e => this.setState({ experienceInputTitle : e.target.value})}
                                />
                                <Form.Input 
                                    label="Start Date" 
                                    value={experienceInputStarted}
                                    onChange={e => this.setState({ experienceInputStarted : e.target.value})}
                                />
                               <Form.Input 
                                    label="End Date" 
                                    value={experienceInputEnded}
                                    onChange={e => this.setState({ experienceInputEnded : e.target.value})}
                                />
                                <Form.TextArea 
                                    label="Additional Details" 
                                    placeholder="Achievements and/or highlights"
                                    value={experienceInputDetails}
                                    onChange={e => this.setState({ experienceInputDetails : e.target.value})}
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
                                        data.experience.map(e => (
                                            <Table.Row>
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
                </Segment>

                <Header as="h3" content="Skills & Achievements"/>
                <Segment stacked padded color="green">
                </Segment>


            </Fragment>
                : null
            }
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    const { career_profile } = state;
    return {
        career_profile,
    }
}

const mapDispatchToProps = {
    propsGetCareerProfile: getCareerProfile,
    propsUpdateCareerProfile: updateCareerProfile,
}

export default connect(mapStateToProps, mapDispatchToProps)(Seeker);