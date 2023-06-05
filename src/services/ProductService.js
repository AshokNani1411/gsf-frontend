import axios from 'axios'
import API from '@configs/API'

const getAll = (site) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/products?site=${site}`)
}

const ProductService = {
  getAll
}

export default ProductService