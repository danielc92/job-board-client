import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { setMenuItem } from 'actions/menu'
import SectionSplitHero from './HeroSection'
import image2 from 'images/process_e90d.svg'
import image3 from 'images/success_factors_fay0.svg'
import image4 from 'images/feedback.svg'
import imageSrc from 'images/undraw_interview_rmcf.svg'
import MainBannerSection from './MainBannerSection'
import FeaturesSection from './FeaturesSection'

class HomePage extends Component {
  componentDidMount() {
    this.props.propsSetMenuItem('home')
  }
  render() {
    return (
      <Fragment>
        {/* Hero (split into two panes) */}
        <MainBannerSection
          imageSrc={imageSrc}
          ctaHeader="Welcome to Daniel's Job Board"
          ctaSubHeader="A data driven system, helping people find jobs they need."
          buttonText="Explore jobs"
        />

        {/* Features */}
        <FeaturesSection />

        <SectionSplitHero
          ctaHeader="Process"
          ctaSubHeader="An easy to use, intuitive process for setting up job postings and applying for jobs."
          image={image2}
          left
        />

        <SectionSplitHero
          ctaHeader="Personalization"
          ctaSubHeader="Customize your profile, so that employers can find you easily, and you can get the job you want."
          image={image3}
          left={false}
        />

        <SectionSplitHero
          ctaHeader="Feedback"
          ctaSubHeader="Our system is driven by feedback, ensuring the latest features are what matters to you."
          image={image4}
          left
        />
      </Fragment>
    )
  }
}

const mapDispatchToProps = {
  propsSetMenuItem: setMenuItem,
}

export default connect(null, mapDispatchToProps)(HomePage)
