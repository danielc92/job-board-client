import { Header, Divider } from 'semantic-ui-react'
import React, { Fragment } from 'react'

export const documentationRenderer = (data, key) => {
  if (!data) return null

  const content = data.find(c => c.route === key)
  const items = content.content.map(c => {
    if (c.node === 'heading-3') {
      return <Header as="h3" content={c.value} />
    }
    if (c.node === 'paragraph') {
      return <p>{c.value}</p>
    }
    return <p>Unknown node.</p>
  })
  return (
    <Fragment>
      <Header as="h1" content={content.title} />
      <Divider />
      {items}
    </Fragment>
  )
}
