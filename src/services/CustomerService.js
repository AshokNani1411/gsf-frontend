import axios from 'axios'
import API from '@configs/API'

const getAll = () => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/customers`)
}

const getConCode = (id) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/customer-concode?id=${id}`)
}

const CustomerService = {
  getAll,
  getConCode
}

export default CustomerService