import axios from 'axios'
import API from '@configs/API'

const getAll = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/customer-creditnote`, data)
}

const get = (id) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/customer-creditnote/${id}`)
}

const CreditNoteService = {
  getAll,
  get
}

export default CreditNoteService