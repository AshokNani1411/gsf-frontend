import axios from 'axios'
import API from '@configs/API'

const getAll = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/pickup-requests`, data)
}

const get = (id) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/pickup-requests/${id}`)
}

const create = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/create-pickup-request`, data)
}

const remove = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/pickup-requests/delete`, data)
}

const PickupRequestService = {
  getAll,
  get,
  create,
  remove
}

export default PickupRequestService