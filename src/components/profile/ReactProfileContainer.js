import React, { Component } from 'react'
import { Header, Container, Message, Segment, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'; 
import { setMenuItem } from '../../actions/menu'; 
import { getUserDetails } from '../../actions/user_details'
import VerticallyPaddedContainer from '../layout/VerticallyPaddedContainer';

class ReactProfileContainer extends Component {
    componentDidMount(){
        this.props.propsSetMenuItem('profile')
        const { auth } = this.props;
        if (auth && auth.isAuthenticated) {
            this.props.propsGetUserDetails(auth.user._id)
        }
    }


    render() {

        const { auth } = this.props;

        if (!auth || !auth.isAuthenticated) return (
            <Segment basic>
                <Container>
                    <VerticallyPaddedContainer size="4">
                        <Header as="h1">
                            Profile
                        </Header>
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

        return (
            <Segment basic>
                <Container>
                    <VerticallyPaddedContainer>
                    <Header as="h1">
                                Personal details
                            </Header>
                            <Divider></Divider>
                        <Segment>
                        <p>Adipisicing duis reprehenderit magna ut Lorem exercitation proident adipisicing nulla cupidatat commodo deserunt. Ex consequat eu reprehenderit nulla pariatur labore nulla nostrud consectetur deserunt Lorem enim nulla. Qui sit veniam elit cupidatat dolor eu elit dolore nostrud esse amet consequat minim exercitation.

Mollit eu non et et ullamco duis sit magna ea in labore culpa</p>
                        </Segment>

                        <Header as="h1">
                        Job postings
                            </Header>
                            <Divider></Divider>
                        <Segment>
                           <p>Adipisicing duis reprehenderit magna ut Lorem exercitation proident adipisicing nulla cupidatat commodo deserunt. Ex consequat eu reprehenderit nulla pariatur labore nulla nostrud consectetur deserunt Lorem enim nulla. Qui sit veniam elit cupidatat dolor eu elit dolore nostrud esse amet consequat minim exercitation.

Mollit eu non et et ullamco duis sit magna ea in labore culpa eu. Aute officia ipsum duis nulla sint veniam ad culpa proident nostrud ullamco veniam ea. Consectetur sunt nulla incididunt nostrud. Ipsum enim deserunt sunt aliquip cillum fugiat et velit do veniam reprehenderit minim.</p>
                        </Segment>
                    </VerticallyPaddedContainer>
                </Container>

            </Segment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        user_details: state.user_details,
    }
}

const mapDispatchToProps = {
    propsSetMenuItem: setMenuItem
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactProfileContainer)