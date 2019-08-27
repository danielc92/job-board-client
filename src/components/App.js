import React, { Component } from 'react'
import ReactMenu from './ReactMenu';
import ReactFooter from './ReactFooter';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../actions/auth';
import {
  Segment,
  Header,
  Message,
  Grid,
  Image,
  Container,
  Icon
} from 'semantic-ui-react';
import image from '../images/undraw_interview_rmcf.svg'


class App extends Component {

  state = {
    featureHeader: "h3",
    featureData: [
      {
        icon: "briefcase",
        title: "Variety",
        content: "Large variety of professions to choose from."
      },
      {
        icon: "user",
        title: "Profile based",
        content: "Optimized for job hunters and employers."
      },
      {
        icon: "database",
        title: "Data driven",
        content: "Optimised search results. CV Free."
      },
      { 
      icon: "chart line", 
      title:"Analytics", 
      content:"Gain insights into the job market."}]
  }
  render() {

    const { featureHeader, featureData } = this.state;

    return (
      <React.Fragment>
        <Container>
         <Message style={{textAlign:"center"}} color="blue">This application is currently in <strong>development</strong> phase.</Message>
         </Container>
        

        <ReactNav></ReactNav>
        

        
        <Segment style={{margin: '0', padding: '5rem 0rem'}}>
          <Container>
          <Grid divided='vertically' stackable>
          <Grid.Row columns={2}>
            <Grid.Column verticalAlign="middle">
              <Header as="h1" style={{fontSize: '3rem'}}>
                Data driven job board.
                <Header.Subheader>
                Irure nostrud ea aliqua incididunt ex irure sint excepteur.
                </Header.Subheader>
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Image size="medium" src={image} />
            </Grid.Column>
            
          </Grid.Row>
          </Grid>
          </Container>
          </Segment>
        
          {/* Features */}
          <ReactFeatures/>

          {/* Footer */}
          <ReactFooter/>

      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapActionsToProps = {
  propsLoginUser: loginUser,
  propsLogoutUser: logoutUser
}

export default connect(mapStateToProps, mapActionsToProps)(App)