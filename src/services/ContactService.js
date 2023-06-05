import axios from 'axios'
import API from '@configs/API'

const getAll = () => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/contacts`)
}

const get = (id, cust) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/contact/${id}?customer=${cust}`)
}

const create = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/createeditcontact`, data)
}

const update = (id, data) => {
  return axios.put(`${process.env.REACT_APP_API_BASE_URL}/contact/${id}`, data)
}

const remove = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/contact/delete`, data)
}

const ContactService = {
  getAll,
  get,
  create,
  update,
  remove
}

export default ContactService