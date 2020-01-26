import React, { Fragment } from 'react'
import { Image, Message } from 'semantic-ui-react'
import src from '../../images/page_not_found_su7k.svg'

export default function CustomErrorMessage(props) {
  return (
    <Fragment>
      <Image style={{ maxWidth: '375px' }} centered fluid src={src} />
      <Message color="red" header={props.header} content={props.content} />
    </Fragment>
  )
}
