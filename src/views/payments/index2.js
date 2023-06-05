// ** React Imports
import { useEffect, useRef, useState } from 'react'

import { useDispatch, useSelector } from "react-redux"
import { retriveInvoices } from "../../redux/actions/invoice/index"
import { retrivePendingInvoices } from "../../redux/actions/payment-invoice/index"
import PaymentService from "../../services/PaymentService"
import Moment from 'react-moment'
import InvoiceToPayComponent from "./invoiceList-topay"
import PaymentDetails from './paymentList'
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


const InvoiceComponent = () => {
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
  const [totalPayAmount, setTotalPayAmount] = useState(0)
  const [main, setMain] = useState(true)

  const [currency, setCurrency] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const invoices = useSelector(state => state.invoices)
  const paymentInvoices = useSelector(state => state.paymentInvoices)
  const dispatch = useDispatch()
  const refComp = useRef(null)
  const refDueComp = useRef(null)
  const prevInvoices = useRef()


   useEffect(() => {
      if (userData) {
        dispatch(retrivePendingInvoices(userData.X3SITE_0, userData.X3USER_0))
      }
  }, [])



  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    if (value.length) {
      updatedData = paymentInvoices && paymentInvoices.filter(invoice => {
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




  const [toPayData, setToPayData] = useState([])

const getToPayDataDetail = () => {
   // DropRequestDataService.get(id)
let TotalDueAmount = 0
let cur = ''
 const tempList =   paymentInvoices && paymentInvoices.length > 0 && paymentInvoices.map((invoice) => {
         TotalDueAmount = TotalDueAmount + Number(invoice.AMTATIL_0)
         cur = invoice.CUR_0
         return {...invoice, toPay : true}
   })
    setToPayData(tempList)
    setTotalPayAmount(TotalDueAmount)
    setCurrency(cur)
    }


const toggleRow = (invoice) => {

console.log("invoice =", invoice)
const checkedData = invoice
let TotalDueAmount = 0
let cur = ''


console.log("to pay data =", toPayData)
 const tempList =   toPayData && toPayData.length > 0 && toPayData.map((data) => {
      console.log("data =", data)
        if (checkedData.NUM_0 === data.NUM_0) {
              console.log("num match")
            if (checkedData.toPay) {
               console.log("true")
                return {...data, toPay : false }
            }  else {
               console.log("false")
              TotalDueAmount = TotalDueAmount + Number(data.AMTATIL_0)
              cur = data.CUR_0
             return {...data, toPay : true}
            }

        }  else {


        if (data.toPay) {
         TotalDueAmount = TotalDueAmount + Number(data.AMTATIL_0)
                              cur = data.CUR_0
        }
                     return data

        }

   })
    setToPayData(tempList)
    setTotalPayAmount(TotalDueAmount)
    setCurrency(cur)

 }


useEffect(() => {
    if (paymentInvoices !== prevInvoices.current) {
       getToPayDataDetail()
    }
  }, [paymentInvoices])

console.log("To pay list =", toPayData)
console.log("Open invoices list =", paymentInvoices)
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
                 onChange={() => toggleRow(row)}
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
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={(searchValue.length || fromDate || toDate || selectedStatus || dueDate) ? filteredData.length / 10 : toPayData.length / 10 || 1}
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
        updatedData = paymentInvoices && paymentInvoices.filter(item => moment(moment(item.ACCDAT_0).format('YYYY-MM-DD')).isBetween(startDate, endDate, undefined, '[]'))
        setFilteredData(updatedData)
      } else {

            let updatedData = []
                             const startDate = moment(date[0]).format('YYYY-MM-DD')
                               console.log("T11 to before =", updatedData)
                                 console.log("T11 start DAte =", startDate)
                             updatedData = paymentInvoices && paymentInvoices.filter(item => moment(moment(item.ACCDAT_0).format('YYYY-MM-DD')).isSameOrAfter(startDate))
                               console.log("T11 to after =", updatedData)
                             setFilteredData(updatedData)

      }
    } else {
      setToDate(date[0])
      if (fromDate) {
        let updatedData = []
        const startDate = moment(fromDate).format('YYYY-MM-DD')
        const endDate = moment(date[0]).format('YYYY-MM-DD')
        updatedData = paymentInvoices && paymentInvoices.filter(item => moment(moment(item.ACCDAT_0).format('YYYY-MM-DD')).isBetween(startDate, endDate, undefined, '[]'))
        setFilteredData(updatedData)
      } else {
            let updatedData = []
                           const endDate = moment(date[0]).format('YYYY-MM-DD')
                           updatedData = paymentInvoices && paymentInvoices.filter(item => moment(moment(item.ACCDAT_0).format('YYYY-MM-DD')).isSameOrBefore(endDate))
                                   setFilteredData(updatedData)

      }
    }
  }
  
  const onDueDateChange = date => {
    setDueDate(date)
    let updatedData = []
    updatedData = paymentInvoices && paymentInvoices.filter(item => moment(moment(item.STRDUDDAT_0).format('YYYY-MM-DD')).isSame(moment(date[0]).format('YYYY-MM-DD')))
    setFilteredData(updatedData)
  }

  const onStatusChange = event => {
    if (event && event.value) {
      setStatus(event.value)
      let updatedData = []
      updatedData = paymentInvoices && paymentInvoices.filter(item => Number(item.Status) === Number(event.value))
      setFilteredData(updatedData)
    } else {
      setStatus('')
      setFilteredData(paymentInvoices)
    }
  }

  const clearDate = () => {
    refComp.current.flatpickr.clear()
    setFromDate('')
    setToDate('')
    setFilteredData(paymentInvoices)
  }
  const Checkbox = ({
    indeterminate,
    checked,
    onChange
  }) => {
    return (
      <div>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          style={{ marginLeft: 'auto', marginRight: 'auto' }}
        />
      </div>
    )
  }
  
  const clearDueDate = () => {
    refDueComp.current.flatpickr.clear()
    setDueDate('')
    setFilteredData(paymentInvoices)
  }


  const ProceedtoPay = () => {
      setMain(false)
  }

  const returnInvoice = () => {
     setMain(true)

  }
  
  return (
    <div className="w-100">
     {main ?
     <InvoiceToPayComponent
     searchValue = {searchValue}
     currentPage = {currentPage}
     totalPayAmount = {totalPayAmount}
     fromDate = {fromDate}
     toDate = {toDate}
     ProceedtoPay = {ProceedtoPay}
     selectedStatus = {selectedStatus}
     dueDate = {dueDate}
     filteredData = {filteredData}
     toPayData = {toPayData}
     currency = {currency}
     toggleRow = {toggleRow}  />
     :
     <PaymentDetails
      totalPayAmount = {totalPayAmount}
      currency = {currency}
      returnInvoice = {returnInvoice}
      />
     }



    </div>
  )
}

export default InvoiceComponent