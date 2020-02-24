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
import { resetPasswordEmailReducer } from './reset_password_email'
import { jobStatusUpdateReducer } from './jobs/job_status_update'
import { applicationListEmployerReducer } from './applications/application_list_employer'
import {
  careerProfileReducer,
  careerProfileEmployerReducer,
} from './career_profile'
import { newsListReducer, newsDetailReducer } from './news'
import { TOKEN_NAME } from '../app_constants'
import { accountActivationReducer } from './account_activation'
import { passwordResetReducer } from './reset_password_request'
import { feedbackReducer } from './feedback'
const appReducer = combineReducers({
  account_activation: accountActivationReducer,
  application_list_employer: applicationListEmployerReducer,
  application_list: applicationListReducer,
  application_update: applicationUpdateReducer,
  application: applicationReducer,
  auth: authReducer,
  benefit: benefitReducer,
  feedback: feedbackReducer,
  career_profile_employer: careerProfileEmployerReducer,
  career_profile: careerProfileReducer,
  category: categoryReducer,
  job_details: jobDetailReducer,
  job_list_employer: jobListEmployerReducer,
  job_list_seeker: jobListReducer,
  job: jobReducer,
  jobUpdateStatus: jobStatusUpdateReducer,
  locationList: locationListReducer,
  menu: menuReducer,
  news_detail: newsDetailReducer,
  news_list: newsListReducer,
  profile: profileReducer,
  register: registerReducer,
  reset_password_email: resetPasswordEmailReducer,
  reset_password_request: passwordResetReducer,
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
