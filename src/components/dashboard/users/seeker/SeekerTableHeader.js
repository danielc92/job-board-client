import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
export default class SeekerTableHeader extends Component {
    render() {
        return (
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell content="Title"/>
                    <Table.HeaderCell content="Status"/>
                    <Table.HeaderCell content="Applied"/>
                    <Table.HeaderCell content="Withdraw"/>
                    <Table.HeaderCell content="View"/>
                </Table.Row>
            </Table.Header>
        )
    }
}
