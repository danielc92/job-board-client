import React, { Component } from 'react'
import { Segment, Container, Header, Form, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getLocationList } from '../../actions/location';
import VerticallyPaddedContainer from '../layout/VerticallyPaddedContainer';

class SearchContainer extends Component {

    state = {
        title: '',
        location_string: '',
        searchQuery: '',
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value})
    }

    handleSearchChange = (event, data) => {
        
        const { searchQuery } = data;
        const { locations, propsGetLocations } = this.props;
        const cleanQuery = searchQuery.trim();
        this.setState({ searchQuery: cleanQuery })
        
        const exists = locations.filter(i => i.search === cleanQuery)
        // No duplicate requests
        if ((cleanQuery.length >= 2) && (exists.length === 0)) {
            propsGetLocations(searchQuery);
        }
    }

    handleDropDownChange = (e, data) => {
        const { location_string } = data.value;
        this.setState({ location_string})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.handleNavigation({...this.state});
    }

    render() {
        const { title, searchQuery } = this.state;
        const { locations } = this.props;
        const locationOptions = locations.filter(item => item.search === searchQuery)
        return (
            <Segment basic>
                <Container>
                    <VerticallyPaddedContainer size="3">
                    <Header as="h1">Find your dream job.</Header>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Input
                                label="What" 
                                autoComplete="off"
                                maxLength={30}
                                name="title"
                                onChange={this.handleInputChange} 
                                placeholder='Enter some keywords...'
                                value={title}
                            />
                            <Form.Dropdown
                                label="Where"
                                onChange={this.handleDropDownChange}
                                onSearchChange={this.handleSearchChange}
                                options={locationOptions.length > 0 ? locationOptions[0]['data'] : []}
                                placeholder="Enter location, postcode, state"
                                search
                                selection
                                selectOnNavigation={false}
                                name="where"
                            />
                            
                        </Form.Group>

                        <Form.Button
                            size="large"
                            color="green">
                            <Icon name="search"></Icon>Search
                        </Form.Button>
                    </Form>
                    </VerticallyPaddedContainer>
                </Container>
            </Segment>
        )
    }
}

const mapStateToProps = state => {
    return {
        locations: state.locationList,
    }
}

const mapDispatchToProps = {
    propsGetLocations: getLocationList
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer)