import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

export default class ApplicationHeader extends Component {
  render() {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell content="Name" />
          <Table.HeaderCell content="Status" />
          <Table.HeaderCell content="Applied" />
          <Table.HeaderCell content="Action" />
        </Table.Row>
      </Table.Header>
    )
  }
}
