import React, { Component } from 'react'
import { connect } from 'react-redux';
import { setMenuItem } from '../../actions/menu';
import { Segment, Container, Header, Divider, Message } from 'semantic-ui-react';
import VerticallyPaddedContainer from '../layout/VerticallyPaddedContainer'
import Employer from './users/employer/Employer';
import Seeker from './users/seeker/Seeker'

class ReactDashboardContainer extends Component {
    
    componentDidMount() {
        this.props.propsSetMenuItem('dashboard')
    }

    render() {
        const { auth } = this.props
        return (
            <Segment basic>
                <Container>
                    <VerticallyPaddedContainer size="4">
                        {/* Handle Auth, then Employer/Seeker case */}
                        {
                            !auth.isAuthenticated ? 
                            <React.Fragment>
                                <Header as="h1" content="Dashboard"/>
                                <Divider/>
                                <Message 
                                warning
                                header="Authentication required"
                                content="You need to be logged in, in order to view your dashboard."/>
                                </React.Fragment>
                                 : auth.user.is_employer ? 
                                <Employer/>
                           : 
                            <Seeker/>
                        }
                    </VerticallyPaddedContainer>
                </Container>
            </Segment>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        menu: state.menu,
        auth: state.auth,
    }
}
const mapDispatchToProps = {
    propsSetMenuItem: setMenuItem
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactDashboardContainer)