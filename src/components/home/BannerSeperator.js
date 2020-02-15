import React from 'react'

export default function BannerSeperator(props) {
  const { fillColor, backgroundColor } = props
  return (
    <svg
      style={{
        height: '7vh',
        width: '100%',
        background: backgroundColor,
        position: 'absolute',
        bottom: '0',
      }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <polygon fill={fillColor} points="0,100 100,0 100,100" />
    </svg>
  )
}
