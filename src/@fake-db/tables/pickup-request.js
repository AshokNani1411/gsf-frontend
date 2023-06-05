import mock from '../mock'

const data = [
  {
    req_no: "68",
    pickup_type: "Purchase Receipt",
    date: '03/31/2021',
    reference: 'TEST C1',
    order_no: "ENV2009SORME000199",
    status:1,
    tracking_id: 'REC2009-00000122'
  },
  {
    req_no: "69",
    pickup_type: "Purchase Receipt",
    date: '03/31/2021',
    reference: 'UAT SEP29-2',
    order_no: "",
    status:2,
    tracking_id: ''
  },
  {
    req_no: "70",
    pickup_type: "Purchase Receipt",
    date: '03/31/2021',
    reference: 'TEST C1',
    order_no: "ENV2009SORME000199",
    status:3,
    tracking_id: ''
  },
  {
    req_no: "71",
    pickup_type: "Purchase Receipt",
    date: '03/31/2021',
    reference: 'TEST C1',
    order_no: "",
    status:4,
    tracking_id: ''
  }
]

mock.onGet('/api/pickup-request/initial-data').reply(config => {
  return [200, data]
})
