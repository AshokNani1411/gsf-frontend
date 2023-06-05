import axios from 'axios'
import API from '@configs/API'

const getAll = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/orders`, data)
}

const getAllPurchaseOrders = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/purchase-orders`, data)
}

const getSalesOrderDetail = (id) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/order/${id}`)
}

const getPurchaseOrderDetail = (id) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/purchase-order/${id}`)
}

const OrderService = {
  getAll,
  getAllPurchaseOrders,
  getSalesOrderDetail,
  getPurchaseOrderDetail
}

export default OrderService