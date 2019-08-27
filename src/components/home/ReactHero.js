import React, { Component } from 'react';
import {
    Grid, Container, Segment, Header, Image
} from 'semantic-ui-react';
import image from '../../images/undraw_interview_rmcf.svg'



export default class ReactHero extends Component {
    render() {
        return (
            <Segment style={{margin: '0', padding: '7rem 0rem', border: 'none', boxShadow:'none'}}>
                <Container>
                    <Grid divided='vertically' stackable>
                    <Grid.Row columns={2}>
                        <Grid.Column verticalAlign="middle">
                        <Header as="h1" style={{fontSize: '3rem'}}>
                            Data driven job board.
                            <Header.Subheader>
                            Irure nostrud ea aliqua incididunt ex irure sint excepteur.
                            </Header.Subheader>
                        </Header>
                        </Grid.Column>
                        <Grid.Column>
                        <Image src={image} />
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        )
    }
}
