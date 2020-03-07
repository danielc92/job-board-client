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
        key: '2',
        icon: 'tasks',
        title: 'Track and monitor',
        content: 'Tracking your existing job applications with ease.',
      },
      {
        key: '3',
        icon: 'chart bar outline',
        title: 'Lorem Ipsum',
        content:
          'Id ullamco duis dolor eu labore est consectetur quis elit sit.',
      },
      {
        key: '4',
        icon: 'address card outline',
        title: 'Profile driven system',
        content: 'Configure your profile and let us handle the rest.',
      },
      {
        key: '5',
        icon: 'paper plane outline',
        title: 'Diverse Range',
        content: '...',
      },
      {
        key: '6',
        icon: 'gem outline',
        title: 'Quality Services',
        content:
          'We ensure a high level of care, making sure our services are of the highest quality.',
      },

      {
        key: '1',
        icon: 'save outline',
        title: 'Lorem Ipsum',
        content:
          'Id ullamco duis dolor eu labore est consectetur quis elit sit.',
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
                {featureData.slice(0, 3).map(item => (
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
                {featureData.slice(3, 7).map(item => (
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

const mapStateToProps = state => {
  return {
    theme: state.theme,
  }
}

export default connect(mapStateToProps)(FeaturesSection)
