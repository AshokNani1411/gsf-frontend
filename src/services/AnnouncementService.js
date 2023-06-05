import axios from 'axios'
import API from '@configs/API'

const getAll = () => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/announcements`)
}

const get = (id) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/announcements/${id}`)
}

const create = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/announcements/create`, data)
}

const update = (id, data) => {
  return axios.put(`${process.env.REACT_APP_API_BASE_URL}/announcements/${id}`, data)
}

const remove = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/announcements/delete`, data)
}

const AnnouncementService = {
  getAll,
  get,
  create,
  update,
  remove
}

export default AnnouncementService