import React, { Component } from 'react';
import { Segment, Container, Divider, Header} from 'semantic-ui-react';


export default class ReactNews extends Component {
    render() {
        return (
            <div>
                <Segment style={{ padding: '7rem 0rem', border: 'none', boxShadow: 'none'}}>
                    <Container>
                        <Header as="h1">News</Header>
                        <Divider></Divider>
                        <Header as="h3">August 20th</Header>
                        <p>Mollit nisi anim quis labore cillum ad Lorem aute laboris ullamco consectetur cillum non excepteur. Ad laboris exercitation tempor labore quis laborum adipisicing non fugiat dolore sunt fugiat ex incididunt. Aute magna ad anim officia pariatur commodo duis. Aliquip ipsum pariatur amet non fugiat eu ea consectetur eiusmod duis qui. Est sunt sit amet fugiat aliqua culpa adipisicing quis. Adipisicing nisi exercitation esse esse culpa excepteur eiusmod duis esse deserunt.</p>
                    </Container>
                </Segment>
            </div>
        )
    }
}
