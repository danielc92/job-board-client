import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';


class ReactJobViewContainer extends Component {
    render() {
        return (
            <div>
                <Header as="h1">View Jobs</Header>
            </div>
        )
    }
}

export default connect(null, null)(ReactJobViewContainer)
