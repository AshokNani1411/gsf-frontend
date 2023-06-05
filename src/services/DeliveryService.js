import axios from 'axios'
import API from '@configs/API'

const getAll = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/deliveries`, data)
}

const get = (id) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/deliveries/${id}`)
}

const getDetail = (id) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/delivery/${id}`)
}

const DeliveryService = {
  getAll,
  get,
  getDetail
}

export default DeliveryService