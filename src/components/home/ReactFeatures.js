import React, { Component } from 'react';
import { Segment, Container, Header, Grid, Icon} from 'semantic-ui-react';
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
            icon: "star",
            title: "Rate and review",
            content: "Rate applications"
          },
          { 
            icon: "chart line", 
            title:"Analytics", 
            content:"Gain insights into the job market."
          }]
      }

    render() {
        
        const { featureHeader, featureData } = this.state;

        return (
            <Segment style={{ 
              backgroundColor: '#f9f9f9',
              padding: '7em 0em', 
              margin: '0', 
              border: 'none', 
              boxShadow:'none' }}>
            <Container>
              <Header as="h1" textAlign="center" style={{marginBottom: '5rem'}}>
                What we can do for you
                </Header>
              <Grid padded columns={3} stackable>
                <Grid.Row>
                  {
                    featureData.slice(0, 3).map(item => (
                      
                      <Grid.Column style={{ textAlign: "center"}}>
                        <Icon color={this.props.theme} name={item.icon} size="big"/>
                        <Header as={featureHeader}>{ item.title }</Header>
                        <p>{ item.content }</p>
                      </Grid.Column>
                
                    ))
                  }
                </Grid.Row>
                <Grid.Row>
                  {
                    featureData.slice(3, 7).map(item => (
                      
                      <Grid.Column style={{ textAlign: "center"}}>
                        <Icon color={this.props.theme} name={item.icon} size="big"/>
                        <Header as={featureHeader}>{ item.title }</Header>
                        <p>{ item.content }</p>
                      </Grid.Column>
                
                    ))
                  }
                </Grid.Row>
              </Grid>
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