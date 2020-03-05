import React from 'react'
import { Header, Segment, Grid, Icon, Label } from 'semantic-ui-react'

const marginStyle = { marginBottom: '24px' }

export default function JobDetailSegment(props) {
  const { job_details } = props
  return (
    <Segment padded stacked>
      <Header as="h5" content="About the job" />
      <p style={marginStyle}>{job_details.data.job_summary}</p>
      <Grid stackable>
        <Grid.Row style={marginStyle}>
          <Grid.Column width={5}>
            <Header as="h5">
              {/* <Icon name="money bill alternate outline" /> */}
              <Header.Content>Salary</Header.Content>
            </Header>
            <p>
              ${job_details.data.salary_range_low} - $
              {job_details.data.salary_range_high}
            </p>
          </Grid.Column>
          <Grid.Column width={5}>
            <Header as="h5">
              {/* <Icon name="tag" /> */}
              <Header.Content>Category</Header.Content>
            </Header>
            <p>{job_details.data.category}</p>
          </Grid.Column>
          <Grid.Column width={5}>
            <Header as="h5">
              {/* <Icon name="map outline" /> */}
              <Header.Content>Location</Header.Content>
            </Header>
            <p>{job_details.data.location_string}</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Grid stackable style={{ marginTop: 0 }}>
        <Grid.Row style={marginStyle}>
          <Grid.Column width={8}>
            <Header as="h5" content="Skills" />
            <Label.Group>
              {job_details.data.skills.map(item => (
                <Label basic color="green">
                  {item}
                </Label>
              ))}
            </Label.Group>
          </Grid.Column>
          <Grid.Column width={8}>
            <Header as="h5" content="Benefits" />
            <Label.Group>
              {job_details.data.benefits.map(item => (
                <Label basic color="green">
                  {item}
                </Label>
              ))}
            </Label.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Header as="h5" content="About the company" />
      <p style={marginStyle}>{job_details.data.company_summary}</p>
      <Header as="h5" content="Contact Summary" />
      <p style={marginStyle}>{job_details.data.contact_summary}</p>
    </Segment>
  )
}