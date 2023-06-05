// ** React Imports
import { useEffect, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { retrievePayments } from "../../redux/actions/payment/index"
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import Moment from 'react-moment'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import ReactPaginate from 'react-paginate'
import { ChevronDown, X} from 'react-feather'
import DataTable from 'react-data-table-component'
import { Row, Col, Label, Table, Badge, Card, Input, CardHeader, CardTitle, Button, FormGroup } from 'reactstrap'
import moment from 'moment'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <Table bordered className="child-table">
        <thead>
          <tr>
            <th>Payment Number</th>
            <th>Attribiute</th>
            <th>Type</th>
            <th> Entry No</th>
            <th>Currency</th>
            <th className='text-right'>Amount</th>
          </tr>
        </thead>
        <tbody>
          { data.SORDERQ.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.NUM_0}</td>
                <td>{item.DENCOD_0}</td>
                <td>{item.VCRTYP_0}</td>
                <td>{item.VCRNUM_0}</td>
                <td>{item.CURLIN_0}</td>
                <td className='text-right'>{item.AMTLIN_0}</td>
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
  if (userData.XSOH_0 !== 2) {
    history.push('/customer/dashboard')
  }
  console.log("T11 isnide order Component")
  const [fromDate, setFromDate] = useState('')
   const [fromOneDayAfterDate, setOneDayAfterFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
 const payments = useSelector(state => state.payments)
    const deliveryModes = useSelector(state => state.deliveryModes)
  const dispatch = useDispatch()
  const refComp = useRef(null)

  useEffect(() => {
    if (userData) {
      dispatch(retrievePayments(userData.X3SITE_0, userData.X3USER_0))

    }
  }, [])

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    if (value.length) {
      updatedData = payments && payments.filter(order => {
        let isMatch = false
        Object.keys(order).forEach(key => {
          if (order[key] && order[key] !== " " && order[key].toString().toLowerCase().includes(value.toLowerCase())) {
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

  const dlvStatus = {
    1: { title: 'NOT DELIVERED', color: 'light-danger' },
    2: { title: 'PARTLY', color: 'light-warning' },
    3: { title: 'DELIVERED', color: 'light-success' }
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

  const invStatus = {
    1: { title: 'NOT INVOICED', color: 'light-danger' },
    2: { title: 'PARTLY', color: 'light-warning' },
    3: { title: 'INVOICED', color: 'light-success' }
  }

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
      minWidth: '150px',
      cell: row => {
                         return (row.AMTCUR_0 && row.AMTCUR_0 !== " ") ? `${row.AMTCUR_0} ${row.CUR_0}` : ''
                        }
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
      pageCount={(searchValue.length || fromDate || toDate) ? filteredData.length / 10 : payments.length / 10 || 1}
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
      console.log("T11 insde from -", date)
      console.log("T11 to date =", toDate)
      setFromDate(date[0])

      if (toDate) {
        let updatedData = []
        const startDate = moment(date[0]).format('YYYY-MM-DD')
        const endDate = moment(toDate).format('YYYY-MM-DD')
        updatedData = payments && payments.filter(item => moment(moment(item.ACCDAT_0).format('YYYY-MM-DD')).isBetween(startDate, endDate, undefined, '[]'))
        setFilteredData(updatedData)
      } else {
          let updatedData = []
          const startDate = moment(date[0]).format('YYYY-MM-DD')
            console.log("T11 to before =", updatedData)
          updatedData = payments && payments.filter(item => moment(moment(item.ACCDAT_0).format('YYYY-MM-DD')).isSameOrAfter(startDate))
            console.log("T11 to after =", updatedData)
          setFilteredData(updatedData)

      }
    //  setOneDayAfterFromDate(date[0].setDate(date[0].getDate() + 1))
    } else {
      setToDate(date[0])
      if (fromDate) {
        let updatedData = []
        const startDate = moment(fromDate).format('YYYY-MM-DD')
        const endDate = moment(date[0]).format('YYYY-MM-DD')
        updatedData = payments && payments.filter(item => moment(moment(item.ACCDAT_0).format('YYYY-MM-DD')).isBetween(startDate, endDate, undefined, '[]'))
        setFilteredData(updatedData)
      } else {
           let updatedData = []
           const endDate = moment(date[0]).format('YYYY-MM-DD')
           updatedData = payments && payments.filter(item => moment(moment(item.ACCDAT_0).format('YYYY-MM-DD')).isSameOrBefore(endDate))
                   setFilteredData(updatedData)

      }
    }
  }


  const clearDate = () => {
    refComp.current.flatpickr.clear()
    setFromDate('')
    setToDate('')
    setOneDayAfterFromDate('')
    setFilteredData(payments)
  }

  return (
    <div className="w-100">
      <Row>
        <Col sm='12'>
          <Card>
            <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
              <CardTitle tag='h4'>Payments</CardTitle>
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
              pagination
              data={(searchValue.length || fromDate || toDate) ? filteredData : payments}
              expandableRows
              columns={columns}
              paginationPerPage={10}
              expandOnRowClicked
              className='react-dataTable'
              sortIcon={<ChevronDown size={10} />}
              paginationDefaultPage={currentPage + 1}
              expandableRowsComponent={<ExpandableTable />}
              paginationRowsPerPageOptions={[10, 25, 50, 100]}
              paginationComponent={CustomPagination}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default PaymentComponent
