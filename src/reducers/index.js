import { applicationListReducer } from './applications/application_list'
import { applicationReducer } from './applications/application'
import { applicationUpdateReducer } from './applications/application_update'
import { authReducer } from './auth'
import { benefitReducer } from './benefits'
import { categoryReducer } from './categories'
import { combineReducers } from 'redux'
import { jobDetailReducer } from './jobs/job_detail'
import { jobListEmployerReducer } from './jobs/job_list_employer'
import { jobListReducer } from './jobs/job_list_seeker'
import { jobReducer } from './jobs/job'
import { locationListReducer } from './location'
import { menuReducer } from './menu'
import { registerReducer } from './register'
import { skillReducer } from './skills'
import { themeReducer } from './theme'
import { profileReducer } from './profile'
import { jobStatusUpdateReducer } from './jobs/job_status_update'
import { applicationListEmployerReducer } from './applications/application_list_employer'
import { careerProfileReducer } from './career_profile'
import { newsListReducer, newsDetailReducer } from './news'
import { TOKEN_NAME } from '../constants/'

const appReducer = combineReducers({
  application_list_employer: applicationListEmployerReducer,
  application_list: applicationListReducer,
  application_update: applicationUpdateReducer,
  application: applicationReducer,
  auth: authReducer,
  benefit: benefitReducer,
  career_profile: careerProfileReducer,
  category: categoryReducer,
  job_details: jobDetailReducer,
  job: jobReducer,
  job_list_seeker: jobListReducer,
  job_list_employer: jobListEmployerReducer,
  jobUpdateStatus: jobStatusUpdateReducer,
  locationList: locationListReducer,
  menu: menuReducer,
  news_detail: newsDetailReducer,
  news_list: newsListReducer,
  profile: profileReducer,
  register: registerReducer,
  skill: skillReducer,
  theme: themeReducer,
})

export const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_SUCCESS') {
    localStorage.removeItem(TOKEN_NAME)
    state = undefined
  }
  return appReducer(state, action)
}
