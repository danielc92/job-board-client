import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Placeholder, Segment, Container, Divider, Button } from 'semantic-ui-react';
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
                            <Header key={item._id} as="h3">{item.title.toUpperCase()}
                            <Header.Subheader>Aliquip do veniam commodo labore reprehenderit est aute.</Header.Subheader></Header>
                           
                            <Button
                            color={this.props.theme}
                            size="tiny">click to view details</Button>
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
