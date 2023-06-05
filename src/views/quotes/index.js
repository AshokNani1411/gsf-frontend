// ** React Imports
import { useEffect, useRef, useState } from 'react'
import { Link,  useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { retrieveQuotes } from "../../redux/actions/quote"
import Moment from 'react-moment'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import ReactPaginate from 'react-paginate'
import { ChevronDown, X} from 'react-feather'
import DataTable from 'react-data-table-component'
import { Row, Col, Table, Badge, Card, Input, CardHeader, CardTitle, Button, FormGroup } from 'reactstrap'
import moment from 'moment'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <Table bordered className="child-table">
        <thead>
          <tr>
            <th>Quote No</th>
            <th>Product</th>
            <th>Description</th>
            <th>Quote QTY</th>
            <th>Orderd QTY</th>
            <th>Price</th>
            <th>Currency</th>
            <th className='text-right'>Line Amount</th>
          </tr>
        </thead>
        <tbody>
          { data.SORDERQ.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.SQHNUM_0}</td>
                <td><strong className="text-dark">{item.ITMREF_0}</strong></td>
                <td>{item.ITMDES_0}</td>
                <td>{item.QTY_0} {item.SAU_0}</td>
                <td>{item.ORDQTY_0} {item.SAU_0}</td>
                <td>{item.GROPRI_0}</td>
                <td>{data.CUR_0}</td>
                <td className='text-right'>{(item.QTY_0 * item.GROPRI_0)} {data.CUR_0}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

const QuoteComponent = () => {
  // ** State
  const history = useHistory()
  const userData = JSON.parse(localStorage.getItem('userData'))
  if (userData.XSOH_0 !== 2) {
    history.push('/customer/dashboard')
  }
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const quotes = useSelector(state => state.quotes)
  const dispatch = useDispatch()
  const refComp = useRef(null)

  useEffect(() => {
    if (userData) {
      dispatch(retrieveQuotes(userData.X3SITE_0, userData.X3USER_0))
    }
  }, [])

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    if (value.length) {
      updatedData = quotes && quotes.filter(quote => {
        let isMatch = false
        Object.keys(quote).forEach(key => {
          if (quote[key] && quote[key] !== " " && quote[key].toString().toLowerCase().includes(value.toLowerCase())) {
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

  const quoStatus = {
    1: { title: 'NOT ORDERED', color: 'light-danger' },
    2: { title: 'PARTLY ORDERD', color: 'light-warning' },
    3: { title: 'ORDERD', color: 'light-success' }
  }

  const columns = [
    {
      name: 'Sales Quote No',
      selector: 'SQHNUM_0',
      sortable: true,
      minWidth: '220px',
       cell: row => {
         return (
           <Link to={`/customer/quotes/order/${row.SQHNUM_0}`}>
            {row.SQHNUM_0}
          </Link>
         )
       }
    },
    {
      name: 'Sales Order No',
      selector: 'SOHNUM_0',
      sortable: true,
      minWidth: '220px'
    },
    {
      name: 'Type',
      selector: 'SQHTYP_0',
      sortable: true,
      minWidth: '220px'
      // cell: row => {
      //   return (row.SOHTYP_0 && row.SOHTYP_0 !== " ") ? `${row.SOHTYP_0} (${row.ORD_TYP})` : ''
      // }
    },
    {
      name: 'Quote Date',
      selector: 'QUODAT_0',
      sortable: true,
      minWidth: '120px',
      cell: row => {
        return (
          <Moment format="MM/DD/YYYY">{row.QUODAT_0}</Moment>
        )
      }
    },
    {
      name: 'Reference',
      selector: 'CUSQUOREF_0',
      sortable: true,
      minWidth: '180px'
    },
    {
      name: 'Quote Status',
      selector: 'QUOSTA_0',
      sortable: true,
      minWidth: '150px',
      cell: row => {
        return (
          <Badge color={quoStatus[row.QUOSTA_0].color} pill>
            {quoStatus[row.QUOSTA_0].title}
          </Badge>
        )
      }
    },
    // {
    //   name: 'Carrier',
    //   selector: 'FFWNUM_0',
    //   sortable: true,
    //   minWidth: '250px'
    //   // cell: row => {
    //   //   return (row.BPTNUM_0 && row.BPTNUM_0 !== " ") ? `${row.BPTNUM_0} (${row.BPTNAM_0})` : ''
    //   // }
    // },
    {
      name: 'Validity Date',
      selector: 'VLYDAT_0',
      sortable: true,
      minWidth: '200px',
      cell: row => {
        return (
          <Moment format="MM/DD/YYYY">{row.VLYDAT_0}</Moment>
        )
      }
    },
    {
      name: 'Order Date',
      selector: 'ORDDAT_0',
      sortable: true,
      minWidth: '150px',
      cell: row => {
        return (
          <Moment format="MM/DD/YYYY">{row.ORDDAT_0}</Moment>
        )
      }
    },
    {
      name: 'Amount',
      selector: 'QUOINVATI_0',
      sortable: true,
      minWidth: '240px',
      cell: row => {
          return (row.QUOINVATI_0 && row.QUOINVATI_0 !== " ") ? `${row.QUOINVATI_0} ${row.CUR_0}` : ''
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
      pageCount={(searchValue.length || (fromDate && toDate)) ? filteredData.length / 10 : quotes.length / 10 || 1}
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
        updatedData = quotes && quotes.filter(item => moment(moment(item.QUODAT_0).format('YYYY-MM-DD')).isBetween(startDate, endDate, undefined, '[]'))
        setFilteredData(updatedData)
      } else {
           let updatedData = []
                    const startDate = moment(date[0]).format('YYYY-MM-DD')
                      console.log("T11 to before =", updatedData)
                        console.log("T11 start DAte =", startDate)
                    updatedData = quotes && quotes.filter(item => moment(moment(item.QUODAT_0).format('YYYY-MM-DD')).isSameOrAfter(startDate))
                      console.log("T11 to after =", updatedData)
                    setFilteredData(updatedData)
      }
    } else {
      setToDate(date[0])
      if (fromDate) {
        let updatedData = []
        const startDate = moment(fromDate).format('YYYY-MM-DD')
        const endDate = moment(date[0]).format('YYYY-MM-DD')
        updatedData = quotes && quotes.filter(item => moment(moment(item.QUODAT_0).format('YYYY-MM-DD')).isBetween(startDate, endDate, undefined, '[]'))
        setFilteredData(updatedData)
      } else {
                  let updatedData = []
                  const endDate = moment(date[0]).format('YYYY-MM-DD')
                  updatedData = quotes && quotes.filter(item => moment(moment(item.QUODAT_0).format('YYYY-MM-DD')).isSameOrBefore(endDate))
                          setFilteredData(updatedData)

             }
    }
  }

  const clearDate = () => {
    refComp.current.flatpickr.clear()
    setFromDate('')
    setToDate('')
    setFilteredData(quotes)
  }

  return (
    <div className="w-100">
      <Row>
        <Col sm='12'>
          <Card>
            <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
              <CardTitle tag='h4'>Sales Quotes</CardTitle>
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
              data={(searchValue.length || fromDate || toDate) ? filteredData : quotes}
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

export default QuoteComponent
