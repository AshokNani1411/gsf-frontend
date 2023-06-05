// ** React Imports
import { useEffect, useRef, useState } from 'react'

import { useDispatch, useSelector } from "react-redux"
import { retriveReceipts } from "../../redux/actions/receipt/index"

import Moment from 'react-moment'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import ReactPaginate from 'react-paginate'
import { ChevronDown, Image, X } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Row, Col, Label, Card, Input, CardHeader, CardTitle, Badge, Table, Button, FormGroup } from 'reactstrap'

import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Link, useHistory } from 'react-router-dom'
import moment from 'moment'
import Select from 'react-select'
import { selectThemeColors } from '@utils'

const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <Table bordered className="child-table">
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Pre-Receipt</th>
            <th>Product Code</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Weight</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          { data.SORDERQ.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.POHNUM_0}</td>
                <td>{item.XX10CPTH_0}</td>
                <td><strong className="text-dark">{item.ITMREF_0}</strong></td>
                <td>{item.ITMDES_0}</td>
                <td>{item.QTYUOM_0} {item.UOM_0}</td>
                <td>{item.QTYWEU_0} {item.LINWEU_0}</td>
                <td>{item.QTYVOU_0} {item.LINVOU_0}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

const InvoiceComponent = () => {
  // ** State
  const history = useHistory()
  const userData = JSON.parse(localStorage.getItem('userData'))
  if (userData.XPTH_0 !== 2) {
    history.push('/supplier/dashboard')
  }
  const [selectedStatus, setStatus] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const receipts = useSelector(state => state.receipts)
  const dispatch = useDispatch()
  const refComp = useRef(null)
  
  useEffect(() => {
    if (userData) {
      dispatch(retriveReceipts(userData.X3SITE_0, userData.X3USER_0))
    }
  }, [])

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    if (value.length) {
      updatedData = receipts && receipts.filter(receipt => {
        let isMatch = false
        Object.keys(receipt).forEach(key => {
          if (receipt[key] && receipt[key] !== " " && receipt[key].toString().toLowerCase().includes(value.toLowerCase())) {
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

  const invStatus = {
    1: { title: 'Not Invoiced', color: 'light-danger' },
    2: { title: 'Partly', color: 'light-warning' },
    3: { title: 'Invoiced', color: 'light-success' },
    4: { title: 'Not Managed', color: 'light-dark' },
    5: { title: 'Automatic', color: 'light-success' }
  }

  const statusOptions = []
  Object.keys(invStatus).forEach(key => {
    statusOptions.push({value: key, label: `${invStatus[key].title}`})
  })

  const columns = [
    // {
    //   name: 'Site',
    //   selector: 'PRHFCY_0',
    //   sortable: true,
    //   minWidth: '100px'
    // },
    {
      name: 'Receipt Number',
      selector: 'PTHNUM_0',
      sortable: true,
      minWidth: '220px',
      cell: row => {
        // if (row.ISPOD === 1) {
        //   return (
        //     <Link to={`/supplier/receipts/${row.PTHNUM_0}`}>
        //       {row.PTHNUM_0}
        //     </Link>
        //   )
        // } else {
          return (
            <Link to={`/supplier/receipt/${row.PTHNUM_0}`}>
              {row.PTHNUM_0}
            </Link>
          )
        }
      // }
    },
    {
      name: "POD",
      sortable: false,
      minWidth: '120px',
      cell: row => {
        if (row.ISPOD === 1) {
          return (
            <Button type='button' color='primary' outline tag={Link} to={`/supplier/receipts/${row.PTHNUM_0}`}>POD</Button>
          )
        } else {
          return ''
        }
      }
    },
    {
      name: 'Receipt date',
      selector: 'RCPDAT_0',
      sortable: true,
      minWidth: '100px',
      cell: row => {
        return (
          <Moment format="MM/DD/YYYY">{row.RCPDAT_0}</Moment>
        )
      }
    },
    {
      name: 'Invoice Status',
      selector: 'INVFLG_0',
      sortable: true,
      minWidth: '150px',
      cell: row => {
        return (
          <Badge color={invStatus[row.INVFLG_0].color} pill>
            {invStatus[row.INVFLG_0].title}
          </Badge>
        )
      }
    },
    // {
    //   name: 'Supplier',
    //   selector: 'BPSNUM_0',
    //   sortable: true,
    //   minWidth: '100px'
    // },
    {
      name: 'Quantity',
      selector: 'TOTLINQTY_0',
      sortable: true,
      minWidth: '100px'
    },
    {
      name: 'Weight',
      selector: 'TOTGROWEI_0',
      sortable: true,
      minWidth: '100px'
    },
    {
      name: 'Unit',
      selector: 'WEU_0',
      sortable: true,
      minWidth: '100px'
    },
    {
      name: 'Volume',
      selector: 'TOTVOL_0',
      sortable: true,
      minWidth: '100px'
    },
    {
      name: 'Unit',
      selector: 'VOU_0',
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
      pageCount={(searchValue.length || (fromDate && toDate) || selectedStatus) ? filteredData.length / 10 : receipts.length / 10 || 1}
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
        updatedData = receipts && receipts.filter(item => moment(moment(item.RCPDAT_0).format('YYYY-MM-DD')).isBetween(startDate, endDate, undefined, '[]'))
        setFilteredData(updatedData)
      }
    } else {
      setToDate(date[0])
      if (fromDate) {
        let updatedData = []
        const startDate = moment(fromDate).format('YYYY-MM-DD')
        const endDate = moment(date[0]).format('YYYY-MM-DD')
        updatedData = receipts && receipts.filter(item => moment(moment(item.RCPDAT_0).format('YYYY-MM-DD')).isBetween(startDate, endDate, undefined, '[]'))
        setFilteredData(updatedData)
      }
    }
  }

  const clearDate = () => {
    refComp.current.flatpickr.clear()
    setFromDate('')
    setToDate('')
    setFilteredData(receipts)
  }

  const onStatusChange = event => {
    if (event && event.value) {
      setStatus(event.value)
      let updatedData = []
      updatedData = receipts && receipts.filter(item => Number(item.INVFLG_0) === Number(event.value))
      setFilteredData(updatedData)
    } else {
      setStatus('')
      setFilteredData(receipts)
    }
  }
  
  return (
    <div className="w-100">
      <Row>
        <Col sm='12'>
          <Card>
            <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
              <CardTitle tag='h4'>RECEIPTS</CardTitle>
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
                    placeholder='Invoice Status'
                    options={statusOptions}
                    isClearable
                    value={statusOptions.filter((d) => d.value === selectedStatus)}
                    onChange={onStatusChange}
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
                { (fromDate && toDate) ? <div>
                  <Button.Ripple className='btn-icon mb-50' color='flat-danger' onClick={() => clearDate()}>
                    <X size={16} />
                  </Button.Ripple>
                </div> : ''}
              </Col>
            </Row>
            <DataTable
              noHeader
              pagination
              data={(searchValue.length || (fromDate && toDate) || selectedStatus) ? filteredData : receipts}
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

export default InvoiceComponent