import axios from 'axios'
import API from '@configs/API'

const getAllAddresses = (id, type) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/addresses?id=${id}&type=${type}`)
}

const getAllCarriers = () => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/carriers`)
}

const getAllDeliveryModes = () => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/deliverymodes`)
}

const CommonDataService = {
  getAllAddresses,
  getAllCarriers,
  getAllDeliveryModes
}

export default CommonDataService