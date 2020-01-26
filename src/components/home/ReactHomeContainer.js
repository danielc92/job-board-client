import React, { Component } from 'react'
import ReactHero from './ReactHero'
import ReactFeatures from './ReactFeatures'
import { connect } from 'react-redux'
import { setMenuItem } from '../../actions/menu'
import SectionSplitHero from './SectionSplitHero'
import image from '../../images/undraw_interview_rmcf.svg'
import image2 from '../../images/process_e90d.svg'
import image3 from '../../images/success_factors_fay0.svg'
import image4 from '../../images/Job_hunt_tinb.svg'

class ReactHomeContainer extends Component {
  componentDidMount() {
    this.props.propsSetMenuItem('home')
  }
  render() {
    return (
      <React.Fragment>
        {/* Hero (split into two panes) */}
        <ReactHero />

        {/* Features */}
        <ReactFeatures />

        <SectionSplitHero
          ctaHeader="Header"
          ctaSubHeader="This is a sub header for the cta component"
          image={image2}
          left
        />

        <SectionSplitHero
          ctaHeader="Header"
          ctaSubHeader="This is a sub header for the cta component"
          image={image3}
          left={false}
        />

        <SectionSplitHero
          ctaHeader="Header"
          ctaSubHeader="This is a sub header for the cta component"
          image={image}
          left
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  propsSetMenuItem: setMenuItem,
}

export default connect(null, mapDispatchToProps)(ReactHomeContainer)
