import { Progress } from 'semantic-ui-react';

import React, { Component } from 'react'

export default class ReactProgressContainer extends Component {
    render() {
        const { percent } = this.props;
        return (
            <Progress 
                percent={percent} 
                size="small" 
                indicating 
                label={percent === 100 ? 'Completed' : "Progress"}/>
        )
    }
}
