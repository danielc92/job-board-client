import React, { Component } from 'react';
import ReactHero from './ReactHero';
import ReactFeatures from './ReactFeatures';

export default class ReactHomeContainer extends Component {
    render() {
        return (
            <React.Fragment>

                {/* Hero (split into two panes) */}
                <ReactHero/>
                
                {/* Features */}
                <ReactFeatures/>
                
            </React.Fragment>
            
        )
    }
}
