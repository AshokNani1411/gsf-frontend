import axios from 'axios'
import API from '@configs/API'

const getAll = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/service-requests`, data)
}

const get = (id) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/service-requests/${id}`)
}

const create = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/create-service-request`, data)
}

const remove = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/service-requests/delete`, data)
}

const ServiceRequestService = {
  getAll,
  get,
  create,
  remove

}

export default ServiceRequestService