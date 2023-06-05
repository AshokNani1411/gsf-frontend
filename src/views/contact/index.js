// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { Check, ChevronDown, Edit, Trash2 } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Row, Col, Label, Card, Input, CardHeader, CardTitle, Button } from 'reactstrap'

import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Link } from 'react-router-dom'
import { toast, Slide } from 'react-toastify'
import Avatar from '@components/avatar'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './contact.css'
import { useDispatch, useSelector } from "react-redux"
import { retrieveContacts, deleteContact } from "../../redux/actions/contact"
import { isUserLoggedIn } from '@utils'

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

const ContactComponent = () => {
  // ** State
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const contacts = useSelector(state => state.contacts)
  const [userData, setUserData] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(retrieveContacts())
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
  }, [])

  const onDeleteContact = (id) => {
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
        dispatch(deleteContact(id))
          .then(data => {
            toast.success(
              <ToastContent message='Deleted Successfully' />,
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
      updatedData = contacts && contacts.filter(contact => {
        let isMatch = false
        Object.keys(contact).forEach(key => {
          if (contact[key] && contact[key] !== " " && contact[key].toString().toLowerCase().includes(value.toLowerCase())) {
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

  const role = {
    4: { title: 'Admin', color: 'light-dark' },
    2: { title: 'Customer', color: 'light-success' },
    3: { title: 'Supplier', color: 'light-warning' }
  }
  
  const status = {
    2: { title: 'Active', color: 'light-success' },
    1: { title: 'Inactive', color: 'light-dark' }
  }

  const columns = [
    {
      name: 'Customer Code',
      selector: row => {
        return `${row.BPANUM_0} (${row.BPRNAM_0})`
      },
      sortable: true,
      minWidth: '320px'
    },
    {
      name: 'Contact Code',
      selector: 'CCNCRM_0',
      sortable: true,
      minWidth: '120px'
    },
    {
      name: 'Name',
      selector: 'CNTFNA_0',
      sortable: true,
      minWidth: '120px',
      cell: row => {
        return (row.CNTFNA_0 && row.CNTFNA_0 !== " ") ? `${row.CNTFNA_0} ${row.CNTLNA_0}` : ''
      }
    },
    {
      name: 'Email',
      selector: 'WEB_0',
      sortable: true,
      minWidth: '280px'
    },
    // {
    //   name: 'Mobile',
    //   selector: 'MOB_0',
    //   sortable: true,
    //   minWidth: '160px'
    // },
    // {
    //   name: 'Telephone',
    //   selector: 'TEL_0',
    //   sortable: true,
    //   minWidth: '160px'
    // },
    {
      name: 'Actions',
      allowOverflow: true,
      cell: row => {
        return (
          <div className='d-flex'>
            <Button.Ripple className='btn-icon rounded-circle' tag={Link} to={`/admin/contact/edit/${row.ROWID}?customer=${row.BPANUM_0}`} color='flat-warning'>
              <Edit size={16} />
            </Button.Ripple>
            {/* <Button.Ripple className='btn-icon rounded-circle' onClick={() => onDeleteContact(row.ROWID)} color='flat-danger'>
              <Trash2 size={16} />
            </Button.Ripple> */}
          </div>
        )
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
      pageCount={searchValue.length ? filteredData.length / 10 : contacts.length / 10 || 1}
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
      <Row className="contact">
        <Col sm='12'>
          <Card>
            <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
              <CardTitle tag='h4'>Contacts</CardTitle>
            </CardHeader>
            <Row className='justify-content-start mx-0'>
              <Col xl='6' className='d-flex align-items-center justify-content-start mt-1 mb-2'>
                <Label className='mr-1' for='search-input'>
                  Search
                </Label>
                <Input
                  className='dataTable-filter mb-50'
                  type='text'
                  bsSize='sm'
                  id='search-input'
                  value={searchValue}
                  onChange={handleFilter}
                />
              </Col>
              <Col xl='6' className='d-flex align-items-center justify-content-end mt-1 mb-2'>
              <Button.Ripple color='primary' tag={Link} to='/admin/contact/create'>
                Create Contact
              </Button.Ripple>
              </Col>
            </Row>
            <DataTable
              noHeader
              pagination
              data={searchValue.length ? filteredData : contacts}
              columns={columns}
              paginationPerPage={10}
              className='react-dataTable'
              sortIcon={<ChevronDown size={10} />}
              paginationDefaultPage={currentPage + 1}
              paginationComponent={CustomPagination}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ContactComponent
