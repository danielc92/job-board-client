import React, { Fragment } from 'react'
import { Image, Message } from 'semantic-ui-react'
import src from '../../images/undraw_authentication_fsn5.svg'

export default function ResuableAuthenticationMessage(props) {
  return (
    <Fragment>
      <Image style={{ maxWidth: '375px' }} centered fluid src={src} />
      <Message color="orange" header={props.header} content={props.content} />
    </Fragment>
  )
}
