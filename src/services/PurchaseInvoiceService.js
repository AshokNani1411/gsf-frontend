import axios from 'axios'
import API from '@configs/API'

const getAll = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/supplier-invoices`, data)
}

const get = (id) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/supplier-invoice/${id}`)
}

const PurchaseInvoiceService = {
  getAll,
  get
}

export default PurchaseInvoiceService