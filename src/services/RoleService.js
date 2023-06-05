import axios from 'axios'
import API from '@configs/API'

const getAll = () => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/roles`)
}

const RoleService = {
  getAll
}

export default RoleService