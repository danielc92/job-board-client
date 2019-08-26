import React, { Component } from 'react'
import ReactNav from './ReactNav';
import {
  Segment,
  Header,
  Message,
  Grid,
  Container,
  Icon
} from 'semantic-ui-react';

export default class App extends Component {

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
        title: "Something for everyone",
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
         
        <Message style={{textAlign:"center"}} color="green">This application is currently under development phase.</Message>

        <ReactNav></ReactNav>
       
        <Container>
          <Segment padded="very">
            <Header as="h1">Features</Header>
            <Grid columns={3}>
              <Grid.Row>
                {
                  featureData.map(item => (
                    <Grid.Column style={{ textAlign: "center", padding: "1rem"}}>
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
