// ** React Imports
import { useEffect, useRef, useState } from 'react'

import { useDispatch, useSelector } from "react-redux"
import { retrieveDeliveries } from "../../../redux/actions/delivery"

import Moment from 'react-moment'

import { retrieveDeliveryModes } from "../../../redux/actions/common"
import Select from 'react-select'
import { selectThemeColors } from '@utils'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import ReactPaginate from 'react-paginate'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, X } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Row, Col, Label, Card, Input, Badge, CardHeader, CardTitle, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Table, Button, FormGroup } from 'reactstrap'

import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Link, useHistory } from 'react-router-dom'
import moment from 'moment'

const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <Table bordered className="child-table">
        <thead>
          <tr>
            {/* <th>Line Number</th> */}
            <th>Product Code</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Weight</th>
            <th>Volume</th>
            {/* <th>Vehicle</th>
            <th>Driver</th>
            <th>Delivery Method</th>
            <th>VR</th>
            <th>LVS</th> */}
          </tr>
        </thead>
        <tbody>
          { data.SORDERQ.map((item, index) => {
            return (
              <tr key={index}>
                {/* <td>{item.SDDLIN_0}</td> */}
                <td><strong className="text-dark">{item.ITMREF_0}</strong></td>
                <td>{item.ITMDES_0}</td>
                <td>{item.QTYSTU_0} {item.STU_0}</td>
                <td>{item.DSPLINWEI_0} {item.DSPWEU_0}</td>
                <td>{item.DSPLINVOL_0} {item.DSPVOU_0}</td>
                {/* <td>{`${item.XCODEYVE_0} (${item.NAME_0})`}</td>
                <td>{`${item.DRIVERID_0} (${item.DRIVER_0})`}</td>
                <td>{item.MDL_0} ({item.MDL_DESC})</td>
                <td>{item.XVRSEL_0}</td>
                <td>{item.VCRNUM_0}</td> */}
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

const DeliveriesV2Component = () => {
  // ** State
  const history = useHistory()
  const userData = JSON.parse(localStorage.getItem('userData'))
  if (userData.XSDH_0 !== 2) {
    history.push('/customer/dashboard')
  }
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [deliveryMode, setDeliveryMode] = useState('')
  const [selectedStatus, setStatus] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const deliveries = useSelector(state => state.deliveries)
  const deliveryModes = useSelector(state => state.deliveryModes)
  const deliveryModeOptions = deliveryModes?.map(d => {
    return {value: d.MDL_0, label: `${d.MDL_0} (${d.TEXTE_0})`}
  })
  const dispatch = useDispatch()
  const refComp = useRef(null)

  useEffect(() => {
    if (userData) {
      dispatch(retrieveDeliveries(userData.X3SITE_0, userData.X3USER_0))
      dispatch(retrieveDeliveryModes())
    }
  }, [])

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    if (value.length) {
      updatedData = deliveries && deliveries.filter(delivery => {
        let isMatch = false
        Object.keys(delivery).forEach(key => {
          if (delivery[key] && delivery[key] !== " " && delivery[key].toString().toLowerCase().includes(value.toLowerCase())) {
            isMatch = true
          }
        })
        return isMatch
      })
      setFilteredData(updatedData)
    }
  }

  // ** Function to handle filter
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  const status = {
    1: { title: 'Scheduled', color: 'light-info' },
    2: { title: 'On the way', color: 'light-primary' },
    3: { title: 'In-Progress', color: 'light-primary' },
    4: { title: 'Completed', color: 'light-success' },
    5: { title: 'Skipped', color: 'light-warning' },
    6: { title: 'Re-Scheduled', color: 'light-warning' },
    7: { title: 'Cancelled', color: 'light-danger' },
    8: { title: 'To-Plan', color: 'light-dark' }
  }

  const statusOptions = []
  Object.keys(status).forEach(key => {
    statusOptions.push({value: key, label: `${status[key].title}`})
  })

  const columns = [
    // {
    //   name: 'Site',
    //   selector: 'SALFCY_0',
    //   sortable: true,
    //   width: '100px'
    // },
    {
      name: 'Sales Order #',
      selector: 'SOHNUM_0',
      sortable: true,
      minWidth: '220px',
      cell: row => {
        return (
          <strong className="text-dark">{row.SOHNUM_0}</strong>
        )
      }
    },
    {
      name: "POD",
      sortable: false,
      minWidth: '150px',
      cell: row => {
        if (row.ISPOD === 1) {
          return (
            <Button type='button' color='primary' outline tag={Link} to={`/customer/deliveries/${row.SDHNUM_0}`}>POD</Button>
          )
        } else {
          return ''
        }
      }
    },
    {
      name: 'Delivery #',
      selector: 'SDHNUM_0',
      sortable: true,
      minWidth: '220px',
      cell: row => {
        // if (row.ISPOD === 1) {
        //   return (
        //     <Link to={`/customer/deliveries/${row.SDHNUM_0}`}>
        //       {row.SDHNUM_0}
        //     </Link>
        //   )
        // } else {
          return (
            <Link to={`/customer/delivery/${row.SDHNUM_0}`}>
              {row.SDHNUM_0}
            </Link>
          )
        // }
      }
    },
    {
      name: 'Status',
      selector: 'XDLV_STATUS_0',
      sortable: true,
      minWidth: '150px',
      cell: row => {
        return (
          <Badge color={status[row.XDLV_STATUS_0].color} pill>
            {status[row.XDLV_STATUS_0].title}
          </Badge>
        )
      }
    },
    {
      name: 'Delivery Date',
      selector: 'DLVDAT_0',
      sortable: true,
      width: '120px',
      cell: row => {
        return (
          <Moment format="MM/DD/YYYY">{row.DLVDAT_0}</Moment>
        )
      }
    },
    {
      name: 'Arrival Date',
      selector: 'ARVDAT_0',
      sortable: true,
      width: '120px',
      cell: row => {
        return (
          <Moment format="MM/DD/YYYY">{row.ARVDAT_0}</Moment>
        )
      }
    },
    {
      name: 'Arrival Time',
      selector: 'XARVTIME_0',
      sortable: true,
      minWidth: '100px'
    },
    {
      name: 'Departure Date',
      selector: 'DPEDAT_0',
      sortable: true,
      width: '120px',
      cell: row => {
        return (
          <Moment format="MM/DD/YYYY">{row.DPEDAT_0}</Moment>
        )
      }
    },
    {
      name: 'Departure Time',
      selector: 'XDEPTIME_0',
      sortable: true,
      minWidth: '100px'
    },
     {
               name: 'Amount',
               selector: 'DLVINVATI_0',
               sortable: true,
               minWidth: '240px',
               cell: row => {
                   return (row.DLVINVATI_0 && row.DLVINVATI_0 !== " ") ? `${row.DLVINVATI_0} ${row.CUR_0}` : ''
                  }
             },
    {
      name: 'Country Code',
      selector: 'BPDCRY_0',
      sortable: true,
      minWidth: '100px'
    },
    {
      name: 'City',
      selector: 'BPDCTY_0',
      sortable: true,
      minWidth: '150px'
    },
    {
      name: 'No of Packages',
      selector: 'PACNBR_0',
      sortable: true,
      minWidth: '100px'
    },
    {
      name: 'Delivery Method',
      selector: 'MDL_0',
      sortable: true,
      minWidth: '100px',
      cell: row => {
        return (row.MDL_0 && row.MDL_0 !== " ") ? `${row.MDL_0} (${row.MDL_DESC})` : ''
      }
    },
    {
      name: 'Net Weight',
      selector: 'NETWEI_0',
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
      selector: 'VOL_0',
      sortable: true,
      minWidth: '100px'
    },
    {
      name: 'Unit',
      selector: 'VOU_0',
      sortable: true,
      minWidth: '100px'
    },
    {
      name: 'Contact Code',
      selector: 'CNDNAM_0',
      sortable: true,
      minWidth: '280px',
      cell: row => {
        return (row.CNDNAM_0 && row.CNDNAM_0 !== " ") ? `${row.CNDNAM_0} (${row.CNTFNA_0} ${row.CNTLNA_0})` : ''
      }
    },
    {
      name: 'Route #',
      selector: 'XX10C_NUMPC_0',
      sortable: true,
      minWidth: '220px'
    },
    {
      name: 'Driver Code',
      selector: 'XPODUSER_0',
      sortable: true,
      minWidth: '250px',
      cell: row => {
        return (row.XPODUSER_0 && row.XPODUSER_0 !== " ") ? `${row.XPODUSER_0} (${row.DRIVER_0})` : ''
      }
    },
    {
      name: 'Vehicle',
      selector: 'LICPLATE_0',
      sortable: true,
      minWidth: '250px',
      cell: row => {
        return (row.LICPLATE_0 && row.LICPLATE_0 !== " ") ? `${row.LICPLATE_0} (${row.NAME_0})` : ''
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
      pageCount={(searchValue.length || (fromDate && toDate) || deliveryMode || selectedStatus) ? filteredData.length / 10 : deliveries.length / 10 || 1}
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
        updatedData = deliveries && deliveries.filter(item => moment(moment(item.DLVDAT_0).format('YYYY-MM-DD')).isBetween(startDate, endDate, undefined, '[]'))
        setFilteredData(updatedData)
      } else {
           let updatedData = []
                              const startDate = moment(date[0]).format('YYYY-MM-DD')
                                console.log("T11 to before =", updatedData)
                                  console.log("T11 start DAte =", startDate)
                              updatedData = deliveries && deliveries.filter(item => moment(moment(item.DLVDAT_0).format('YYYY-MM-DD')).isSameOrAfter(startDate))
                                console.log("T11 to after =", updatedData)
                              setFilteredData(updatedData)

      }
    } else {
      setToDate(date[0])
      if (fromDate) {
        let updatedData = []
        const startDate = moment(fromDate).format('YYYY-MM-DD')
        const endDate = moment(date[0]).format('YYYY-MM-DD')
        updatedData = deliveries && deliveries.filter(item => moment(moment(item.DLVDAT_0).format('YYYY-MM-DD')).isBetween(startDate, endDate, undefined, '[]'))
        setFilteredData(updatedData)
      } else {

             let updatedData = []
                           const endDate = moment(date[0]).format('YYYY-MM-DD')
                           updatedData = deliveries && deliveries.filter(item => moment(moment(item.DLVDAT_0).format('YYYY-MM-DD')).isSameOrBefore(endDate))
                                   setFilteredData(updatedData)


      }
    }
  }

  const onModeChange = event => {
    if (event && event.value) {
      setDeliveryMode(event.value)
      let updatedData = []
      updatedData = deliveries && deliveries.filter(item => item.MDL_0 === event.value)
      setFilteredData(updatedData)
    } else {
      setDeliveryMode('')
      setFilteredData(deliveries)
    }
  }
  
  const onStatusChange = event => {
    if (event && event.value) {
      setStatus(event.value)
      let updatedData = []
      updatedData = deliveries && deliveries.filter(item => Number(item.XDLV_STATUS_0) === Number(event.value))
      setFilteredData(updatedData)
    } else {
      setStatus('')
      setFilteredData(deliveries)
    }
  }

  const clearDate = () => {
    refComp.current.flatpickr.clear()
    setFromDate('')
    setToDate('')
    setFilteredData(deliveries)
  }

  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(deliveries[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach(item => {
      let ctr = 0
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv === null) return

    const filename = 'export.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }

  return (
    <div className="w-100">
      <Row>
        <Col sm='12'>
          <Card>
            <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
              <CardTitle tag='h4'>Deliveries</CardTitle>
              {/* <div className='d-flex mt-md-0 mt-1'>
                <UncontrolledButtonDropdown>
                  <DropdownToggle color='secondary' caret outline>
                    <Share size={15} />
                    <span className='align-middle ml-50'>Export</span>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem className='w-100' onClick={() => downloadCSV(deliveries)}>
                      <FileText size={15} />
                      <span className='align-middle ml-50'>CSV</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </div> */}
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
                    id='status'
                    theme={selectThemeColors}
                    classNamePrefix='select'
                    placeholder='Transportation Status'
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
              data={(searchValue.length || fromDate || toDate || deliveryMode || selectedStatus) ? filteredData : deliveries}
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

export default DeliveriesV2Component
