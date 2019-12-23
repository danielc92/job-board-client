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
        const {searchQuery} = data;
        const cleanQuery = searchQuery.trim();
        if (cleanQuery.length >= 2) {
            this.props.propsGetLocations(searchQuery);
        }
    }

    handleDropDownChange = (e, data) => {
        const { location_string } = data.value;
        this.setState({ searchWhere: location_string})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('SUBMIT')
    }

    render() {
        const { searchWhat } = this.state
        const { locality } = this.props;
        console.log(locality, 'this is locality')

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
                                options={locality.data}
                                placeholder="Enter location, postcode, state"
                                search
                                selection
                                selectOnNavigation={false}
                                name="where"
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
        locality: state.locationList,
    }
}

const mapDispatchToProps = {
    propsGetLocations: getLocationList
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer)