// ** React Imports
import { useEffect, useRef, useState } from 'react'

import { useDispatch, useSelector } from "react-redux"
import { retrievePurchaseOrders } from "../../../redux/actions/order"

import { retrieveDeliveryModes, retrieveCarriers } from "../../../redux/actions/common"
import Select from 'react-select'
import { selectThemeColors } from '@utils'

import Moment from 'react-moment'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import ReactPaginate from 'react-paginate'
import { ChevronDown, X } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Row, Col, Label, Badge, Card, Input, CardHeader, CardTitle, Table, Button, FormGroup } from 'reactstrap'
import moment from 'moment'

import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Link, useHistory } from 'react-router-dom'

const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <Table bordered className="child-table">
        <thead>
          <tr>
            <th>Pre-Receipt</th>
            <th>Receipt Number</th>
            <th>Product Code</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Weight</th>
            <th>Volume</th>
            <th>Price</th>
            <th>Currency</th>
            <th className='text-right'>Amount</th>
          </tr>
        </thead>
        <tbody>
          { data.SORDERQ.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.X1CPTHNUM_0 }</td>
                <td>{item.PTHNUM_0}</td>
                <td><strong className="text-dark">{item.ITMREF_0}</strong></td>
                <td>{item.ITMDES_0}</td>
                <td>{item.QTYSTU_0} {item.STU_0}</td>
                <td>{item.QTYWEU_0} {item.LINWEU_0}</td>
                <td>{item.QTYVOU_0} {item.LINVOU_0}</td>
                <td>{item.GROPRI_0}</td>
                <td>{item.CUR_0}</td>
                <td className='text-right'>{item.LINAMT_0}</td>
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
  if (userData.XPOH_0 !== 2) {
    history.push('/supplier/dashboard')
  }
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [deliveryMode, setDeliveryMode] = useState('')
  const [carrier, setCarrier] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const purchaseOrders = useSelector(state => state.purchaseOrders)
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
      dispatch(retrievePurchaseOrders(userData.X3SITE_0, userData.X3USER_0))
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
      updatedData = purchaseOrders && purchaseOrders.filter(purchaseOrder => {
        let isMatch = false
        Object.keys(purchaseOrder).forEach(key => {
          if (purchaseOrder[key] && purchaseOrder[key] !== " " && purchaseOrder[key].toString().toLowerCase().includes(value.toLowerCase())) {
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

  const receivedStatus = {
    1: { title: 'Not Received', color: 'light-danger' },
    2: { title: 'Partly', color: 'light-warning' },
    3: { title: 'Received', color: 'light-success' },
    4: { title: 'Not Managed', color: 'light-dark' },
    5: { title: 'Automatic', color: 'light-success' }
  }

  const invStatus = {
    1: { title: 'Not Invoiced', color: 'light-danger' },
    2: { title: 'Partly', color: 'light-warning' },
    3: { title: 'Invoiced', color: 'light-success' },
    4: { title: 'Not Managed', color: 'light-dark' },
    5: { title: 'Automatic', color: 'light-success' }
  }

  const columns = [
    // {
    //   name: 'Site',
    //   selector: 'POHFCY_0',
    //   sortable: true,
    //   minWidth: '100px'
    // },
    {
      name: 'Order',
      selector: 'POHNUM_0',
      sortable: true,
      minWidth: '220px',
      cell: row => {
        return (
          <Link to={`/supplier/purchase-orders/order/${row.POHNUM_0}`}>
            {row.POHNUM_0}
          </Link>
        )
      }
    },
    {
      name: 'Type',
      selector: 'XPOHTYP_0',
      sortable: true,
      minWidth: '100px'
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
      selector: 'XDROPREF_0',
      sortable: true,
      minWidth: '180px'
    },
    {
      name: 'Pre-Receipt',
      selector: 'X1CPTHNUM_0',
      sortable: true,
      minWidth: '220px'
    },
    {
      name: 'Received',
      selector: 'RCPFLG_0',
      sortable: true,
      minWidth: '150px',
      cell: row => {
        return (
          <Badge color={receivedStatus[row.RCPFLG_0].color} pill>
            {receivedStatus[row.RCPFLG_0].title}
          </Badge>
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
    //   minWidth: '200px'
    // },
    {
      name: 'City',
      selector: 'CTY_0',
      sortable: true,
      minWidth: '180px'
    },
    {
      name: 'Carrier',
      selector: 'BPTNUM_0',
      sortable: true,
      minWidth: '270px',
      cell: row => {
        return (row.BPTNUM_0 && row.BPTNUM_0 !== " ") ? `${row.BPTNUM_0} (${row.BPTNAM_0})` : ''
      }
    },
    {
      name: 'Receipt Date',
      selector: 'EXTRCPDAT1_0',
      sortable: true,
      minWidth: '200px',
      cell: row => {
        return (
          <Moment format="MM/DD/YYYY">{row.EXTRCPDAT1_0}</Moment>
        )
      }
    },
    {
      name: 'Delivery Method',
      selector: 'MDL_0',
      sortable: true,
      minWidth: '150px',
      cell: row => {
        return (row.MDL_0 && row.MDL_0 !== " ") ? `${row.MDL_0} (${row.MDL_DESC})` : ''
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
      pageCount={(searchValue.length || (fromDate && toDate) || deliveryMode || carrier) ? filteredData.length / 10 : purchaseOrders.length / 10 || 1}
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
        updatedData = purchaseOrders && purchaseOrders.filter(item => moment(moment(item.ORDDAT_0).format('YYYY-MM-DD')).isBetween(startDate, endDate, undefined, '[]'))
        setFilteredData(updatedData)
      }
    } else {
      setToDate(date[0])
      if (fromDate) {
        let updatedData = []
        const startDate = moment(fromDate).format('YYYY-MM-DD')
        const endDate = moment(date[0]).format('YYYY-MM-DD')
        updatedData = purchaseOrders && purchaseOrders.filter(item => moment(moment(item.ORDDAT_0).format('YYYY-MM-DD')).isBetween(startDate, endDate, undefined, '[]'))
        setFilteredData(updatedData)
      }
    }
  }

  const onModeChange = event => {
    if (event && event.value) {
      setDeliveryMode(event.value)
      let updatedData = []
      updatedData = purchaseOrders && purchaseOrders.filter(item => item.MDL_0 === event.value)
      setFilteredData(updatedData)
    } else {
      setDeliveryMode('')
      setFilteredData(purchaseOrders)
    }
  }

  const onCarrierChange = event => {
    if (event && event.value) {
      setCarrier(event.value)
      let updatedData = []
      updatedData = purchaseOrders && purchaseOrders.filter(item => item.BPTNUM_0 === event.value)
      setFilteredData(updatedData)
    } else {
      setCarrier('')
      setFilteredData(purchaseOrders)
    }
  }

  const clearDate = () => {
    refComp.current.flatpickr.clear()
    setFromDate('')
    setToDate('')
    setFilteredData(purchaseOrders)
  }

  return (
    <div className="w-100">
      <Row>
        <Col sm='12'>
          <Card>
            <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
              <CardTitle tag='h4'>Purchase Orders</CardTitle>
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
              data={(searchValue.length || (fromDate && toDate) || deliveryMode || carrier) ? filteredData : purchaseOrders}
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
