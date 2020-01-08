import React, { Component } from 'react'
import { connect } from 'react-redux';
import { setMenuItem } from '../../actions/menu';
import { Header, Segment, Container } from 'semantic-ui-react';
import VerticallyPaddedContainer from '../layout/VerticallyPaddedContainer'
import Employer from './Employer';
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
                        {
                            auth.isAuthenticated ? 
                            <Employer/>
                            : 
                            <h1>You need to be logged in to view the dashboard.</h1>
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