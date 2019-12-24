import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    Button, 
    Container, 
    Divider, 
    Grid, 
    Header, 
    Icon, 
    Label, 
    Message,
    Segment, 
} from 'semantic-ui-react';
import { setMenuItem } from '../../actions/menu';
import { getJobList } from '../../actions/joblist';
import { properCaseTransform } from '../../helpers/generic';
import SearchContainer from './SearchContainer';
import { queryStringToObjectParser } from '../../helpers/query';

class ReactJobViewContainer extends Component {

    componentDidMount() {
        // Check for query strings (placeholder)
        const { search } = this.props.location;
        const queryObject = queryStringToObjectParser(search)
        
        // Retrieve jobs
        this.props.propsSetMenuItem('find');
        this.props.propsGetJobList(queryObject);
    }

    handleNavigation = (option) => {
        console.log('handled', option)
        // this.props.history.push('/')
    }

    render() {
        
        const { data } = this.props.jobList;
        const { error } = this.props.jobList;
        console.log(data, 'this is data')
        const proceed = (Object.entries(data).length > 0) ? true : false;
        return (
            <React.Fragment>
            <SearchContainer handleNavigation={this.handleNavigation}></SearchContainer>
            <Container>
                <Grid stackable>
                    <Grid.Row columns={2}>
                        <Grid.Column width={10}>
                        <Segment style={{ padding: '7rem 0', border: 'none', boxShadow: 'none', margin: 'none'}}>
                            <Header as="h1">Results</Header>
                            <Divider></Divider>
                            { proceed && (!error) ? 
                                data.data.docs.map(item => (
                                <Segment stacked key={ item._id }>
                                    <Header as="h3">
                                        { properCaseTransform(item.title) }
                                        <Header.Subheader>
                                            { item.job_summary }
                                        </Header.Subheader>
                                    </Header>
                                    <Label
                                    color="green" 
                                    basic>
                                    ${ item.salary_range_low } - ${ item.salary_range_high }
                                    
                                    </Label>
                                    <Divider></Divider>
                                    <Button
                                    color={this.props.theme}
                                    size="tiny">
                                    <Icon name="eye"></Icon>view this job</Button>
                                </Segment>))
                                :  <Segment>No results have been found.</Segment>}
                        </Segment>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Segment
                            style = {{ padding: '7rem 0', border: 'none', boxShadow: 'none', margin: 'none'}}>
                            <Message
                            info
                            header="Placeholder"
                            content="Sit do aute minim ex exercitation laboris esse. Amet Lorem labore et sit ex. Consectetur Lorem tempor reprehenderit et esse quis minim exercitation velit eu. Anim voluptate nostrud amet aliqua aute do velit deserunt qui magna irure. Magna fugiat nisi nostrud deserunt ea tempor proident anim. Eu veniam ullamco anim in cillum."></Message>
                            </Segment>
                            
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    const { jobList, theme } = state; 
    return {
        jobList,
        theme,
    }
}

const mapDispatchToProps = {
    propsSetMenuItem: setMenuItem,
    propsGetJobList : getJobList
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactJobViewContainer)
