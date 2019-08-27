import React, { Component } from 'react'
import ReactNav from './ReactNav';
import { connect } from 'react-redux';
import {
  Segment,
  Header,
  Message,
  Grid,
  Image,
  Container,
  Icon
} from 'semantic-ui-react';

import image from '../images/undraw_Job_hunt_tinb.svg'

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
        

        <Container>
          <Segment padded="very">
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
          </Segment>
        </Container>


        <Container>
          <Segment padded="very">
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
          </Segment>
        </Container>
        
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state
  }
}


export default connect()(App)