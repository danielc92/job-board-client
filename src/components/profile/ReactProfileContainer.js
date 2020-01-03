import React, { Component } from 'react'
import { Header, Container, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'; 
import { setMenuItem } from '../../actions/menu'; 
import VerticallyPaddedContainer from '../layout/VerticallyPaddedContainer';

class ReactProfileContainer extends Component {
    componentDidMount(){
        this.props.propsSetMenuItem('profile')
    }


    render() {
        return (
            <Segment basic>
                <Container>
                    <VerticallyPaddedContainer>
                        <Segment>
                            <Header as="h1">
                                Personal details
                            </Header>
                        </Segment>

                        <Segment>
                            <Header as="h1">
                                Job postings
                            </Header>
                        </Segment>
                    </VerticallyPaddedContainer>
                </Container>

            </Segment>
        )
    }
}

const mapDispatchToProps = {
    propsSetMenuItem: setMenuItem
}

export default connect(null, mapDispatchToProps)(ReactProfileContainer)