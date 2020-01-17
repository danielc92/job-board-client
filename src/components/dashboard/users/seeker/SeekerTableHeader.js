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
                    <Table.HeaderCell content="Actions" colSpan="2"/>
                </Table.Row>
            </Table.Header>
        )
    }
}
