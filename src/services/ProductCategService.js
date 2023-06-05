import axios from 'axios'
import API from '@configs/API'

const getAllProductCategories = (site) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/productcateg?site=${site}`)
}

const ProductCategService = {
  getAllProductCategories
}

export default ProductCategService