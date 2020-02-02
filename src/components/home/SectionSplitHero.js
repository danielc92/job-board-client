import React, { Component } from 'react'
import { Grid, Container, Segment, Header, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import VerticallyPaddedContainer from '../layout/VerticallyPaddedContainer'

class SectionSplitHero extends Component {
  render() {
    const { ctaHeader, ctaSubHeader, image, left } = this.props
    const style = left ? { textAlign: 'right' } : null
    const imageStyle = { maxWidth: '400px' }
    return (
      <Segment basic>
        <Container>
          <VerticallyPaddedContainer size="5">
            <Grid divided="vertically" stackable>
              <Grid.Row columns={2}>
                {left === true ? (
                  <Grid.Column>
                    <Image src={image} style={imageStyle} />
                  </Grid.Column>
                ) : null}
                <Grid.Column verticalAlign="middle" style={style}>
                  <Header as="h1" style={{ fontSize: '3rem' }}>
                    {ctaHeader}
                  </Header>
                  <p>{ctaSubHeader}</p>
                </Grid.Column>
                {left === false ? (
                  <Grid.Column>
                    <Image src={image} style={imageStyle} />
                  </Grid.Column>
                ) : null}
              </Grid.Row>
            </Grid>
          </VerticallyPaddedContainer>
        </Container>
      </Segment>
    )
  }
}

const mapStateToProps = state => {
  return {
    theme: state.theme,
  }
}

export default connect(mapStateToProps)(SectionSplitHero)
