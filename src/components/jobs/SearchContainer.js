import React, { Component } from 'react'
import { Segment, Container, Header, Form, Icon } from 'semantic-ui-react';

export default class SearchContainer extends Component {

    state = {
        searchWhat: '';
        searchWhere: '';
    }

    handleInputChange = (e, {value}) => {
        console.log(value);
    }

    render() {
        return (
            <Segment color="green" inverted style={{borderRadius: '0', padding: '3rem 2rem', margin: '0'}}>
                <Container>
                    <Header as="h1">Find your dream job.</Header>
                    
                    <Form>
                        <Form.Group>
                            <Form.Input
                                label="What" 
                                onChange={this.handleInputChange} 
                                placeholder='Enter some keywords...'
                                value={searchWhat}
                            />
                            <Form.Dropdown
                                label="Where"
                                placeholder="Enter location, postcode, state"
                                search
                                selection
                                value={searchWhere}
                            />
                            
                        </Form.Group>

                        <Form.Button
                            size="huge"
                            secondary>
                            <Icon name="search"></Icon>Search
                        </Form.Button>
                    </Form>
                </Container>
            </Segment>
        )
    }
}
