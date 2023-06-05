// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react'

import { useDispatch, useSelector } from "react-redux"
import { retrieveDropRequests, deleteDropRequest } from "../../../redux/actions/drop-request"

import Moment from 'react-moment'

import { toast, Slide } from 'react-toastify'
import Avatar from '@components/avatar'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import ReactPaginate from 'react-paginate'
import { ChevronDown, Edit, Trash2, X } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Row, Col, Label, Card, Input, CardHeader, CardTitle, Button, Badge, FormGroup } from 'reactstrap'

import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Link } from 'react-router-dom'
import moment from 'moment'

const mySwal = withReactContent(Swal)

const ToastContent = ({message}) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Check size={12} />} />
        <h6 className='toast-title font-weight-bold'>Success!</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>{message}</span>
    </div>
  </Fragment>
)

const DropRequestComponent = ({ data }) => {
  // ** State
  const [fromDate, setFromDate] = useState('')
  const [fromOneDayAfterDate, setOneDayAfterFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const dropRequests = useSelector(state => state.dropRequests)
  const dispatch = useDispatch()
  const userData = JSON.parse(localStorage.getItem('userData'))
  const refComp = useRef(null)

  useEffect(() => {
    if (userData) {
      dispatch(retrieveDropRequests(userData.X3SITE_0, userData.X3USER_0))
    }
  }, [])

  const onDeleteDropRequest = (id) => {
    return mySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ml-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        dispatch(deleteDropRequest(id))
          .then(data => {
            toast.success(
              <ToastContent message={data.message} />,
              { transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )
          })
          .catch(e => {
            console.log(e)
          })
      }
    })
  }

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    if (value.length) {
      updatedData = dropRequests && dropRequests.filter(dropRequest => {
        let isMatch = false
        Object.keys(dropRequest).forEach(key => {
          if (dropRequest[key] && dropRequest[key] !== " " && dropRequest[key].toString().toLowerCase().includes(value.toLowerCase())) {
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
    0: { title: 'To Confirm', color: 'light-info' },
    1: { title: 'Confirmed', color: 'light-primary' },
    2: { title: 'Order Generated', color: 'light-dark' },
    3: { title: 'Open', color: 'light-success' },
    4: { title: 'Cancelled', color: 'light-danger' }
  }
  
  const type = {
    0: { title: 'Sales Delivery', color: 'light-info' },
    1: { title: 'Purchase Return', color: 'light-danger' },
    2: { title: 'Pick Ticket', color: 'light-success' },
    3: { title: 'Misc Stop', color: 'light-warning' }
  }

  const columns = [
    {
      name: 'Drop Req ID',
      selector: 'XDROPID_0',
      sortable: true,
      minWidth: '100px',
      cell: row => {
        return (
          <Link to={`/customer/manage-request/drop-request/detail/${row.XDROPID_0}`}>
            {row.XDROPID_0}
          </Link>
        )
      }
    },
    {
      name: 'Drop Type',
      selector: 'XDROPTYP_0',
      sortable: true,
      minWidth: '150px',
      cell: row => {
        return (
          <Badge color={type[row.XDROPTYP_0] && type[row.XDROPTYP_0].color} pill>
            {type[row.XDROPTYP_0] && type[row.XDROPTYP_0].title}
          </Badge>
        )
      }
    },
    {
      name: 'Date',
      selector: 'date',
      sortable: true,
      minWidth: '150px',
      cell: row => {
        return (
          <Moment format="MM/DD/YYYY">{row.ORDDAT_0}</Moment>
        )
      }
    },
    {
      name: 'Referance',
      selector: 'CUSORDREF_0',
      sortable: true,
      minWidth: '220px'
    },
    {
      name: 'Order No',
      selector: 'XODRNUM_0',
      sortable: true,
      minWidth: '220px'
    },
    {
      name: 'Status',
      selector: 'XSOHFLG_0',
      sortable: true,
      minWidth: '150px',
      cell: row => {
        return (
          <Badge color={status[row.XSOHFLG_0] && status[row.XSOHFLG_0].color} pill>
            {status[row.XSOHFLG_0] && status[row.XSOHFLG_0].title}
          </Badge>
        )
      }
    },
    {
      name: 'DELIVERY NO',
      selector: 'XDLVYNO_0',
      sortable: true,
      minWidth: '220px'
    },
    {
      name: 'Actions',
      allowOverflow: true,
      cell: row => {
        if (row.XSOHFLG_0 !== 2) {
          return (
            <div className='d-flex'>
              <Button.Ripple className='btn-icon rounded-circle' tag={Link} to={`/customer/manage-request/drop-request/edit/${row.XDROPID_0}`} color='flat-warning'>
                <Edit size={16} />
              </Button.Ripple>
              <Button.Ripple className='btn-icon rounded-circle' onClick={() => onDeleteDropRequest(row.XDROPID_0)} color='flat-danger'>
                <Trash2 size={16} />
              </Button.Ripple>
            </div>
          )
        }
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
      pageCount={(searchValue.length || (fromDate && toDate)) ? filteredData.length / 10 : dropRequests.length / 10 || 1}
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
        updatedData = dropRequests && dropRequests.filter(item => moment(moment(item.ORDDAT_0).format('YYYY-MM-DD')).isBetween(startDate, endDate, undefined, '[]'))
        setFilteredData(updatedData)
      } else {
                  let updatedData = []
                  const startDate = moment(date[0]).format('YYYY-MM-DD')
                    console.log("T11 to before =", updatedData)
                  updatedData = dropRequests && dropRequests.filter(item => moment(moment(item.ORDDAT_0).format('YYYY-MM-DD')).isSameOrAfter(startDate))
                    console.log("T11 to after =", updatedData)
                  setFilteredData(updatedData)

              }
            //   setOneDayAfterFromDate(date[0].setDate(date[0].getDate() + 1))
    } else {
      setToDate(date[0])
      if (fromDate) {
        let updatedData = []
        const startDate = moment(fromDate).format('YYYY-MM-DD')
        const endDate = moment(date[0]).format('YYYY-MM-DD')
        updatedData = dropRequests && dropRequests.filter(item => moment(moment(item.ORDDAT_0).format('YYYY-MM-DD')).isBetween(startDate, endDate, undefined, '[]'))
        setFilteredData(updatedData)
      } else {
                   let updatedData = []
                   const endDate = moment(date[0]).format('YYYY-MM-DD')
                   updatedData = dropRequests && dropRequests.filter(item => moment(moment(item.ORDDAT_0).format('YYYY-MM-DD')).isSameOrBefore(endDate))
                           setFilteredData(updatedData)

              }
    }
  }

  const clearDate = () => {
    refComp.current.flatpickr.clear()
    setFromDate('')
    setToDate('')
     setOneDayAfterFromDate('')
    setFilteredData(dropRequests)
  }

  return (
    <div className="w-100">
      <Row>
        <Col sm='12'>
          <Card>
            <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
              <CardTitle tag='h4'>Sales Order Request</CardTitle>
              <Button.Ripple color='primary' tag={Link} to='/customer/manage-request/drop-request/create'>
                Add New Sales Order Request
              </Button.Ripple>
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
              data={(searchValue.length || fromDate || toDate) ? filteredData : dropRequests}
              columns={columns}
              paginationPerPage={10}
              className='react-dataTable'
              sortIcon={<ChevronDown size={10} />}
              paginationDefaultPage={currentPage + 1}
              paginationRowsPerPageOptions={[10, 25, 50, 100]}
              paginationComponent={CustomPagination}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default DropRequestComponent
