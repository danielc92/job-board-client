import React, { Component } from 'react'
import { Segment, Container, Header, Form, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getLocationList } from '../../actions/location';

class SearchContainer extends Component {

    state = {
        searchWhat: 'dd',
        searchWhere: '',
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value})
    }

    handleSearchChange = (event, data) => {
        console.log('SEARCH CHANGES')
        const {searchQuery} = data;
        const cleanQuery = searchQuery.trim();
        if (cleanQuery.length >= 2) {
            this.props.propsGetLocations(searchQuery);
        }
    }

    handleDropDownChange = () => {
        console.log('DROPDOWN CHANGES')
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('SUBMIT')
    }

    render() {
        const { 
            searchWhat,
            searchWhere
        } = this.state

        const { location } = this.props; 
        return (
            <Segment color="green" inverted style={{borderRadius: '0', padding: '3rem 2rem', margin: '0'}}>
                <Container>
                    <Header as="h1">Find your dream job.</Header>
                    
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Input
                                label="What" 
                                maxLength={30}
                                name="searchWhat"
                                onChange={this.handleInputChange} 
                                placeholder='Enter some keywords...'
                                value={searchWhat}
                            />
                            <Form.Dropdown
                                label="Where"
                                onChange={this.handleDropDownChange}
                                onSearchChange={this.handleSearchChange}
                                options={location.data}
                                placeholder="Enter location, postcode, state"
                                search
                                selection
                                value={searchWhere}
                            />
                            
                        </Form.Group>

                        <Form.Button
                            size="large"
                            secondary>
                            <Icon name="search"></Icon>Search
                        </Form.Button>
                    </Form>
                </Container>
            </Segment>
        )
    }
}

const mapStateToProps = state => {
    return {
        location: state.locationList,
    }
}

const mapDispatchToProps = {
    propsGetLocations: getLocationList
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer)