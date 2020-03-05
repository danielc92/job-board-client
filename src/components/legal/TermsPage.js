import React, { Component, Fragment } from 'react'
import { Container, Segment, Placeholder } from 'semantic-ui-react'
import VerticallyPaddedContainer from 'components/layout/VerticallyPaddedContainer'
import { connect } from 'react-redux'
import { getDocumentation } from 'actions/documentation'
import CustomErrorMessage from 'components/reusable/CustomErrorMessage'
import { documentationRenderer } from 'helpers/renderer'
class TermsPage extends Component {
  componentDidMount() {
    const { propsGetDocumentation, documentation } = this.props
    if (!documentation.data) {
      propsGetDocumentation()
    }
  }

  render() {
    const { documentation } = this.props

    return (
      <Container>
        <VerticallyPaddedContainer size="4">
          {documentation.error ? (
            <CustomErrorMessage content="An error has occured" />
          ) : documentation.loading ? (
            <Fragment>
              <Placeholder fluid>
                <Placeholder.Header>
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Header>
              </Placeholder>
              <Segment stacked padded>
                <Placeholder fluid>
                  <Placeholder.Paragraph>
                    <Placeholder.Line /> <Placeholder.Line />{' '}
                    <Placeholder.Line /> <Placeholder.Line />{' '}
                    <Placeholder.Line /> <Placeholder.Line />{' '}
                    <Placeholder.Line />
                    <Placeholder.Line /> <Placeholder.Line />{' '}
                    <Placeholder.Line /> <Placeholder.Line />
                    <Placeholder.Line /> <Placeholder.Line />{' '}
                    <Placeholder.Line /> <Placeholder.Line />{' '}
                    <Placeholder.Line /> <Placeholder.Line />
                  </Placeholder.Paragraph>
                </Placeholder>
              </Segment>
            </Fragment>
          ) : (
            documentationRenderer(documentation.data, 'terms-of-use')
          )}
        </VerticallyPaddedContainer>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const { documentation } = state
  return {
    documentation,
  }
}

const mapDispatchToProps = {
  propsGetDocumentation: getDocumentation,
}

export default connect(mapStateToProps, mapDispatchToProps)(TermsPage)
