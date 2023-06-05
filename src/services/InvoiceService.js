import axios from 'axios'
import API from '@configs/API'

const getAll = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/customer-invoices`, data)
}

const get = (id) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/customer-invoice/${id}`)
}

const InvoiceService = {
  getAll,
  get
}

export default InvoiceService