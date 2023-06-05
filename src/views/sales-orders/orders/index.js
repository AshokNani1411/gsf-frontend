// ** React Imports
import { useEffect, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { retrieveOrders } from "../../../redux/actions/order"
import { retrieveDeliveryModes, retrieveCarriers } from "../../../redux/actions/common"
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
            <th>Delivery</th>
            <th>Product</th>
            <th>Description</th>
            <th>Order QTY</th>
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
                <td>{item.SDHNUM_0}</td>
                <td><strong className="text-dark">{item.ITMREF_0}</strong></td>
                <td>{item.ITMDES_0}</td>
                <td>{item.QTY_0} {item.STU_0}</td>
                <td>{item.DELIVERYQTY} {item.STU_0}</td>
                <td>{item.GROPRI_0}</td>
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

const OrderComponent = () => {
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
  const [deliveryMode, setDeliveryMode] = useState('')
  const [carrier, setCarrier] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const orders = useSelector(state => state.orders)
  const deliveryModes = useSelector(state => state.deliveryModes)
  const deliveryModeOptions = deliveryModes?.map(d => {
    return {value: d.MDL_0, label: `${d.MDL_0} (${d.TEXTE_0})`}
  })
  const carriers = useSelector(state => state.carriers)
  const carrierOptions = carriers?.map(c => {
    return {value: c.BPTNUM_0, label: `${c.BPTNUM_0} (${c.BPTNAM_0})`}
  })
  const dispatch = useDispatch()
  const refComp = useRef(null)

  useEffect(() => {
    if (userData) {
      dispatch(retrieveOrders(userData.X3SITE_0, userData.X3USER_0))
      dispatch(retrieveDeliveryModes())
      dispatch(retrieveCarriers())
    }
  }, [])

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    if (value.length) {
      updatedData = orders && orders.filter(order => {
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
      name: 'Order',
      selector: 'SOHNUM_0',
      sortable: true,
      minWidth: '220px',
      cell: row => {
        return (
          <Link to={`/customer/sales-orders/order/${row.SOHNUM_0}`}>
            {row.SOHNUM_0}
          </Link>
        )
      }
    },
    {
      name: 'Type',
      selector: 'SOHTYP_0',
      sortable: true,
      minWidth: '220px',
      cell: row => {
        return (row.SOHTYP_0 && row.SOHTYP_0 !== " ") ? `${row.SOHTYP_0} (${row.ORD_TYP})` : ''
      }
    },
    {
      name: 'Order Date',
      selector: 'ORDDAT_0',
      sortable: true,
      minWidth: '120px',
      cell: row => {
        return (
          <Moment format="MM/DD/YYYY">{row.ORDDAT_0}</Moment>
        )
      }
    },
    {
      name: 'Reference',
      selector: 'CUSORDREF_0',
      sortable: true,
      minWidth: '180px'
    },
    {
      name: 'DLV Status',
      selector: 'DLVSTA_0',
      sortable: true,
      minWidth: '150px',
      cell: row => {
        return (
          <Badge color={dlvStatus[row.DLVSTA_0].color} pill>
            {dlvStatus[row.DLVSTA_0].title}
          </Badge>
        )
      }
    },
    {
      name: 'Invoice Status',
      selector: 'INVSTA_0',
      sortable: true,
      minWidth: '150px',
      cell: row => {
        return (
          <Badge color={invStatus[row.INVSTA_0].color} pill>
            {invStatus[row.INVSTA_0].title}
          </Badge>
        )
      }
    },
     {
           name: 'Amount',
           selector: 'ORDINVATI_0',
           sortable: true,
           minWidth: '240px',
           cell: row => {
               return (row.ORDINVATI_0 && row.ORDINVATI_0 !== " ") ? `${row.ORDINVATI_0} ${row.CUR_0}` : ''
              }
         },
    {
      name: 'City',
      selector: 'BPCCTY_0',
      sortable: true,
      minWidth: '200px'
    },
    {
      name: 'Carrier',
      selector: 'BPTNUM_0',
      sortable: true,
      minWidth: '250px',
      cell: row => {
        return (row.BPTNUM_0 && row.BPTNUM_0 !== " ") ? `${row.BPTNUM_0} (${row.BPTNAM_0})` : ''
      }
    },
    {
      name: 'DLV Request Date',
      selector: 'DEMDLVDAT_0',
      sortable: true,
      minWidth: '200px',
      cell: row => {
        return (
          <Moment format="MM/DD/YYYY">{row.DEMDLVDAT_0}</Moment>
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
      name: 'Delivery Method',
      selector: 'MDL_0',
      sortable: true,
      minWidth: '150px',
      cell: row => {
        return (row.MDL_0 && row.MDL_0 !== " ") ? `${row.MDL_0} (${row.MDL_DESC})` : ''
      }
    },
    {
      name: 'Shipment Date',
      selector: 'SHIDAT_0',
      sortable: true,
      minWidth: '150px',
      cell: row => {
        return (
          <Moment format="MM/DD/YYYY">{row.SHIDAT_0}</Moment>
        )
      }
    },
    {
      name: 'Last DLV Num',
      selector: 'LASDLVNUM_0',
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
      pageCount={(searchValue.length || (fromDate && toDate) || deliveryMode || carrier) ? filteredData.length / 10 : orders.length / 10 || 1}
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
        updatedData = orders && orders.filter(item => moment(moment(item.DEMDLVDAT_0).format('YYYY-MM-DD')).isBetween(startDate, endDate, undefined, '[]'))
        setFilteredData(updatedData)
      } else {
          let updatedData = []
          const startDate = moment(date[0]).format('YYYY-MM-DD')
            console.log("T11 to before =", updatedData)
          updatedData = orders && orders.filter(item => moment(moment(item.DEMDLVDAT_0).format('YYYY-MM-DD')).isSameOrAfter(startDate))
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
        updatedData = orders && orders.filter(item => moment(moment(item.DEMDLVDAT_0).format('YYYY-MM-DD')).isBetween(startDate, endDate, undefined, '[]'))
        setFilteredData(updatedData)
      } else {
           let updatedData = []
           const endDate = moment(date[0]).format('YYYY-MM-DD')
           updatedData = orders && orders.filter(item => moment(moment(item.DEMDLVDAT_0).format('YYYY-MM-DD')).isSameOrBefore(endDate))
                   setFilteredData(updatedData)

      }
    }
  }

  const onModeChange = event => {
    if (event && event.value) {
      setDeliveryMode(event.value)
      let updatedData = []
      updatedData = orders && orders.filter(item => item.MDL_0 === event.value)
      setFilteredData(updatedData)
    } else {
      setDeliveryMode('')
      setFilteredData(orders)
    }
  }

  const onCarrierChange = event => {
    if (event && event.value) {
      setCarrier(event.value)
      let updatedData = []
      updatedData = orders && orders.filter(item => item.BPTNUM_0 === event.value)
      setFilteredData(updatedData)
    } else {
      setCarrier('')
      setFilteredData(orders)
    }
  }

  const clearDate = () => {
    refComp.current.flatpickr.clear()
    setFromDate('')
    setToDate('')
    setOneDayAfterFromDate('')
    setFilteredData(orders)
  }

  return (
    <div className="w-100">
      <Row>
        <Col sm='12'>
          <Card>
            <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
              <CardTitle tag='h4'>Orders</CardTitle>
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
                    id='carrier'
                    theme={selectThemeColors}
                    classNamePrefix='select'
                    placeholder='Carrier'
                    options={carrierOptions}
                    isClearable
                    value={carrierOptions.filter((c) => c.value === carrier)}
                    onChange={onCarrierChange}
                  />
                </FormGroup>
              </Col>
              <Col md='4' lg='3' className='mt-1'>
                <FormGroup>
                  <Select
                    id='deliverymode'
                    theme={selectThemeColors}
                    classNamePrefix='select'
                    placeholder='Delivery Method'
                    options={deliveryModeOptions}
                    isClearable
                    value={deliveryModeOptions.filter((d) => d.value === deliveryMode)}
                    onChange={onModeChange}
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
              data={(searchValue.length || fromDate || toDate || deliveryMode || carrier) ? filteredData : orders}
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

export default OrderComponent
