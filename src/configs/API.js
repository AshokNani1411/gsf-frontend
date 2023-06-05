import axios from 'axios'

// ** Request Interceptor
axios.interceptors.request.use(
  config => {
    // ** Get token from localStorage
    const accessToken = localStorage.getItem('accessToken')
    // ** If token is present add it to request's Authorization Header
    if (accessToken) {
      // ** eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  error => Promise.reject(error)
)

axios.interceptors.response.use((res) => {
  return res.data
}, (err) => {
  return Promise.reject(err)
})

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default API