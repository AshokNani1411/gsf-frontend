import axios from 'axios'
import API from '@configs/API'

const getAll = () => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/discussionforums`)
}

const get = (id) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/discussionforums/${id}`)
}

const create = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/discussionforums/create`, data)
}

const update = (id, data) => {
  return axios.put(`${process.env.REACT_APP_API_BASE_URL}/discussionforums/${id}`, data)
}

const remove = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/discussionforums/delete`, data)
}

const sendMessage = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/discussionforums/add-message`, data)
}

const AnnouncementService = {
  getAll,
  get,
  create,
  update,
  remove,
  sendMessage
}

export default AnnouncementService