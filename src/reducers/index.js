import { applicationListReducer } from './applications/application_list';
import { applicationReducer } from './applications/application';
import { applicationUpdateReducer } from './applications/application_update';
import { authReducer } from './auth';
import { benefitReducer } from './benefits';
import { categoryReducer } from './categories';
import { combineReducers } from 'redux';
import { jobDetailReducer } from './jobs/job_detail';
import { jobListEmployerReducer } from './jobs/job_list_employer';
import { jobListReducer } from './jobs/joblist';
import { jobReducer } from './jobs/job';
import { locationListReducer } from './location';
import { menuReducer } from './menu';
import { registerReducer } from './register';
import { skillReducer } from './skills';
import { themeReducer } from './theme';
import { userDetailsReducer } from './user_details';



export const rootReducer = combineReducers({
    application_list: applicationListReducer,
    application_update: applicationUpdateReducer,
    application: applicationReducer,
    auth: authReducer,
    benefit: benefitReducer,
    category: categoryReducer,
    job: jobReducer,
    jobDetails: jobDetailReducer,
    jobList: jobListReducer,
    jobListEmployer: jobListEmployerReducer,
    locationList: locationListReducer,
    menu: menuReducer,
    register: registerReducer,
    skill: skillReducer,
    theme: themeReducer,
    user_details: userDetailsReducer,
})

