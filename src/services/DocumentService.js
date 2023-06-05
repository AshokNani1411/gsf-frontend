import axios from 'axios'
import API from '@configs/API'

const getAll = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/documents`, data)
}

const get = (id) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/documents/${id}`)
}

const create = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/documents/create`, data)
}

const update = (id, data) => {
  return axios.put(`${process.env.REACT_APP_API_BASE_URL}/documents/${id}`, data)
}

const remove = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/documents/delete`, data)
}

const DocumentService = {
  getAll,
  get,
  create,
  update,
  remove
}

export default DocumentService