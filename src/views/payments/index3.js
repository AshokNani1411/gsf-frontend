// ** React Imports
import { useEffect, useRef, useState } from 'react'

import { useDispatch, useSelector } from "react-redux"
import { retrievePayments } from "../../redux/actions/payment/index"

import Moment from 'react-moment'

import Select from 'react-select'
import { selectThemeColors } from '@utils'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import ReactPaginate from 'react-paginate'
import { ChevronDown, X } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Row, Col, Label, Card, Input, CardHeader, CardTitle, Button, Badge, Table, FormGroup } from 'reactstrap'

import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Link, useHistory } from 'react-router-dom'
import moment from 'moment'

const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <Table bordered className="child-table">
        <thead>
          <tr>
            <th>Payment Number</th>
            <th>Attribute</th>
            <th>Type</th>
            <th>Entry No</th>
            <th>Price</th>
            <th>Currency</th>
            <th className='text-right'>Amount</th>
          </tr>
        </thead>
        <tbody>
          { data.SORDERQ.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.NUM_0}</td>
                <td><strong className="text-dark">{item.DENCOD_0}</strong></td>
                <td>{item.VCRTYP_0}</td>
                <td>{item.VCRNUM_0} </td>
                <td>{item.AMTLIN_0}</td>
                <td>{item.CUR_0}</td>
                <td className='text-right'>{''}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

const PaymentComponent = () => {
  // ** State
  const history = useHistory()
  const userData = JSON.parse(localStorage.getItem('userData'))
  if (userData.XSIH_0 !== 2) {
    history.push('/customer/dashboard')
  }
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
   const [totalAmount, setTotalAmount] = useState(0)
  const [selectedStatus, setStatus] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const payments = useSelector(state => state.payments)
  const dispatch = useDispatch()
  const refComp = useRef(null)
  const refDueComp = useRef(null)

const TotalCal = data => {
      let tempTotal = 0
           for (let i = 0; i < data.length; i++) {
              console.log("Tddd invocie i=", data[i])
              tempTotal += data[i].AMTATIL_0
           }
           setTotalAmount(tempTotal)
  }


  useEffect(() => {
    if (userData) {
      dispatch(retrievePayments(userData.X3SITE_0, userData.X3USER_0))
     console.log("Tdddinsdie ")
         TotalCal(payments)


    }
  }, [])

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    if (value.length) {
      updatedData = payments && payments.filter(invoice => {
        let isMatch = false
        Object.keys(invoice).forEach(key => {
          if (invoice[key] && invoice[key] !== " " && invoice[key].toString().toLowerCase().includes(value.toLowerCase())) {
            isMatch = true
          }
        })
        return isMatch
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    }
  }

  // ** Function to handle filter
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  const status = {
    1: { title: 'Entered', color: 'light-warning' },
    2: { title: 'Accepted', color: 'light-dark' },
    3: { title: 'In draft management', color: 'light-success' },
    4: { title: 'Stage4', color: 'light-warning' },
    5: { title: 'Slip entered', color: 'light-dark' },
    6: { title: 'Slip on file', color: 'light-success' },
    7: { title: 'Paying bank entered', color: 'light-warning' },
    8: { title: 'On intermediate account', color: 'light-dark' },
    9: { title: 'In the bank', color: 'light-success' },
    10: { title: 'Stage 10', color: 'light-success' },
    11: { title: 'UnPaid', color: 'light-warning' }
  }

  const paymentStatus = {
    0: { title: 'NA', color: 'light-danger' },
    1: { title: 'To Pay', color: 'light-dark' },
    2: { title: 'Paid', color: 'light-success' },
    3: { title: 'Partly Paid', color: 'light-warning' }
  }

  const statusOptions = []
  Object.keys(paymentStatus).forEach(key => {
    statusOptions.push({value: key, label: `${paymentStatus[key].title}`})
  })

  const columns = [
    // {
    //   name: 'Site',
    //   selector: 'FCY_0',
    //   sortable: true,
    //   minWidth: '100px'
    // },

    {
      name: 'Payment Number',
      selector: 'NUM_0',
      sortable: true,
      minWidth: '220px',
      cell: row => {
        return (
          <Link to={`/customer/payment/${row.NUM_0}`}>
            {row.NUM_0}
          </Link>
        )
      }
    },
     {
      name: 'Status',
      selector: 'STA_0',
      sortable: true,
      minWidth: '100px',
      cell: row => {
        return (
           <Badge color={status[row.STA_0].color} pill>
          {status[row.STA_0].title}
          </Badge>
         )
       }
     },
    // {
    //   name: 'Customer',
    //   selector: 'BPR_0',
    //   sortable: true,
    //   minWidth: '100px'
    // },
    {
      name: 'Accounting Date',
      selector: 'ACCDAT_0',
      sortable: true,
      minWidth: '100px',
      cell: row => {
        return (
          <Moment format="MM/DD/YYYY">{row.ACCDAT_0}</Moment>
        )
      }
    },
    {
          name: 'Due Date',
          selector: 'DUDDAT_0',
          sortable: true,
          minWidth: '100px',
          cell: row => {
            return (
              <Moment format="MM/DD/YYYY">{row.DUDDAT_0}</Moment>
            )
          }
        },
    {
      name: 'Total Amount',
      selector: 'AMTCUR_0',
      sortable: true,
      minWidth: '150px'
    },
    {
      name: 'Currency',
      selector: 'CUR_0',
      sortable: true,
      minWidth: '100px'
    },
     {
          name: 'Bank',
          selector: 'BAN_0',
          sortable: true,
          minWidth: '100px'
        }

  ]

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={(searchValue.length || (fromDate && toDate) || selectedStatus || dueDate) ? filteredData.length / 10 : payments.length / 10 || 1}
      breakLabel={'...'}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName={'active'}
      pageClassName={'page-item'}
      nextLinkClassName={'page-link'}
      nextClassName={'page-item next'}
      previousClassName={'page-item prev'}
      previousLinkClassName={'page-link'}
      pageLinkClassName={'page-link'}
      breakClassName='page-item'
      breakLinkClassName='page-link'
      containerClassName={'pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1'}
    />
  )

  const onDateChange = (date, type) => {
    if (type === 'from') {
      setFromDate(date[0])
      if (toDate) {
        let updatedData = []
        const startDate = moment(date[0]).format('YYYY-MM-DD')
        const endDate = moment(toDate).format('YYYY-MM-DD')
        updatedData = payments && payments.filter(item => moment(moment(item.ACCDAT_0).format('YYYY-MM-DD')).isBetween(startDate, endDate, undefined, '[]'))

        setFilteredData(updatedData)
        TotalCal(updatedData)
      }
    } else {
      setToDate(date[0])
      if (fromDate) {
        let updatedData = []
        const startDate = moment(fromDate).format('YYYY-MM-DD')
        const endDate = moment(date[0]).format('YYYY-MM-DD')
        updatedData = payments && payments.filter(item => moment(moment(item.ACCDAT_0).format('YYYY-MM-DD')).isBetween(startDate, endDate, undefined, '[]'))
        setFilteredData(updatedData)
        TotalCal(updatedData)
      }
    }
  }

  const onDueDateChange = date => {
    setDueDate(date)
    let updatedData = []
    updatedData = payments && payments.filter(item => moment(moment(item.STRDUDDAT_0).format('YYYY-MM-DD')).isSame(moment(date[0]).format('YYYY-MM-DD')))
    setFilteredData(updatedData)
  }

  const onStatusChange = event => {
    if (event && event.value) {
      setStatus(event.value)
      let updatedData = []
      updatedData = payments && payments.filter(item => Number(item.Status) === Number(event.value))
      setFilteredData(updatedData)
    } else {
      setStatus('')
      setFilteredData(payments)
    }
  }

  const clearDate = () => {
    refComp.current.flatpickr.clear()
    setFromDate('')
    setToDate('')
    setFilteredData(payments)
    TotalCal(payments)
  }

  const clearDueDate = () => {
    refDueComp.current.flatpickr.clear()
    setDueDate('')
    setFilteredData(payments)
  }
console.log("payments =", payments)
  return (
    <div className="w-100">
      <Row>
        <Col sm='12'>
          <Card>
            <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
              <CardTitle tag='h4'>Payments</CardTitle>
              {/* <Button.Ripple color='primary' tag={Link} to='/payments/create'>
                  Add New Invoice Request
              </Button.Ripple> */}
            </CardHeader>
            <Row className='justify-content-between mx-0'>
              <Col md='4' lg='2' className='mt-1'>
                <FormGroup>
                  <Input
                    className='dataTable-filter mb-50'
                    type='text'
                    placeholder='Search'
                    id='search-input'
                    value={searchValue}
                    onChange={handleFilter}
                  />
                </FormGroup>

              </Col>
              <Col md='4' lg='4' className='mt-1 d-flex'>
                <Flatpickr
                  value={fromDate}
                  id='fromDate'
                  className='form-control mb-50 mr-1'
                  placeholder='From Date'
                  onChange={date => onDateChange(date, 'from')}
                  ref={refComp}
                  options={{
                    dateFormat: 'm-d-Y',
                    maxDate: toDate ? toDate : new Date()
                  }}
                />
                <Flatpickr
                  value={toDate}
                  id='toDate'
                  className='form-control mb-50 mr-1'
                  placeholder='To Date'
                  onChange={date => onDateChange(date, 'to')}
                  ref={refComp}
                  options={{
                    dateFormat: 'm-d-Y',
                    minDate: fromDate,
                    maxDate: new Date()
                  }}
                />
                { (fromDate || toDate) ? <div>
                  <Button.Ripple className='btn-icon mb-50' color='flat-danger' onClick={() => clearDate()}>
                    <X size={16} />
                  </Button.Ripple>
                </div> : ''}
              </Col>
            </Row>
            <DataTable
              noHeader
              data={(searchValue.length || fromDate || toDate || selectedStatus || dueDate) ? filteredData : payments}

              columns={columns}
              className='react-dataTable'
              sortIcon={<ChevronDown size={10} />}
              expandableRowsComponent={<ExpandableTable />}
            />
             <hr />
             <Row style={{justifyContent : "flex-end"}}>
              <Col md='4' lg='4' className='mt-1 d-flex'>
                        <h6 style={{paddingLeft : "100px"}}  className='mb-0'>Total Amount to PAY : <b> $ {totalAmount} </b></h6>
                </Col>
                  <Col md='2' lg='2' className='mt-1 d-flex'>
                      <Button type='submit' outline tag={Link} to='/customer/payment/pay' style={{marginBottom : "20px"}}  color='primary'>
                                                                         Proceed to Pay
                                                                       </Button>
                           </Col>
                        </Row>
              <Row className='justify-content-between mx-0'>
              </Row>
          </Card>
        </Col>
        </Row>
            </div>
  )
}

export default PaymentComponent