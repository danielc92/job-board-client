import React, { Component } from 'react';
import { Header, Container, Grid, Label, Message, Segment, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux'; 
import { dateDiffString, properCaseTransform } from '../../helpers/generic';
import { setMenuItem } from '../../actions/menu'; 
import { getUserDetails } from '../../actions/user_details';
import { loginRefresh } from '../../actions/auth';
import VerticallyPaddedContainer from '../layout/VerticallyPaddedContainer';
import Seeker from './Seeker';

class ReactProfileContainer extends Component {
    
    state = {
        sent: false
    }
    componentDidMount(){
        const { propsSetMenuItem } = this.props; 
        propsSetMenuItem('profile')
    }

    componentDidUpdate(){
        const { auth, propsGetUserDetails, user_details } = this.props;
        const { loaded, error } = user_details;
        if (!loaded && !error) {
            propsGetUserDetails(auth.user._id)
        }
    }

    render() {
        const { user_details } = this.props;
        const { loaded, error, data, message, is_employer } = user_details;
        return (
                <Segment basic>
                    <Container>
                        <VerticallyPaddedContainer size="4">
                            <Header as="h1" content="Profile"/>
                            <Divider/>
                {
                    !loaded && !error ? 
                    <Segment stacked color="blue">
                        <Header as="h3" content="Loading"/>
                        <p>Please wait while we load your profile</p>    
                    </Segment>
                    : null
                }
                { 
                    error ? 
                    <Segment stacked color="red">
                        <Header as="h3" content="Error"/>
                        <p>{message}</p>    
                    </Segment>
                    : null }
                { 
                    loaded ?
                    <React.Fragment>
                        <Header as="h3" content="Personal Details"/>
                        <Segment stacked padded color="green">
                            <Grid divided='vertically'>
                                <Grid.Row columns={2}>
                                    <Grid.Column>
                                        <Header content="Name" as="h3"/>
                                        <p>{ `${properCaseTransform(data.first_name)} ${properCaseTransform(data.last_name)}` }</p>
                                        <Header content="Email" as="h3"/>
                                        <p>{data.email}</p>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Header content="Joined" as="h3"/>
                                        {dateDiffString(data.createdAt)}
                                        <Header content="Member Type" as="h3"/>
                                        <Label color="green" content={is_employer ? 'employer' : 'job seeker'}/>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                        {
                            (!is_employer) ?
                            <Seeker/>
                            : null
                        }
                    </React.Fragment>
                    : null
                }
                 
                 </VerticallyPaddedContainer>
                    </Container>
                </Segment> 
            )
        }
}

const mapStateToProps = (state) => {
    const { user_details, auth } = state; 
    return {
        user_details,
        auth,
    }
}

const mapDispatchToProps = {
    propsSetMenuItem: setMenuItem,
    propsGetUserDetails: getUserDetails,
    propsLoginRefresh: loginRefresh,
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactProfileContainer)