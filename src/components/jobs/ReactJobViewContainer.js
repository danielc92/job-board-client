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
    Pagination,
    Segment, 
} from 'semantic-ui-react';
import { setMenuItem } from '../../actions/menu';
import { getJobList } from '../../actions/job_list_seeker';
import { properCaseTransform } from '../../helpers/generic';
import SearchContainer from './SearchContainer';
import { queryStringToObjectParser, objectToQueryStringParser } from '../../helpers/query';
import VerticallyPaddedContainer from '../layout/VerticallyPaddedContainer';
class ReactJobViewContainer extends Component {

    componentDidMount() {
        this.props.propsSetMenuItem('find');
        this.props.propsGetJobList({});
    }

    // handleNavigation = (object) => {
    //     const { history } = this.props;
    //     const search = objectToQueryStringParser(object);
    //     history.push({
    //         pathname: '/view-jobs',
    //         search
    //     });
    // }

    handlePageChange = (event, data) => {
        const { history } = this.props;
        const { activePage } = data;
        history.push({
            pathname: '/view-jobs',
            state: { ...this.props.location.state, page: activePage},
        })
    }

    handleViewJob = (id) => {
        const { history } = this.props;
        history.push({
            pathname: '/view-job',
            search: `?id=${id}`
        })
    }

    componentWillReceiveProps(){
        try {
            if ((this.props.history.location.state.title !== this.props.location.state.title) ||
            (this.props.history.location.state.page !== this.props.location.state.page)||
            (this.props.history.location.state.category !== this.props.location.state.category)||
            (this.props.history.location.state.location_string !== this.props.location.state.location_string)){
                this.props.propsGetJobList({...this.props.location.state});
            }
        } catch (error) { 
            console.error(error)
        }
    }

    render() {
        const { data, error, loaded, message } = this.props.jobList;
        return (
            <React.Fragment>
            <SearchContainer/>
            <Container>
                <VerticallyPaddedContainer size="4">
                <Grid stackable>
                    <Grid.Row columns={2}>
                        <Grid.Column width={10}>
                        {
                            error ? 
                            <Segment color="red" stacked>
                                <Header as="h3" content="Error"/>
                                <p>{ message }</p>
                            </Segment>
                            : null
                        }
                        {
                            loaded ?
                            <Segment basic>
                            <Header as="h1" content="Results"/>
                            <p>We found { data.totalDocs } jobs matching your search</p>
                            <Divider></Divider>
                            { 
                                data.docs.map(item => (
                                    <Segment stacked key={ item._id }>
                                        <Header as="h3">
                                            { properCaseTransform(item.title) }
                                            <Header.Subheader>
                                                { item.job_summary }
                                            </Header.Subheader>
                                        </Header>
                                        <Label
                                            color="green" 
                                            basic>${ item.salary_range_low } - ${ item.salary_range_high }
                                        </Label>
                                        <Divider/>
                                        <Button
                                            color={this.props.theme}
                                            size="tiny"
                                            onClick={() => this.handleViewJob(item._id)}>
                                            <Icon name="eye"></Icon>view this job
                                        </Button>
                                    </Segment>)
                                )}

                                <Pagination
                                    defaultActivePage={data.page}
                                    ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                                    firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                                    lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                                    prevItem={{ content: <Icon name='angle left' />, icon: true }}
                                    nextItem={{ content: <Icon name='angle right' />, icon: true }}
                                    totalPages={data.totalPages}
                                    onPageChange={this.handlePageChange}
                                />
                        </Segment>
                            : null
                        }
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Message
                            info
                            header="Placeholder"
                            content="Sit do aute minim ex exercitation laboris esse. Amet Lorem labore et sit ex. Consectetur Lorem tempor reprehenderit et esse quis minim exercitation velit eu. Anim voluptate nostrud amet aliqua aute do velit deserunt qui magna irure. Magna fugiat nisi nostrud deserunt ea tempor proident anim. Eu veniam ullamco anim in cillum."></Message>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                </VerticallyPaddedContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReactJobViewContainer);
