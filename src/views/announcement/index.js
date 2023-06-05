// ** React Imports
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { retrieveAnnouncements, deleteAnnouncement } from "./../../redux/actions/announcement"
import '@styles/react/libs/flatpickr/flatpickr.scss'
import ReactPaginate from 'react-paginate'
import { ChevronDown, Edit, Trash2} from 'react-feather'
import DataTable from 'react-data-table-component'
import { Row, Col, Card, CardBody, Input, CardHeader, CardTitle, Button, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import Swal from 'sweetalert2'
import './annos.css'
import EllipsisText from "react-ellipsis-text"
import withReactContent from 'sweetalert2-react-content'
import moment from 'moment'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCardText,
  MDBCardGroup,
  MDBCard,
  MDBCardFooter,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBCardTitle,
  MDBBtn,
  MDBRipple
} from "mdb-react-ui-kit"
const mySwal = withReactContent(Swal)

const AnnouncementComponent = () => {
  // ** State
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [basicModal, setBasicModal] = useState(false)
  const [detail, setDetail] = useState({})
  const announcements = useSelector(state => state.announcements)
  const dispatch = useDispatch()
  const userData = JSON.parse(localStorage.getItem('userData'))

  useEffect(() => {
    dispatch(retrieveAnnouncements())
  }, [])

  const onDelete = (id) => {
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
        dispatch(deleteAnnouncement(id))
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
      updatedData = announcements && announcements.filter(order => {
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

  const showDetail = data => {
    setBasicModal(!basicModal)
    setDetail(data)
  }

  const columns = [
    {
      name: 'Sr.No.',
      selector: row => {
        return <a href='javascript:void(0);' onClick={() => showDetail(row)}>{row.ROWID}</a>
      },
      sortable: true,
      minWidth: '80px'
    },
    {
      name: 'Subject',
      selector: 'X10CSUBJECT_0',
      sortable: true,
      minWidth: '220px'
    },
    {
      name: 'Description',
      sortable: true,
      minWidth: '220px',
      selector: row => {
        return <div className='announcement-desc' dangerouslySetInnerHTML={ {__html: row.X10CSUBDES_0} }></div>
      }
    },
    {
      name: 'Created At',
      sortable: true,
      minWidth: '180px',
      selector: row => {
        return <Moment format="MM/DD/YYYY hh:mm A">{row.CREDATTIM_0}</Moment>
      }
    },
    {
      name: 'Created By',
      sortable: true,
      minWidth: '170px',
      selector: 'CREUSR_0'
    }
  ]

  if (userData.X3ROLE_0 === 4) {
    columns.push({
      name: 'Actions',
      allowOverflow: true,
      cell: row => {
        return (
          <div className='d-flex'>
            <Button.Ripple className='btn-icon rounded-circle' tag={Link} to={`/admin/announcement/edit/${row.ROWID}`} color='flat-warning'>
              <Edit size={16} />
            </Button.Ripple>
            <Button.Ripple className='btn-icon rounded-circle' onClick={() => onDelete(row.ROWID)} color='flat-danger'>
              <Trash2 size={16} />
            </Button.Ripple>
          </div>
        )
      }
    })
  }

  return (
    <div className="w-100">
      <Row>
        <Col sm='12'>
          <Card>
            <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
              <CardTitle tag='h4'>Announcements</CardTitle>
            </CardHeader>
            <CardBody>
              <Row className='justify-content-between'>
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
                {userData.X3ROLE_0 === 4 ? (
                <Button.Ripple color='primary' tag={Link} to='/admin/announcement/create'>
                  Create Announcement
                </Button.Ripple>
                ) : ''}
                </Col>
              </Row>
              <Row>
              {searchValue.length ? filteredData && filteredData.length > 0 ? filteredData.map((prd, i) => (
                <Col sm='12' key={i}>
                  <Card className="mb-2">
                    <CardBody>
                      <CardTitle className="text-primary mb-0" tag='h4'>
                      <a href={`/admin/announcement/edit/${prd.ROWID}`} className="text-reset mt-2">
                      {prd.X10CSUBJECT_0}
                      </a>
                      </CardTitle>
                      <hr />
                      <div className="card-desc"dangerouslySetInnerHTML={ {__html: prd.X10CSUBDES_0} }></div>
                      <div className="card-dates">
                        <div className="card-dates-leftlist">
                          Created On : <strong> { moment(prd.X10CCREDAT_0).format("YYYY-MM-DD HH:MM") } </strong> <br />
                        </div>
                        <div className="card-dates-rightlist">
                          Created By : <strong>  {prd.CREUSR_0} </strong>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              )) : (
                <Col sm='12'>
                  <Card className="mb-2">
                    <CardBody>
                      <CardTitle className="text-primary text-center my-2" tag='h4'>
                        No announcements to display.
                      </CardTitle>
                    </CardBody>
                  </Card>
                </Col>
              ) : announcements && announcements.length > 0 ? announcements.map((prd, i) => (
                <Col sm='12' key={i}>
                  <Card className="mb-2">
                    <CardBody>
                      <CardTitle className="text-primary mb-0" tag='h4'>
                      <a href={`/admin/announcement/edit/${prd.ROWID}`} className="text-reset mt-2">
                      {prd.X10CSUBJECT_0}
                      </a>
                      </CardTitle>
                      <hr />
                      <div className="card-desc"dangerouslySetInnerHTML={ {__html: prd.X10CSUBDES_0} }></div>
                      <div className="card-dates">
                        <div className="card-dates-leftlist">
                          Created On : <strong> { moment(prd.X10CCREDAT_0).format("YYYY-MM-DD HH:MM") } </strong> <br />
                        </div>
                        <div className="card-dates-rightlist">
                          Created By : <strong>  {prd.CREUSR_0} </strong>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              )) : (
                <Col sm='12'>
                  <Card className="mb-2">
                    <CardBody>
                      <CardTitle className="text-primary text-center my-2" tag='h4'>
                        No announcements to display.
                      </CardTitle>
                    </CardBody>
                  </Card>
                </Col>
              )}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default AnnouncementComponent
