import axios from 'axios'
import API from '@configs/API'

const getAllInstallBase = (site) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/installbase?site=${site}`)
}

const InstallBaseService = {
  getAllInstallBase
}

export default InstallBaseService