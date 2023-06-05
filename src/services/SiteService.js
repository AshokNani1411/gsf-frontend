import axios from 'axios'
import API from '@configs/API'

const getAll = () => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/sites`)
}

const getById = (ID) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/sites/${ID}`)
}

const SiteService = {
  getAll,
  getById
}

export default SiteService