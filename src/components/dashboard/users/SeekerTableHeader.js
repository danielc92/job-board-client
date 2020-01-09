import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
export default class SeekerTableHeader extends Component {
    render() {
        return (
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>Applied</Table.HeaderCell>
                    <Table.HeaderCell>Withdraw</Table.HeaderCell>
                    <Table.HeaderCell>View</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        )
    }
}
