import React, { Component } from 'react';
import ReactHero from './ReactHero';
import ReactFeatures from './ReactFeatures';
import { connect } from 'react-redux';
import { setMenuItem } from '../../actions/menu';

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
                
            </React.Fragment>
            
        )
    }
}


const mapDispatchToProps = { 
    propsSetMenuItem: setMenuItem 
}


export default connect(null, mapDispatchToProps)(ReactHomeContainer);
