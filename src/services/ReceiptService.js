import axios from 'axios'
import API from '@configs/API'

const getAll = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/receipts`, data)
}

const get = (id) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/receipts/${id}`)
}

const getDetail = (id) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/receipt/${id}`)
}

const ReceiptService = {
  getAll,
  get,
  getDetail
}

export default ReceiptService