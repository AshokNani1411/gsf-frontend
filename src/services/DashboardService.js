import axios from 'axios'
import API from '@configs/API'

const getDashboardData = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/getdashboarddata`, data)
}

const getSupplierDashboardData = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/getsupplierdashboarddata`, data)
}

const DashboardService = {
  getDashboardData,
  getSupplierDashboardData
}

export default DashboardService