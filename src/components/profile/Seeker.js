import React, { Component } from 'react'
import { Header, Button, Segment, Form, TextArea } from 'semantic-ui-react';
import { getCareerProfile, updateCareerProfile } from '../../actions/career_profile'
import { connect } from 'react-redux';

const marginBottom = { marginBottom: '8px'} 
class Seeker extends Component {
    state = {}

    componentDidMount() {
        this.props.propsGetCareerProfile()
    }

    handleSummaryUpdate = () => {
        const { summary } = this.state;
        const payload = { summary }
        this.props.propsUpdateCareerProfile(payload)
    }


    render() {
        const { career_profile } = this.props;
        const { data } = career_profile;
        return (
            <React.Fragment>
            {
                data ? 
                <React.Fragment>
                <Header as="h3" content="Career summary"/>
                <Segment stacked padded color="green">
                    <Form>
                    <TextArea
                    maxlength="300"
                    style={marginBottom}
                    value=""
                    onChange={(e) => this.setState({summary: e.target.value })}
                    fluid
                    placeholder={data.summary.length === 0 ? 'You have no summary, click below to make one.' : null}
                    />
                        </Form>
                    <Button 
                    onClick={this.handleSummaryUpdate}
                    color="violet"
                    size="small"
                    content="Update"/>
                </Segment>

                <Header as="h3" content="Work Experience"/>
                <Segment stacked padded color="green">
                
                </Segment>
                

                <Header as="h3" content="Education"/>
                <Segment stacked padded color="green">
                </Segment>

                <Header as="h3" content="Skills & Achievements"/>
                <Segment stacked padded color="green">
                </Segment>

                <Header as="h3" content="Availability & Phone"/>
                <Segment stacked padded color="green">
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