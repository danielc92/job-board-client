import React, { Component } from 'react'
import { Label, Header, Table, Icon, Divider } from 'semantic-ui-react'

export default class RenderApplicantProfile extends Component {
  render() {
    const {
      summary,
      skills,
      experience,
      education,
      available,
      phone,
    } = this.props.data
    return (
      <React.Fragment>
        <Header as="h2" content="Career Profile" />
        <Divider />
        <Header content="Summary" />
        {summary.length > 0 ? (
          <p>{summary}</p>
        ) : (
          <p>Applicant has no career summary.</p>
        )}

        <Header content="Skills" />
        {skills.length > 0 ? (
          <Label.Group>
            {skills.map(skill_name => (
              <Label color="green" basic size="medium">
                {skill_name}
              </Label>
            ))}
          </Label.Group>
        ) : (
          <p>Applicant does not have any skills added to their profile.</p>
        )}

        <Header content="Availability" />
        {available ? (
          <p>
            Applicant is currently <strong>available</strong> for jobs and
            contactable via {phone}.
          </p>
        ) : (
          <p>
            Applicant is currently <strong>unavailable</strong> for jobs.
          </p>
        )}

        <Header content="Experience" />
        {experience.length > 0 ? (
          <Table striped celled>
            <Table.Header>
              <Table.HeaderCell content="Title" />
              <Table.HeaderCell content="Company" />
              <Table.HeaderCell content="Started" />
              <Table.HeaderCell content="Ended" />
              <Table.HeaderCell content="Details" />
            </Table.Header>
            <Table.Body>
              {experience.map(e => (
                <Table.Row key={e.key}>
                  <Table.Cell content={e.title} />
                  <Table.Cell content={e.company} />
                  <Table.Cell content={e.start} />
                  <Table.Cell content={e.end} />
                  <Table.Cell content={e.details} />
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <p>Applicant does not have any recorded experience details.</p>
        )}

        <Header content="Education" />
        {education.length > 0 ? (
          <Table striped celled>
            <Table.Header>
              <Table.HeaderCell content="School" />
              <Table.HeaderCell content="Course" />
              <Table.HeaderCell content="Started" />
              <Table.HeaderCell content="Ended" />
              <Table.HeaderCell content="Grade/GPA" />
            </Table.Header>
            <Table.Body>
              {education.map(e => (
                <Table.Row key={e.key}>
                  <Table.Cell content={e.school} />
                  <Table.Cell content={e.course} />
                  <Table.Cell content={e.start} />
                  <Table.Cell content={e.end} />
                  <Table.Cell content={e.gpa} />
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <p>Applicant does not have any recorded education details.</p>
        )}
      </React.Fragment>
    )
  }
}
