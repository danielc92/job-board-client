import React, { Component } from 'react'
import { Segment, Container, Header, Grid, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import VerticallyPaddedContainer from 'components/layout/VerticallyPaddedContainer'
import BannerSeperator from './BannerSeperator'

class FeaturesSection extends Component {
  state = {
    featureHeader: 'h3',
    featureData: [
      {
        key: '5',
        icon: 'paper plane outline',
        title: 'Diverse Range',
        content: 'Job creation through various skills, benefits and locations.',
      },
      {
        key: '6',
        icon: 'gem outline',
        title: 'Quality Services',
        content:
          'We love to improve, making sure you receive high quality services.',
      },

      {
        key: '1',
        icon: 'star outline',
        title: 'Feedback system',
        content: 'We hear your feedback and adapt to changes.',
      },
      {
        key: '2',
        icon: 'tasks',
        title: 'Track and monitor',
        content: 'Real-time tracking of applications and postings.',
      },
      {
        key: '3',
        icon: 'chart bar outline',
        title: 'Analytics',
        content: 'Metric driven analytics.',
      },
      {
        key: '4',
        icon: 'address card outline',
        title: 'Profiles',
        content: 'Fill out a few details and improve your job search.',
      },
    ],
  }

  render() {
    const { featureHeader, featureData } = this.state

    return (
      <Segment basic style={{ backgroundColor: '#f9f9f9', margin: 0 }}>
        <Container>
          <VerticallyPaddedContainer size="6">
            <Header
              as="h1"
              textAlign="center"
              content="What we can do for you"
              style={{ marginBottom: '5rem' }}
            />
            <Grid padded columns={3} stackable>
              <Grid.Row>
                {featureData.slice(0, 3).map((item) => (
                  <Grid.Column key={item.key} textAlign="center">
                    <Icon
                      color={this.props.theme}
                      name={item.icon}
                      size="big"
                    />
                    <Header as={featureHeader} content={item.title} />
                    <p>{item.content}</p>
                  </Grid.Column>
                ))}
              </Grid.Row>
              <Grid.Row>
                {featureData.slice(3, 7).map((item) => (
                  <Grid.Column textAlign="center" key={item.key}>
                    <Icon
                      color={this.props.theme}
                      name={item.icon}
                      size="big"
                    />
                    <Header as={featureHeader} content={item.title} />
                    <p>{item.content}</p>
                  </Grid.Column>
                ))}
              </Grid.Row>
            </Grid>
          </VerticallyPaddedContainer>
        </Container>

        <BannerSeperator fillColor="#fff" backgroundColor="#f9f9f9" />
      </Segment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  }
}

export default connect(mapStateToProps)(FeaturesSection)
