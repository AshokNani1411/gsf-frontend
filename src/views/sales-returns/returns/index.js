// ** React Imports
import { useEffect, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { retrieveReturns } from "../../../redux/actions/return"
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
            <th>Return No</th>
            <th>Product</th>
            <th>Description</th>
            <th>Return QTY</th>
            <th>DLV QTY</th>
            <th>Price</th>
            <th>Currency</th>
            <th className='text-right'>Amount</th>
          </tr>
        </thead>
        <tbody>
          { data.SORDERQ.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.SRHNUM_0}</td>
                <td><strong className="text-dark">{item.ITMREF_0}</strong></td>
                <td>{item.ITMDES_0}</td>
                <td>{item.QTY_0} {item.STU_0}</td>
                <td>{item.DLVQTY_0} {item.STU_0}</td>
                <td>{item.NETPRI_0}</td>
                <td>{item.CUR_0}</td>
                <td className='text-right'>{item.ToTal_Amount}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

const ReturnComponent = () => {
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
  const returns = useSelector(state => state.returns)
  const dispatch = useDispatch()
  const refComp = useRef(null)

  useEffect(() => {
    if (userData) {
      dispatch(retrieveReturns(userData.X3SITE_0, userData.X3USER_0))
    }
  }, [])

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    if (value.length) {
      updatedData = returns && returns.filter(order => {
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
      1: { title: 'Scheduled', color: 'light-info' },
      2: { title: 'On the way', color: 'light-primary' },
      3: { title: 'In-Progress', color: 'light-primary' },
      4: { title: 'Completed', color: 'light-success' },
      5: { title: 'Skipped', color: 'light-warning' },
      6: { title: 'Re-Scheduled', color: 'light-warning' },
      7: { title: 'Cancelled', color: 'light-danger' },
      8: { title: 'To-Plan', color: 'light-dark' }
    }

  const invStatus = {
    1: { title: 'NOT INVOICED', color: 'light-danger' },
    2: { title: 'PARTLY', color: 'light-warning' },
    3: { title: 'INVOICED', color: 'light-success' }
  }

  const columns = [
    // {
    //   name: 'Site',
    //   selector: 'SALFCY_0',
    //   sortable: true,
    //   minWidth: '100px'
    // },
    {
      name: 'Return No',
      selector: 'SRHNUM_0',
      sortable: true,
      minWidth: '220px',
      cell: row => {
        return (
          <Link to={`/customer/sales-returns/return/${row.SRHNUM_0}`}>
            {row.SRHNUM_0}
          </Link>
        )
      }
    },
    {
      name: 'Type',
      selector: 'SRHTYP_0',
      sortable: true,
      minWidth: '220px',
      cell: row => {
        return (row.SRHTYP_0 && row.SRHTYP_0 !== " ") ? `${row.SRHTYP_0}` : ''
      }
    },
    {
      name: 'Return Date',
      selector: 'RTNDAT_0',
      sortable: true,
      minWidth: '120px',
      cell: row => {
        return (
          <Moment format="MM/DD/YYYY">{row.RTNDAT_0}</Moment>
        )
      }
    },
      {
           name: 'Reason',
           selector: 'XREASON_0',
           sortable: true,
           minWidth: '180px'
         },
         {
            name: 'Status',
            selector: 'XDLV_STATUS_0',
            sortable: true,
            minWidth: '150px',
            cell: row => {
              return (
                <Badge color={dlvStatus[row.XDLV_STATUS_0].color} pill>
                  {dlvStatus[row.XDLV_STATUS_0].title}
                </Badge>
              )
            }
          },

    // {
    //   name: 'DLV Time',
    //   selector: 'DEMDLVDAT_0',
    //   sortable: true,
    //   minWidth: '150px',
    //   cell: row => {
    //     return (
    //       <Moment format="HH:mm:ss">{row.DEMDLVDAT_0}</Moment>
    //     )
    //   }
    // },

    {
      name: 'DLV Num',
      selector: 'SDHNUM_0',
      sortable: true,
      minWidth: '240px'
    }
  ]

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={(searchValue.length || fromDate || toDate) ? filteredData.length / 10 :  returns.length / 10 || 1}
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
        updatedData = returns && returns.filter(item => moment(moment(item.DEMDLVDAT_0).format('YYYY-MM-DD')).isBetween(startDate, endDate, undefined, '[]'))
        setFilteredData(updatedData)
      } else {
          let updatedData = []
          const startDate = moment(date[0]).format('YYYY-MM-DD')
            console.log("T11 to before =", updatedData)
          updatedData = returns && returns.filter(item => moment(moment(item.DEMDLVDAT_0).format('YYYY-MM-DD')).isSameOrAfter(startDate))
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
        updatedData = returns && returns.filter(item => moment(moment(item.DEMDLVDAT_0).format('YYYY-MM-DD')).isBetween(startDate, endDate, undefined, '[]'))
        setFilteredData(updatedData)
      } else {
           let updatedData = []
           const endDate = moment(date[0]).format('YYYY-MM-DD')
           updatedData = returns && returns.filter(item => moment(moment(item.DEMDLVDAT_0).format('YYYY-MM-DD')).isSameOrBefore(endDate))
                   setFilteredData(updatedData)

      }
    }
  }


  const clearDate = () => {
    refComp.current.flatpickr.clear()
    setFromDate('')
    setToDate('')
    setOneDayAfterFromDate('')
    setFilteredData(returns)
  }

  console.log("Returns data =", returns)

  return (
    <div className="w-100">
      <Row>
        <Col sm='12'>
          <Card>
            <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
              <CardTitle tag='h4'>Returns</CardTitle>
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
              data={(searchValue.length || fromDate || toDate) ? filteredData : returns}
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

export default ReturnComponent
