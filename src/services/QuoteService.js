import axios from 'axios'
import API from '@configs/API'

const getAll = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/quotes`, data)
}

const getQuoteDetail = (id) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/quote/${id}`)
}

const QuoteService = {
  getAll,
  getQuoteDetail
}

export default QuoteService