import axios from 'axios'
import API from '@configs/API'

const getAll = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/calendar/getall`, data)
}

const CalendarService = {
  getAll
}

export default CalendarService