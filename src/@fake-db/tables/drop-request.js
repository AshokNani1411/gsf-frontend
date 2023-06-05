import mock from '../mock'

const data = [
  {
    drop_req_id: "68",
    drop_type: "Sales Delivery",
    date: '03/31/2021',
    reference: 'SURE 21-Sep',
    order_no: "",
    status:1,
    tracking_id: ''
  },
  {
    drop_req_id: "69",
    drop_type: "Sales Delivery",
    date: '03/31/2021',
    reference: 'SURE 21-Sep',
    order_no: "",
    status:1,
    tracking_id: ''
  },
  {
    drop_req_id: "70",
    drop_type: "Sales Delivery",
    date: '03/31/2021',
    reference: 'SURE 21-Sep',
    order_no: "",
    status:1,
    tracking_id: ''
  }
]

mock.onGet('/api/drop-request/initial-data').reply(config => {
  return [200, data]
})
