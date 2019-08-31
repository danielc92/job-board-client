import React, { Component } from 'react';
import { Segment, Container, Label,  Divider, Header} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setMenuItem } from '../../actions/menu';

class ReactNews extends Component {

    componentDidMount() {
        this.props.propsSetMenuItem('news')
    }

    render() {
        return (
            <div>
                <Segment style={{ padding: '7rem 0rem', border: 'none', boxShadow: 'none'}}>
                    <Container>
                        <Header as="h1">News</Header>
                        <Divider></Divider>
                        <Header as="h3">Development begins!</Header>
                        <p>Mollit nisi anim quis labore cillum ad Lorem aute laboris ullamco consectetur cillum non excepteur. Ad laboris exercitation tempor labore quis laborum adipisicing non fugiat dolore sunt fugiat ex incididunt. Aute magna ad anim officia pariatur commodo duis. Aliquip ipsum pariatur amet non fugiat eu ea consectetur eiusmod duis qui. Est sunt sit amet fugiat aliqua culpa adipisicing quis. Adipisicing nisi exercitation esse esse culpa excepteur eiusmod duis esse deserunt.</p>
                        <Label>Created on 20th August 2019</Label>
                    </Container>
                </Segment>
            </div>
        )
    }
}

const mapActionsToProps = { propsSetMenuItem: setMenuItem }
export default connect(null, mapActionsToProps)(ReactNews);