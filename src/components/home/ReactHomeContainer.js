import React, { Component } from 'react';
import ReactHero from './ReactHero';
import ReactFeatures from './ReactFeatures';
import { connect } from 'react-redux';
import { setMenuItem } from '../../actions/menu';
import SectionSplitHero from './SectionSplitHero';
import image from '../../images/undraw_interview_rmcf.svg';
class ReactHomeContainer extends Component {

    componentDidMount() {
        this.props.propsSetMenuItem('home')
    }
    render() {
        
        return (
            <React.Fragment>

                {/* Hero (split into two panes) */}
                <ReactHero/>
                
                {/* Features */}
                <ReactFeatures/>

                <SectionSplitHero 
                ctaHeader="Header" 
                ctaSubHeader="This is a sub header for the cta component"
                image={image}
                left/>

                <SectionSplitHero 
                ctaHeader="Header" 
                ctaSubHeader="This is a sub header for the cta component"
                image={image}
                left={false}/>
                
                <SectionSplitHero 
                ctaHeader="Header" 
                ctaSubHeader="This is a sub header for the cta component"
                image={image}
                left/>
                
            </React.Fragment>
            
        )
    }
}


const mapDispatchToProps = { 
    propsSetMenuItem: setMenuItem 
}


export default connect(null, mapDispatchToProps)(ReactHomeContainer);
