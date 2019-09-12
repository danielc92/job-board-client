import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Segment, Container, Divider, Button, Icon, Label, Grid, Message } from 'semantic-ui-react';
import { setMenuItem } from '../../actions/menu';
import { getJobList } from '../../actions/joblist';
import { properCaseTransform } from '../../helpers/generic';

class ReactJobViewContainer extends Component {

    componentDidMount() {
        this.props.propsSetMenuItem('find');
        this.props.propsGetJobList();
    }


    render() {
        
        const { data, error } = this.props.jobList;

        return (
            <Container>
                <Grid stackable>
                    <Grid.Row columns={2}>
                        <Grid.Column width={10}>
                        <Segment style={{ padding: '7rem 0', border: 'none', boxShadow: 'none', margin: 'none'}}>
                            <Header as="h1">View Jobs</Header>
                            <Divider></Divider>
                            { data.map(item => (
                                <Segment stacked>
                                    <Header 
                                    key={ item._id } 
                                    as="h3">
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
                                </Segment>
                                    
                            ))}
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
        )
    }
}

const mapStateToProps = state => {
    return {
        jobList: state.jobList,
        theme: state.theme
    }
}

const mapActionsToProps = {
    propsSetMenuItem: setMenuItem,
    propsGetJobList : getJobList
}

export default connect(mapStateToProps, mapActionsToProps)(ReactJobViewContainer)
