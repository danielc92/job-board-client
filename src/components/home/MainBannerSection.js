import React, { Component } from 'react'
import {
  Grid,
  Container,
  Segment,
  Header,
  Image,
  Button,
  Icon,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import VerticallyPaddedContainer from 'components/layout/VerticallyPaddedContainer'
import BannerSeperator from './BannerSeperator'

class MainBannerSection extends Component {
  render() {
    const { theme, ctaHeader, buttonText, ctaSubHeader, imageSrc } = this.props
    return (
      <section style={{ position: 'relative' }}>
        <Segment basic style={{ margin: 0 }}>
          <Container>
            <VerticallyPaddedContainer size="5">
              <Grid divided="vertically" stackable>
                <Grid.Row columns={2}>
                  <Grid.Column verticalAlign="middle">
                    <Header
                      as="h1"
                      style={{ fontSize: '3.5rem' }}
                      content={ctaHeader}
                    />
                    <p>{ctaSubHeader}</p>
                    <Button to="/job-list" as={Link} size="huge" color={theme}>
                      <Icon name="paper plane"></Icon>
                      {buttonText}
                    </Button>
                  </Grid.Column>
                  <Grid.Column>
                    <Image src={imageSrc} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </VerticallyPaddedContainer>
          </Container>
        </Segment>
        <BannerSeperator fillColor="#f9f9f9" backgroundColor="#fff" />
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  }
}

export default connect(mapStateToProps)(MainBannerSection)
