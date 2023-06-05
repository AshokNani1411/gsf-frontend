import axios from 'axios'
import API from '@configs/API'

const getAll = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/returns`, data)
}


const getSalesReturnDetail = (id) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/return/${id}`)
}


const ReturnService = {
  getAll,
  getSalesReturnDetail

}

export default ReturnService