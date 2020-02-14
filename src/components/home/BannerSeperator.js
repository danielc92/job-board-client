import React from 'react'

export default function BannerSeperator() {
  return (
    <svg
      style={{
        height: '7vh',
        width: '100%',
        background: '#ffffff',
        position: 'absolute',
        bottom: '0',
      }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <polygon fill="#f9f9f9" points="0,100 100,0 100,100" />
    </svg>
  )
}
