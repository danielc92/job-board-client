import React, { Component } from 'react';
import { Segment, Container, Search, Header, Form, Message, Icon, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setMenuItem } from '../../actions/menu';
import { getSkills } from '../../actions/skills';
import { getBenefits } from '../../actions/benefit';
import { getCategories } from '../../actions/category';
import { getLocationList } from '../../actions/location';
import { createJob } from '../../actions/job'; 
import { checkTokenIsValid } from '../../helpers/auth';
import { TOKEN_NAME } from '../../constants';
import { logoutUser } from '../../actions/auth';
import { 
    StringValidator,
    IsEmptyValidator,
    SalaryRangeValidator, 
    ListValidator} from '../../helpers/validation';

class ReactJobPostContainer extends Component {

    //Internal state holds information pertaining to the form
    state = {
        title: "",
        category: "",
        skills: [],
        benefits: [],
        company_summary: "",
        job_summary: "",
        contact_summary: "",
        salary_range_low: "",
        salary_range_high: "",
        errors: [],
        searchLoading: false,
        searchResults: [],
        searchSelection: null,
    }

    customRender = (label) => ({
        color: 'green',
        content: label.text,
      })

    validateForm = () => {
        const { title, category, skills, benefits, 
        company_summary, job_summary, contact_summary, 
        salary_range_high, salary_range_low} = this.state;

        let companyErrors = StringValidator(company_summary, 0, 500, 'Company summary')
        let jobErrors = StringValidator(job_summary, 0, 500, 'Job summary')
        let contactErrors = StringValidator(contact_summary, 0, 500, 'Contact information')
        let skillErrors = ListValidator(skills, 1, 'Skills')
        let benefitErrors = ListValidator(benefits, 1, 'Benefits')
        let titleErrors = StringValidator(title, 1, 50, 'Job title')
        let categoryErrors = IsEmptyValidator(category, 'Job category')
        let salaryLowErrors = IsEmptyValidator(salary_range_low, 'Salary (minimum)')
        let salaryHighErrors = IsEmptyValidator(salary_range_high, 'Salary (maximum)')
        let salaryRangeErorrs = SalaryRangeValidator(salary_range_low, salary_range_high)
        
        let errors = [
            ...companyErrors,
            ...jobErrors,
            ...contactErrors,
            ...skillErrors,
            ...benefitErrors,
            ...titleErrors,
            ...categoryErrors,
            ...salaryLowErrors,
            ...salaryHighErrors,
            ...salaryRangeErorrs
        ]
        
        this.setState({ errors })
    }

    handleInputChange = (event) => {
        const { name, value } = event.target; 
        this.setState({ [name] : value }, () => this.validateForm())
    }

    handleDropdownChange = (event, data) => {
        const { name, value } = data;
        this.setState({ [name] : value }, () => this.validateForm())
    }

    handleSearchChange = (even, {value}) => {
        this.setState({ searchLoading: true}, ()=> {
            console.log('SET FLAG')
            let searchResults = [];
            this.props.propsGetLocations(value)
            searchResults = this.props.location.data.map(item => {
                return {...item, title: item.location_string}
            })
            this.setState({searchResults}, ()=>{
                console.log('RESET FLAG')
                this.setState({ searchLoading: false})
            })
        })
        
       
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { errors } = this.state;
        // Initial check to see if token has expired
        const token = localStorage.getItem(TOKEN_NAME)
        if (!checkTokenIsValid(token)) {
            this.props.propsLogoutUser()
            this.props.history.push({
                pathname: "/login",
                state: { redirect_message: 'You need to be logged in to post a job.' }
            })
        }

        // Check if there are errors present, before dispatching
        if (errors.length === 0) {
            const { 
                title, 
                category, 
                skills, 
                benefits, 
                company_summary, 
                job_summary, 
                contact_summary, 
                salary_range_high, 
                salary_range_low } = this.state;

            const payload = { 
                title, 
                category, 
                skills, 
                benefits, 
                company_summary, 
                job_summary, 
                contact_summary, 
                salary_range_high, 
                salary_range_low,
                creator_id: this.props.auth.user._id }

            this.props.propsCreateJob(payload)
        }
    }

    componentDidMount () {
        this.validateForm()
        this.props.propsSetMenuItem('create')
        this.props.propsGetSkills()
        this.props.propsGetCategories()
        this.props.propsGetBenefits()
        this.props.propsGetLocations()
        
    }
    
    render() {
        const { 
            errors, 
            searchLoading,
            searchResults } = this.state;
        const  { 
            auth,
            benefit,
            category,
            job,
            location,
            skill } = this.props;

        return (
            <Container>
                <Segment style={{ padding: '7rem 0', border: 'none', boxShadow: 'none', margin: 'none'}}>
                    <Header as="h1">Post a job</Header>
                    <Divider></Divider>
                    
                    {
                        auth.isAuthenticated ?
                        (
                            <React.Fragment>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group widths={"equal"}>
                                    <Form.Input
                                        onChange={this.handleInputChange}
                                        name="title"
                                        placeholder="Zoo keeper"
                                        label="Job Title"/>
                                    <Form.Dropdown 
                                        onChange={this.handleDropdownChange}
                                        name="skills"
                                        label="Skills"
                                        placeholder='Add skills'
                                        multiple
                                        search
                                        selection
                                        options={skill.data}
                                        renderLabel={this.customRender}
                                        ></Form.Dropdown>

                                    <Form.Dropdown 
                                    onChange={this.handleDropdownChange}
                                    name="benefits"
                                    label="Benefits"
                                    placeholder='Add benefits'
                                    multiple
                                    search
                                    selection
                                    options={benefit.data}
                                    renderLabel={this.customRender}
                                    ></Form.Dropdown>
                                
                                </Form.Group>

                                <Form.Group widths="equal">
                                    <Form.Dropdown
                                        onChange={this.handleDropdownChange}
                                        name="category"
                                        label="Category"
                                        placeholder="Select category"
                                        fluid
                                        selection
                                        search
                                        options={category.data}
                                    />
                                    <Form.Input 
                                    onChange={this.handleInputChange}
                                    name="salary_range_low"
                                    type="number"
                                    label="Minimum salary ($)"/>

                                    <Form.Input 
                                    onChange={this.handleInputChange}
                                    name="salary_range_high"
                                    type="number"
                                    label="Maximum salary ($)"/>
                                </Form.Group>
                                
                                <Form.Group width="half">
                                    <div className="field">
                                    <label>Location</label>
                                    <Search
                                        fluid
                                        loading={searchLoading}
                                        results={searchResults}
                                        onSearchChange={this.handleSearchChange}
                                        placeholder="Search location..."/>
                                    </div>
                                </Form.Group>

                                <Form.TextArea
                                        width={12}
                                        onChange={this.handleInputChange}
                                        name="company_summary"
                                        maxlength="500"
                                        placeholder="A short description about the company"
                                        label="About the company"/>
                                

                                <Form.TextArea 
                                    width={12}
                                    onChange={this.handleInputChange}
                                    name="job_summary"
                                    maxlength="500"
                                    placeholder="A short description about the job"
                                    label="About the job"/>

                                <Form.TextArea
                                    width={12}
                                    onChange={this.handleInputChange}
                                    name="contact_summary"
                                    maxlength="500"
                                    placeholder="Enter any contact details..."
                                    label="Contact details"/>           
                                
                                <Form.Button 
                                size="big"
                                color="green">
                                    <Icon name="add square"></Icon>Create job
                                </Form.Button>

                                <Message
                                    error
                                    visible={job.error}
                                    header="Error"
                                    content="An error has occured, job posting failed">
                                </Message>

                                <Message
                                    success
                                    visible={Object.entries(job.data).length > 0}
                                    header="Success"
                                    content="Your job has been posted.">
                                </Message>
                            </Form>
                            {
                                errors.length === 0 ? 
                                (
                                    <Message
                                    success
                                    header="Validation successful"
                                    content="You may proceed to post this job."></Message>
                                )
                                :
                                (
                                    <Message
                                    info
                                    list={errors}
                                    header="Form requirements"/>
                                )
                            }
                            
                            </React.Fragment>
                        )
                        :
                        (
                            <Message 
                            warning
                            header="Authentication required"
                            content="We know you would love to get your job posted on our platform. However, you must be logged in to do so."
                            >
                            </Message>
                        )
                    }
                </Segment>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        benefit: state.benefit,
        category: state.category,
        job: state.job,
        skill: state.skill,
        location: state.locationList,
    }
}

const mapDispatchToProps = {
    propsSetMenuItem: setMenuItem,
    propsGetSkills: getSkills,
    propsGetBenefits: getBenefits,
    propsGetCategories: getCategories,
    propsCreateJob: createJob,
    propsLogoutUser: logoutUser,
    propsGetLocations: getLocationList,
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactJobPostContainer)