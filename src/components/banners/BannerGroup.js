import React, { Component, Fragment } from 'react'
import FeedbackCtaSection from 'components/feedback/FeedbackCtaSection'

export default class BannerGroup extends Component {
  render() {
    const { showFeedback } = this.props
    return <Fragment>{showFeedback ? <FeedbackCtaSection /> : null}</Fragment>
  }
}
