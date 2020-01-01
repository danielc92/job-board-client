import React, { Component } from 'react';
import { Segment, Header, Container } from 'semantic-ui-react';
import VerticallyPaddedContainer from '../layout/VerticallyPaddedContainer';
import { queryStringToObjectParser } from '../../helpers/query';
import { getJob } from '../../actions/job';
import { connect } from 'react-redux';

class ReactJobDetailContainer extends Component {
    componentDidMount() {
        const query = queryStringToObjectParser(this.props.location.search)
        console.log(query)
    }
    render() {
        console.log(this.props)
        return (
            <Segment basic color="white">
                <Container>
                    <VerticallyPaddedContainer size="3">
                    <Header>Job detail container</Header>
                    <p>Nostrud sint eiusmod quis tempor. Aliqua laborum do consectetur incididunt pariatur irure labore cupidatat do fugiat. Sint laborum culpa consequat enim dolore elit velit irure id consectetur reprehenderit ad. Duis elit cupidatat sunt magna ut. Duis cillum voluptate tempor fugiat.

Occaecat consectetur ea veniam veniam proident occaecat culpa occaecat ea consectetur est ullamco minim. Tempor fugiat quis culpa in anim officia fugiat nulla sit. Do non consequat ea eiusmod ad Lorem cupidatat deserunt occaecat elit sint. Laborum fugiat eiusmod ullamco eu mollit nulla do voluptate cupidatat minim amet et.

Deserunt consectetur duis amet do nostrud eu duis anim ullamco nulla voluptate occaecat esse elit. Enim incididunt anim aliqua laborum laborum ipsum minim quis qui qui. Cupidatat proident ea elit pariatur aliqua anim sit.

Proident voluptate elit sint eu id. Excepteur consequat nostrud reprehenderit cillum irure cillum tempor incididunt laborum nisi laboris. Voluptate labore dolor veniam magna in non sint dolor ipsum. Labore nisi velit voluptate do elit minim labore.

Consectetur ad culpa commodo ea cupidatat amet. Do proident veniam anim velit. Nostrud laboris sit cillum ex est magna in consequat pariatur enim.</p>
                    </VerticallyPaddedContainer>
                </Container>
               
            </Segment>
        )
    }
}

const mapStateToProps = state => {
    const { theme } = state; 
    return {
        theme
    }
}

const mapDispatchToProps = {
    propsGetJob: getJob
}


export default connect(mapStateToProps, mapDispatchToProps)(ReactJobDetailContainer);
