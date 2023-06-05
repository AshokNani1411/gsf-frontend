import axios from 'axios'
import API from '@configs/API'

const getAllProductConsumptions = (site) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/consumption?site=${site}`)
}

const ProductConsumptionService = {
  getAllProductConsumptions
}

export default ProductConsumptionService