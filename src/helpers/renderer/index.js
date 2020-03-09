import { Header, Divider } from 'semantic-ui-react'
import React, { Fragment } from 'react'

export const contentRenderer = data => {
  if (!data) return null

  const items = data.map(c => {
    if (c.node === 'heading-3') {
      return <Header as="h3" content={c.value} />
    }
    if (c.node === 'heading-1') {
      return <Header as="h1" content={c.value} />
    }
    if (c.node === 'paragraph') {
      return <p>{c.value}</p>
    }
    if (c.node === 'unordered-list') {
      const listItems = c.value.map(li => <li>{li}</li>)
      return <ul>{listItems}</ul>
    }
    if (c.node === 'ordered-list') {
      const listItems = c.value.map(li => <li>{li}</li>)
      return <ol>{listItems}</ol>
    }
    return <p>Unknown node.</p>
  })
  return items
}

export const documentationRenderer = (data, key) => {
  if (!data) return null

  const content = data.find(c => c.route === key)

  const items = contentRenderer(content.content)

  return (
    <Fragment>
      <Header as="h1" content={content.title} />
      <Divider />
      {items}
    </Fragment>
  )
}
