import React from 'react'
import { Icon, Image, Message, Button } from 'semantic-ui-react'
import src from '../../images/page_not_found_su7k.svg'

export default function CustomErrorMessage(props) {
  return (
    <section
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Image style={{ maxWidth: '375px' }} centered fluid src={src} />
      <Message color="red" header={props.header} content={props.content} />
      <Button
        centered
        color="green"
        size="big"
        onClick={() => window.location.reload()}
      >
        <Icon name="refresh" />
        Refresh Page
      </Button>
    </section>
  )
}
