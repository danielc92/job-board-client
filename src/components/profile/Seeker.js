import React, { Component } from 'react'
import { Header, Button, Segment, Input, Form, Icon, TextArea } from 'semantic-ui-react';
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
        } = this.state;
        const { career_profile } = this.props;
        const { data } = career_profile;
        return (
            <React.Fragment>
            {
                data ? 
                <React.Fragment>
                {/* CAREER SUMMARY SECTION */}
                <Header as="h3" content="Career Details"/>
                <Segment stacked padded color="green">
                    <Header as='h5' content='Summary'/>
                    
                    {
                        editSummary ? 
                        <React.Fragment>
                            <Form>
                                <TextArea
                                maxLength="300"
                                style={marginBottom}
                                value={summary}
                                onChange={(e) => this.setState({summary: e.target.value })}
                                placeholder={data.summary.length === 0 ? 'You have no summary, you can create one now.' : null}
                                />
                            </Form>
                            <Button size="small" color="violet" onClick={ this.handleUpdateSummary }>Update</Button>
                        </React.Fragment> : 
                        <React.Fragment>
                            <p>{ data.summary }</p>
                            <Button size="small" color="green" onClick={ this.handleEditSummary } ><Icon name="edit outline"/>Edit</Button>
                        </React.Fragment>
                    }
                </Segment>

                <Header as="h3" content="Availability & Phone"/>
                <Segment stacked padded color="green">
                    <Header as='h5' content='Phone'/>
                    {
                        editPhone ? 
                        <React.Fragment>
                            <Form>
                                <Input
                                style={marginBottom}
                                value={phone}
                                onChange={(e) => this.setState({phone: e.target.value })}
                                placeholder={data.phone.length === 0 ? 'Enter phone number.' : null}
                                />
                            </Form>
                            <Button size="small" color="violet" onClick={ this.handleUpdatePhone }>Update</Button>
                        </React.Fragment> : 
                        <React.Fragment>
                            <p>{ data.phone.length === 0 ? 'You have no phone details, press Edit to begin.' : data.phone }</p>
                            <Button size="small" color="green" onClick={ this.handleEditPhone }><Icon name="edit outline"/>Edit</Button>
                        </React.Fragment>
                    }
                    <Header as="h5" content="Availability"/>
                    {
                        editAvailability ? 
                        <React.Fragment>
                            <Form style={{marginBottom: '14px'}}>
                                <Form.Radio
                                label={ this.state.available ? 'Available' : 'Not available'}
                                toggle
                                onChange={()=>this.setState({ available: !this.state.available})}
                            />
                            </Form>
                            <Button size="small" color="violet" onClick={ this.handleUpdateAvailability }>Update</Button>
                        </React.Fragment> : 
                        <React.Fragment>
                            <p>{ data.available ? 'You are currently available for jobs.' : 'You are not currently available for jobs.' }</p>
                            <Button size="small" color="green" onClick={ this.handleEditAvailability }><Icon name="edit outline"/>Edit</Button>
                        </React.Fragment>
                    }
                </Segment>

                <Header as="h3" content="Work Experience"/>
                <Segment stacked padded color="green">
                
                </Segment>
                

                <Header as="h3" content="Education"/>
                <Segment stacked padded color="green">
                </Segment>

                <Header as="h3" content="Skills & Achievements"/>
                <Segment stacked padded color="violet">
                </Segment>


            </React.Fragment>
                : null
            }
            </React.Fragment>
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