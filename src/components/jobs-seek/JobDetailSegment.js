import React from 'react'
import { Header, Segment, Grid, Label } from 'semantic-ui-react'

export default function JobDetailSegment(props) {
  const { job_details } = props
  return (
    <Segment padded stacked>
      <Header as="h5" content="About the job" />
      <p>{job_details.data.job_summary}</p>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h5" content="Salary" />
            <Label color="blue" basic>
              ${job_details.data.salary_range_low} - $
              {job_details.data.salary_range_high}
            </Label>
          </Grid.Column>
          <Grid.Column width={8}>
            <Header as="h5" content="Location" />
            <p>{job_details.data.location_string}</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Grid stackable>
        <Grid.Row>
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
      <p>{job_details.data.company_summary}</p>
      <Header as="h5" content="Contact Summary" />
      <p>{job_details.data.contact_summary}</p>
    </Segment>
  )
}
