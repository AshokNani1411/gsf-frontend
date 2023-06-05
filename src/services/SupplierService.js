import axios from 'axios'
import API from '@configs/API'

const getAll = () => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/suppliers`)
}

const getConCode = (id) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/supplier-concode?id=${id}`)
}

const SupplierService = {
  getAll,
  getConCode
}

export default SupplierService