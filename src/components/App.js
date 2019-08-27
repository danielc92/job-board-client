import React, { Component } from 'react'
import ReactNav from './ReactNav';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../actions/auth';
import {
  Segment,
  Header,
  Message,
  Button,
  Grid,
  Image,
  List,
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
        


        
          <Segment style={{ padding: '5em 0em', margin: '0' }}>
          <Container>
            <Header as="h1" textAlign="center">Features</Header>
            <Grid columns={4} stackable>
              <Grid.Row>
                {
                  featureData.map(item => (
                    <Grid.Column style={{ textAlign: "center"}}>
                      <Icon name={item.icon} size="big"/>
                      <Header as={featureHeader}>{ item.title }</Header>
                      <p>{ item.content }</p>
                    </Grid.Column>
                  ))
                }
              </Grid.Row>
            </Grid>
            </Container>
          </Segment>
        

        <Segment color="blue" inverted style={{ padding: '5em 0em', margin: '0' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a'>Contact Us</List.Item>
                <List.Item as='a'></List.Item>
                <List.Item as='a'></List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Documentation' />
              <List link inverted>
                <List.Item as='a'>Terms and conditions</List.Item>
                <List.Item as='a'>Privacy</List.Item>
                <List.Item as='a'>FAQ</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Footer Header
              </Header>
              <p>
                Irure ad proident qui duis quis consectetur est. Minim officia voluptate duis veniam enim ut cupidatat enim laborum officia do in incididunt ea. Veniam eu aliqua qui sunt laboris laborum non deserunt. Voluptate occaecat ea aute dolore irure.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
        
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