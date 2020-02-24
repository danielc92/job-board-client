import axios from 'axios'
import { API_BASE_URL } from '../app_constants'

// Documentation here https://github.com/axios/axios

export default axios.create({
  baseURL: API_BASE_URL,
})
