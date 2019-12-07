import React, { Component } from 'react'
import { Segment, Container, Header, Input } from 'semantic-ui-react';

export default class SearchContainer extends Component {

    state = {
        search: ''
    }


    render() {
        return (
            <Segment color="green" inverted style={{borderRadius: '0', padding: '3rem 2rem', margin: '0'}}>
                <Container>
                    <Header as="h1" style={{color: '#fff'}}>Find your job.</Header>
                    <Input onChange={(e)=> this.setState({search: e.target.value}) } size="big" action='Search' placeholder='Enter some keywords...' />
                </Container>
            </Segment>
        )
    }
}
