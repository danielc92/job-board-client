import React, { Component } from 'react'
import { Segment, Container, Header, Form, Icon } from 'semantic-ui-react';

export default class SearchContainer extends Component {

    state = {
        search: ''
    }

    handleInputChange = (e, {value}) => {
        console.log(value);
    }

    render() {
        return (
            <Segment color="green" inverted style={{borderRadius: '0', padding: '3rem 2rem', margin: '0'}}>
                <Container>
                    <Header as="h1" style={{color: '#fff'}}>Find your dream job.</Header>
                    
                    <Form>
                        <Form.Group>
                            <Form.Input
                                label="What" 
                                onChange={this.handleInputChange} 
                                placeholder='Enter some keywords...'
                            />
                            <Form.Dropdown
                                label="Where"
                                placeholder="Enter location, postcode, state"
                                search
                                selection
                            />
                            
                        </Form.Group>

                        <Form.Button
                            size="huge"
                            color="white">
                            <Icon name="search"></Icon>Search
                        </Form.Button>
                    </Form>
                </Container>
            </Segment>
        )
    }
}
