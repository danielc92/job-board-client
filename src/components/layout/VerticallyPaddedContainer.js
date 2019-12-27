import React, { Component } from 'react'

export default class VerticallyPaddedContainer extends Component {
    render() {
        const { children, size } = this.props;
        const sizes =  {
            '0': 8, 
            '1': 16,
            '2': 24,
            '3': 36,
            '4': 48,
            '5': 80,
            '6': 120,
            '7': 150,
            '8': 200,
        }
        const style = {
            padding: `${sizes[size]}px 0px`
        }
        console.log(size, style)
        return (
            <section style={style}>
                {children}
            </section>
        )
    }
}
