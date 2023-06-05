// ** React Imports
import { useEffect, useRef, useState } from 'react'

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


const InvoiceToPayComponent = (props) => {
  // ** State
  const history = useHistory()
  const userData = JSON.parse(localStorage.getItem('userData'))
  if (userData.XSIH_0 !== 2) {
    history.push('/customer/dashboard')
  }

  // ** Function to handle filter

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
      name: 'Invoice Number',
      selector: 'NUM_0',
      sortable: true,
      minWidth: '220px',
      cell: row => {
        return (
          <Link to={`/customer/invoice/${row.NUM_0}`}>
            {row.NUM_0}
          </Link>
        )
      }
    },
      {
          name: 'Delivery Number',
          selector: 'SIHORINUM_0',
          sortable: true,
          minWidth: '230px'
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
      {
          name: 'Actions',
          allowOverflow: true,
          cell: (row) => {
              return (
                  <Input type="checkbox"
                  checked={row.toPay}
                 onChange={() => props.toggleRow(row)}
                  />
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
      name: 'Currency',
      selector: 'CUR_0',
      sortable: true,
      minWidth: '100px'
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
      forcePage={props.currentPage}
      onPageChange={page => props.handlePagination(page)}
      pageCount={(props.searchValue.length || props.fromDate || props.toDate || props.selectedStatus || props.dueDate) ? props.filteredData.length / 10 : props.toPayData.length / 10 || 1}
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

  return (
    <div className="w-100">
      <Row>
        <Col sm='12'>
          <Card>
            <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
              <CardTitle tag='h4'>Payment for Invoices</CardTitle>
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
                    value={props.searchValue}
                    onChange={props.handleFilter}
                  />
                </FormGroup>
              </Col>
              <Col md='4' lg='4' className='mt-1 d-flex'>
                <Flatpickr
                  value={props.fromDate}
                  id='fromDate'
                  className='form-control mb-50 mr-1'
                  placeholder='From Date'
                  onChange={date => props.onDateChange(date, 'from')}
                  ref={props.refComp}
                  options={{
                    dateFormat: 'm-d-Y',
                    maxDate: props.toDate ? props.toDate : new Date()
                  }}
                />
                <Flatpickr
                  value={props.toDate}
                  id='toDate'
                  className='form-control mb-50 mr-1'
                  placeholder='To Date'
                  onChange={date => props.onDateChange(date, 'to')}
                  ref={props.refComp}
                  options={{
                    dateFormat: 'm-d-Y',
                    minDate: props.fromDate,
                    maxDate: new Date()
                  }}
                />
                { (props.fromDate || props.toDate) ? <div>
                  <Button.Ripple className='btn-icon mb-50' color='flat-danger' onClick={() => props.clearDate()}>
                    <X size={16} />
                  </Button.Ripple>
                </div> : ''}
              </Col>
            </Row>
            <DataTable
              noHeader
              pagination
              data={(props.searchValue.length || props.fromDate || props.toDate || props.selectedStatus || props.dueDate) ? props.filteredData : props.toPayData}
              columns={columns}
              paginationPerPage={10}
              className='react-dataTable'
              sortIcon={<ChevronDown size={10} />}
              paginationDefaultPage={Number(props.currentPage) + 1}
              paginationRowsPerPageOptions={[10, 25, 50, 100]}
              paginationComponent={CustomPagination}


            />
            <hr />
            <Row>

                                                           <Col sm='4' className="mt-5 mr-1 ml-4">
                                                           <FormGroup row>
                                                                                 <Label sm='4'><strong>TOTAL PAY AMOUNT</strong></Label>
                                                                                 <Col sm='8'>
                                                                                    <Input style={{fontSize:"28px", fontWeight : "700"}} className='text-right' value={`${(props?.totalPayAmount).toFixed(2)} ${props.currency}`} disabled/>
                                                                                 </Col>
                                                                               </FormGroup>


                                                          </Col>
                                                            <Col sm='6'>
                                                                                                                        </Col>
                                          <Col sm='1' className="mt-5 mb-5 ">
                                                                                                                       <Button type='button' style={{backgroundColor : "#217f69", color : "white", height : "40px"}} outline onClick={() => props.ProceedtoPay()}>PROCEED TO PAY</Button>
                                                                                                                </Col>

                            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default InvoiceToPayComponent