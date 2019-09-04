import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Placeholder, Segment, Container } from 'semantic-ui-react';
import { setMenuItem } from '../../actions/menu';

class ReactJobViewContainer extends Component {

    componentDidMount() {
        this.props.propsSetMenuItem('find')
    }

    render() {
        return (
            <Container>
                <Segment style={{ padding: '7rem 0', border: 'none', boxShadow: 'none', margin: 'none'}}>
                    <Header as="h1">View Jobs</Header>
                    <p>There is nothign here yet.</p>
                    <Placeholder>
                        <Placeholder.Header image>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        </Placeholder.Header>
                    </Placeholder>
                    <Placeholder>
                        <Placeholder.Header image>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        </Placeholder.Header>
                    </Placeholder>
                    <Placeholder>
                        <Placeholder.Header image>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        </Placeholder.Header>
                    </Placeholder>
                    <Placeholder>
                        <Placeholder.Header image>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        </Placeholder.Header>
                    </Placeholder>
                </Segment>
            </Container>
        )
    }
}

const mapActionsToProps = {
    propsSetMenuItem: setMenuItem
}

export default connect(null, mapActionsToProps)(ReactJobViewContainer)
