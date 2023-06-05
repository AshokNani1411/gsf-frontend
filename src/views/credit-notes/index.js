// ** React Imports
import { useEffect, useRef, useState } from 'react'

import { useDispatch, useSelector } from "react-redux"
import { retriveCreditNotes } from "../../redux/actions/credit-note/index"

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
            <th>Delivery Number</th>
            <th>Product Code</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Currency</th>
            <th className='text-right'>Amount</th>
          </tr>
        </thead>
        <tbody>
          { data.SORDERQ.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.SDHNUM_0}</td>
                <td><strong className="text-dark">{item.ITMREF_0}</strong></td>
                <td>{item.ITMDES_0}</td>
                <td>{item.QTY_0} {item.SAU_0}</td>
                <td>{item.GROPRI_0}</td>
                <td>{item.CUR_0}</td>
                <td className='text-right'>{item.AMTATILIN_0}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

const CreditNoteComponent = () => {
  // ** State
  const history = useHistory()
  const userData = JSON.parse(localStorage.getItem('userData'))
  if (userData.XSIH_0 !== 2) {
    history.push('/customer/dashboard')
  }
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [selectedStatus, setStatus] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const creditNotes = useSelector(state => state.creditNotes)
  const dispatch = useDispatch()
  const refComp = useRef(null)
  const refDueComp = useRef(null)
  
  useEffect(() => {
    if (userData) {
      dispatch(retriveCreditNotes(userData.X3SITE_0, userData.X3USER_0))
    }
  }, [])

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    if (value.length) {
      updatedData = creditNotes && creditNotes.filter(invoice => {
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
    1: { title: 'Not Posted', color: 'light-warning' },
    2: { title: 'Not Used', color: 'light-dark' },
    3: { title: 'Posted', color: 'light-success' }
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
      name: 'Invoice Type',
      selector: 'SIVTYP_0',
      sortable: true,
      minWidth: '150px',
      cell: row => {
        return `${row.SIVTYP_0} (${row.INTRMDES_0})`
      }
    },
    {
      name: 'Invoice Number',
      selector: 'NUM_0',
      sortable: true,
      minWidth: '220px',
      cell: row => {
        return (
          <Link to={`/customer/creditnote/${row.NUM_0}`}>
            {row.NUM_0}
          </Link>
        )
      }
    },
    {
      name: 'Invoice Comments',
      selector: 'DES_0',
      sortable: true,
      minWidth: '160px'
    },
    {
      name: 'Payment Status',
      selector: 'Status',
      sortable: true,
      minWidth: '100px',
      cell: row => {
        return (
          <Badge color={paymentStatus[row.Status].color} pill>
            {paymentStatus[row.Status].title}
          </Badge>
        )
      }
    },
    // {
    //   name: 'Status',
    //   selector: 'STA_0',
    //   sortable: true,
    //   minWidth: '100px',
    //   cell: row => {
    //     return (
    //       <Badge color={status[row.STA_0].color} pill>
    //         {status[row.STA_0].title}
    //       </Badge>
    //     )
    //   }
    // },
    // {
    //   name: 'Customer',
    //   selector: 'BPR_0',
    //   sortable: true,
    //   minWidth: '100px'
    // },
    {
      name: 'Invoice date',
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
      name: 'Due date',
      selector: 'STRDUDDAT_0',
      sortable: true,
      minWidth: '100px',
      cell: row => {
        return (
          <Moment format="MM/DD/YYYY">{row.STRDUDDAT_0}</Moment>
        )
      }
    },
    {
      name: 'Amount (Inc Tax)',
      selector: 'AMTATIL_0',
      sortable: true,
      minWidth: '150px'
    },
    {
      name: 'Tax Amount',
      selector: 'AMTTAX_0',
      sortable: true,
      minWidth: '100px'
    },
    {
      name: 'Currency',
      selector: 'CUR_0',
      sortable: true,
      minWidth: '100px'
    },
    {
      name: 'Source document',
      selector: 'SIHORINUM_0',
      sortable: true,
      minWidth: '230px'
    },
    {
      name: 'Payment Term',
      selector: 'PTE_0',
      sortable: true,
      minWidth: '280px',
      cell: row => {
        return (row.PTE_0 && row.PTE_0 !== " ") ? `${row.PTE_0} (${row.PTRMDES_0})` : ''
      }
    }
  ]

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={(searchValue.length || (fromDate && toDate) || selectedStatus || dueDate) ? filteredData.length / 10 : creditNotes.length / 10 || 1}
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
        updatedData = creditNotes && creditNotes.filter(item => moment(moment(item.ACCDAT_0).format('YYYY-MM-DD')).isBetween(startDate, endDate, undefined, '[]'))
        setFilteredData(updatedData)
      } else {

            let updatedData = []
                             const startDate = moment(date[0]).format('YYYY-MM-DD')
                               console.log("T11 to before =", updatedData)
                                 console.log("T11 start DAte =", startDate)
                             updatedData = creditNotes && creditNotes.filter(item => moment(moment(item.ACCDAT_0).format('YYYY-MM-DD')).isSameOrAfter(startDate))
                               console.log("T11 to after =", updatedData)
                             setFilteredData(updatedData)

      }
    } else {
      setToDate(date[0])
      if (fromDate) {
        let updatedData = []
        const startDate = moment(fromDate).format('YYYY-MM-DD')
        const endDate = moment(date[0]).format('YYYY-MM-DD')
        updatedData = creditNotes && creditNotes.filter(item => moment(moment(item.ACCDAT_0).format('YYYY-MM-DD')).isBetween(startDate, endDate, undefined, '[]'))
        setFilteredData(updatedData)
      } else {
            let updatedData = []
                           const endDate = moment(date[0]).format('YYYY-MM-DD')
                           updatedData = creditNotes && creditNotes.filter(item => moment(moment(item.ACCDAT_0).format('YYYY-MM-DD')).isSameOrBefore(endDate))
                                   setFilteredData(updatedData)

      }
    }
  }
  
  const onDueDateChange = date => {
    setDueDate(date)
    let updatedData = []
    updatedData = creditNotes && creditNotes.filter(item => moment(moment(item.STRDUDDAT_0).format('YYYY-MM-DD')).isSame(moment(date[0]).format('YYYY-MM-DD')))
    setFilteredData(updatedData)
  }

  const onStatusChange = event => {
    if (event && event.value) {
      setStatus(event.value)
      let updatedData = []
      updatedData = creditNotes && creditNotes.filter(item => Number(item.Status) === Number(event.value))
      setFilteredData(updatedData)
    } else {
      setStatus('')
      setFilteredData(creditNotes)
    }
  }

  const clearDate = () => {
    refComp.current.flatpickr.clear()
    setFromDate('')
    setToDate('')
    setFilteredData(creditNotes)
  }
  
  const clearDueDate = () => {
    refDueComp.current.flatpickr.clear()
    setDueDate('')
    setFilteredData(creditNotes)
  }
  
  return (
    <div className="w-100">
      <Row>
        <Col sm='12'>
          <Card>
            <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
              <CardTitle tag='h4'>Credit Notes</CardTitle>
              {/* <Button.Ripple color='primary' tag={Link} to='/invoices/create'>
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
              <Col md='4' lg='3' className='mt-1'>
                <FormGroup>
                  <Select
                    id='status'
                    theme={selectThemeColors}
                    classNamePrefix='select'
                    placeholder='Payment Status'
                    options={statusOptions}
                    isClearable
                    value={statusOptions.filter((d) => d.value === selectedStatus)}
                    onChange={onStatusChange}
                  />
                </FormGroup>
              </Col>
              <Col md='4' lg='3' className='mt-1 d-flex'>
                <Flatpickr
                  value={dueDate}
                  id='picker'
                  placeholder='Due Date'
                  className='form-control mb-50 mr-1'
                  onChange={date => onDueDateChange(date)}
                  ref={refDueComp}
                  options={{
                    mode: 'single',
                    dateFormat: 'm-d-Y',
                    maxDate: new Date()
                  }}
                />
                { dueDate ? <div>
                  <Button.Ripple className='btn-icon mb-50' color='flat-danger' onClick={() => clearDueDate()}>
                    <X size={16} />
                  </Button.Ripple>
                </div> : ''}
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
              data={(searchValue.length || fromDate || toDate || selectedStatus || dueDate) ? filteredData : creditNotes}
              expandableRows
              columns={columns}
              paginationPerPage={10}
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

export default CreditNoteComponent