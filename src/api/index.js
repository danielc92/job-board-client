import axios from 'axios'

// Documentation here https://github.com/axios/axios

export default axios.create({
  baseURL: process.env.REACT_APP_REST_API_BASE_URL,
})
