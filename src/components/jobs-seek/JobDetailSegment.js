import React from 'react'
import { Header, Segment, Grid, Label } from 'semantic-ui-react'

const marginStyle = { marginBottom: '24px' }

export default function JobDetailSegment(props) {
  const {
    job_summary,
    salary_range_high,
    contact_summary,
    benefits,
    company_summary,
    location_string,
    skills,
    employment_type,
    salary_range_low,
    category,
  } = props.job_details.data
  return (
    <Segment padded stacked>
      <Header as="h5" content="About the job" />
      <p style={marginStyle}>{job_summary}</p>
      <Grid stackable>
        <Grid.Row style={marginStyle}>
          <Grid.Column width={4}>
            <Header as="h5">
              {/* <Icon name="money bill alternate outline" /> */}
              <Header.Content>Salary</Header.Content>
            </Header>
            <Label basic color="green">
              {`$${salary_range_low} - ${salary_range_high}`}
            </Label>
          </Grid.Column>
          <Grid.Column width={4}>
            <Header as="h5">
              <Header.Content>Category</Header.Content>
            </Header>
            <Label basic color="green">
              {category}
            </Label>
          </Grid.Column>
          <Grid.Column width={4}>
            <Header as="h5">
              <Header.Content>Employment Type</Header.Content>
            </Header>
            <Label basic color="green">
              {employment_type}
            </Label>
          </Grid.Column>
          <Grid.Column width={4}>
            <Header as="h5">
              <Header.Content>Location</Header.Content>
            </Header>
            <Label basic color={location_string ? 'green' : ''}>
              {location_string ? location_string : 'No location specified.'}
            </Label>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Grid stackable style={{ marginTop: 0 }}>
        <Grid.Row style={marginStyle}>
          <Grid.Column width={8}>
            <Header as="h5" content="Skills" />
            <Label.Group>
              {skills.map((item) => (
                <Label basic color="green">
                  {item}
                </Label>
              ))}
            </Label.Group>
          </Grid.Column>
          <Grid.Column width={8}>
            <Header as="h5" content="Benefits" />
            <Label.Group>
              {benefits.map((item) => (
                <Label basic color="green">
                  {item}
                </Label>
              ))}
            </Label.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Header as="h5" content="About the company" />
      <p style={marginStyle}>{company_summary}</p>
      <Header as="h5" content="Contact Summary" />
      <p style={marginStyle}>{contact_summary}</p>
    </Segment>
  )
}
