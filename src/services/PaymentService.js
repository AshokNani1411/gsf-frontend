import axios from 'axios'
import API from '@configs/API'

const getAll = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/payments`, data)
}


const getPaymentDetail = (id) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/payment/${id}`)
}

const getInvoicesforPayments = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/payment/invoices`, data)
}


const PaymentService = {
  getAll,
  getPaymentDetail,
  getInvoicesforPayments

}

export default PaymentService