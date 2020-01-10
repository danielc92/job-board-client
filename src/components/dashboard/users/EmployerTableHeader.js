import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

export default class EmployerTableHeader extends Component {
    render() {
        return (
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>
                        Title
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        Status
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        Posted on
                    </Table.HeaderCell>
                    <Table.HeaderCell colSpan='2'>
                        Action
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        )
    }
}
