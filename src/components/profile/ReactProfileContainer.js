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
        const exists = user_details.filter(item => item.search === auth.user._id)
        if ((auth.isAuthenticated === true) && (exists.length === 0)) {
            propsGetUserDetails(auth.user._id)
        }
    }

    render() {
        const { auth, user_details } = this.props;

        if (!auth || !auth.isAuthenticated) return (
            <Segment basic>
                <Container>
                    <VerticallyPaddedContainer size="4">
                        <Header as="h1" content="Profile"/>
                        <Divider/>
                            <Message 
                            warning
                            header="Authentication required"
                            content="You must be registered and logged in, to view your profile."
                            >
                            </Message>
                    </VerticallyPaddedContainer>
                </Container>
            </Segment>
        )
        
        if (user_details.length > 0) {
            const userDetails = user_details[0].data
            const { first_name, last_name, email, createdAt, is_employer } = userDetails;
            return (
                <Segment basic>
                    <Container>
                        <VerticallyPaddedContainer size="4">
                            <Header as="h1" content="Profile"/>
                            <Divider/>

                            <Header as="h3" content="Personal Details"/>
                            <Segment stacked padded color="green">
                                <Grid divided='vertically'>
                                    <Grid.Row columns={2}>
                                        <Grid.Column>
                                            <Header content="Name" as="h3"/>
                                            <p>{ `${properCaseTransform(first_name)} ${properCaseTransform(last_name)}` }</p>
                                            <Header content="Email" as="h3"/>
                                            <p>{email}</p>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Header content="Joined" as="h3"/>
                                            {dateDiffString(createdAt)}
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
                            
                        </VerticallyPaddedContainer>
                    </Container>
    
                </Segment>
            )
        }

        return <div>nothing here</div>
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