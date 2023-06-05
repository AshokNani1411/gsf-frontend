import mock from '../mock'

const data = [
  {
    user_id: "1",
    name: "TMS Admin",
    email: 'admin@demo.com',
    password: 'admin',
    role: 1
  },
  {
    user_id: "2",
    name: "Ravi Gaudani",
    email: 'customer@demo.com',
    password: 'customer',
    role: 2
  },
  {
    user_id: "3",
    name: "Suresh Vadlamni",
    email: 'supplier@demo.com',
    password: 'supplier',
    role: 3
  }
]

mock.onGet('/api/users/initial-data').reply(config => {
  return [200, data]
})
