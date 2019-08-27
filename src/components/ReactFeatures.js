import React, { Component } from 'react';
import { Segment, Container, Header, Transition, Grid, Icon} from 'semantic-ui-react';
import { connect } from 'react-redux';

class ReactFeatures extends Component {

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
            <Segment style={{ padding: '7em 0em', margin: '0' }}>
            <Container>
              <Header as="h1" textAlign="center" style={{marginBottom: '5rem'}}>Features</Header>
              <Transition visible={true} duration={600} animation="scale">
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
              </Transition>
            </Container>
          </Segment>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    theme: state.theme
  }
}

export default connect(mapStateToProps)(ReactFeatures);