import axios from "axios";

// Documentation here https://github.com/axios/axios

export default axios.create({
    baseURL: 'http://localhost:3001/'
})