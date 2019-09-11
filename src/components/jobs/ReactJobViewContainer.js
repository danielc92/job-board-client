import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Segment, Container, Divider, Button, Icon, Label } from 'semantic-ui-react';
import { setMenuItem } from '../../actions/menu';
import { getJobList } from '../../actions/joblist';


class ReactJobViewContainer extends Component {

    componentDidMount() {
        this.props.propsSetMenuItem('find');
        this.props.propsGetJobList();
    }

    render() {
        
        const { data, error } = this.props.jobList;

        return (
            <Container>
                <Segment style={{ padding: '7rem 0', border: 'none', boxShadow: 'none', margin: 'none'}}>
                    <Header as="h1">View Jobs</Header>
                    <Divider></Divider>
                    { data.map(item => (
                        <Segment stacked>
                            <Header 
                            key={ item._id } 
                            as="h2">
                                { item.title.toUpperCase() }
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
