// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import classnames from 'classnames'
import Select from 'react-select'
import { toast, Slide } from 'react-toastify'
import { useDispatch, useSelector } from "react-redux"
import { retrieveDiscussionForums, createDiscussionForum, updateDiscussionForum, deleteDiscussionForum } from "../../redux/actions/discussion-forum"
import { retrieveBusinessPartners } from "../../redux/actions/business-partner"
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { selectThemeColors, isObjEmpty } from '@utils'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Avatar from '@components/avatar'
import { Check, ChevronDown, MoreVertical } from 'react-feather'
const mySwal = withReactContent(Swal)
import { Link, useHistory } from 'react-router-dom'
import moment from 'moment'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import Moment from 'react-moment'

const ToastContent = ({header, message, color}) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color={color} icon={<Check size={12} />} />
        <h6 className='toast-title font-weight-bold'>{header}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>{message}</span>
    </div>
  </Fragment>
)

const DiscussionForumComponent = () => {
  const history = useHistory()
  // ** State
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [basicModal, setBasicModal] = useState(false)
  const userData = JSON.parse(localStorage.getItem('userData'))
  const businessPartners = useSelector(state => state.businessPartners)
  const businessPartnerOptions = businessPartners.map(b => {
    return {value: b.BPRNUM_0, label: `${b.BPRNUM_0} (${b.BPRNAM_0})`}
  })
  const initialDiscussionForumState = {
    id: '',
    x3user: '',
    user: userData.X3USER_0,
    title: '',
    description: ''
  }
  const [discussionForum, setDiscussionForum] = useState(initialDiscussionForumState)
  const [isSubmitted, setSubmitted] = useState(false)
  const discussionForums = useSelector(state => state.discussionForums)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(retrieveBusinessPartners())
    dispatch(retrieveDiscussionForums())
  }, [])

  const { register, errors, handleSubmit } = useForm({
    defaultValues: initialDiscussionForumState
  })

  const setX3User = event => {
    setDiscussionForum({ ...discussionForum, ['x3user']: event ? event.value : '' })
  }

  const handleInputChange = event => {
    const { name, value } = event.target
    setDiscussionForum({ ...discussionForum, [name]: value })
  }

  const onEditForum = forum => {
    setDiscussionForum({
      id: forum.X10CFORUMID_0,
      x3user: forum.BPANUM_0,
      user: userData.X3USER_0,
      title: forum.X10CTITLE_0,
      description: forum.X10CTITDES_0
    })
    setBasicModal(true)
  }

  const onSubmit = () => {
    setSubmitted(true)
    if (isObjEmpty(errors) && discussionForum.description) {
      if (discussionForum.id) {
        return mySwal.fire({
          title: 'Are you sure?',
          text: "You won't to update this discussion forum!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, Update it!',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ml-1'
          },
          buttonsStyling: false
        }).then(function (result) {
          if (result.value) {
            dispatch(updateDiscussionForum(discussionForum))
              .then(data => {
                setBasicModal(!basicModal)
                if (data && data.success) {
                  // history.push('/users')
                  toast.success(
                    <ToastContent header='Success' message={data.message} color='success' />,
                    { transition: Slide, hideProgressBar: true, autoClose: 2000 }
                  )
                  setDiscussionForum(initialDiscussionForumState)
                  dispatch(retrieveDiscussionForums())
                } else {
                  toast.warning(
                    <ToastContent header='Warning' message={data.message} color='warning' />,
                    { transition: Slide, hideProgressBar: true, autoClose: 2000 }
                  )
                }
              })
              .catch(e => {
                console.log(e)
              })
          }
        })
      } else {
        dispatch(createDiscussionForum(discussionForum))
        .then(data => {
          setBasicModal(!basicModal)
          if (data && data.success) {
            toast.success(
              <ToastContent header='Success' message={data.message} color='success' />,
              { transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )
            setDiscussionForum(initialDiscussionForumState)
            dispatch(retrieveDiscussionForums())
          } else {
            toast.warning(
              <ToastContent header='Warning' message={data.message} color='warning' />,
              { transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )
          }
        })
        .catch(e => {
          console.log(e)
        })
      }
    }
  }

  const gotoDetail = (id) => {
    history.push(`/discussion-forum/${id}`)
  }

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
        dispatch(deleteDiscussionForum(id))
          .then(data => {
            toast.success(
              <ToastContent header='Success' message='Deleted Successfully' color='success' />,
              { transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )
          })
          .catch(e => {
            console.log(e)
          })
      }
    })
  }

  const columns = [
    {
      name: 'ID',
      selector: 'X10CFORUMID_0',
      sortable: true,
      minWidth: '80px'
    },
    {
      name: 'Subject',
      selector:  row => {
           return <a className='text-primary cursor-pointer' onClick={() => gotoDetail(row.X10CFORUMID_0)}>{row.X10CTITLE_0}</a>
        },
      sortable: true,
      minWidth: '220px'
    },
    {
      name: 'Description',
      selector: 'X10CTITDES_0',
      sortable: true,
      minWidth: '220px'
    },
    {
      name: 'Created on',
      sortable: true,
      minWidth: '180px',
      selector: row => {
        return <Moment format="MM/DD/YYYY hh:mm A">{row.CREDATTIM_0}</Moment>
      }
    }
  ]

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    if (value.length) {
      updatedData = discussionForums && discussionForums.filter(order => {
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

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={(searchValue.length) ? filteredData.length / 10 : discussionForums.length / 10 || 1}
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
              <CardTitle tag='h4'>Discussion Forums</CardTitle>
            </CardHeader>
            <Row className='justify-content-between mx-0'>
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
              <Button.Ripple color='primary' onClick={() => setBasicModal(!basicModal)}>
                Create New Forum
              </Button.Ripple>
              ) : ''}
              </Col>
            </Row>
            <DataTable
              noHeader
              pagination
              data={(searchValue.length) ? filteredData : discussionForums}
              columns={columns}
              paginationPerPage={10}
              expandOnRowClicked
              className='react-dataTable'
              sortIcon={<ChevronDown size={10} />}
              paginationDefaultPage={currentPage + 1}
              paginationRowsPerPageOptions={[10, 25, 50, 100]}
              paginationComponent={CustomPagination}
            />
            {/* <CardBody>
              <Row className='mt-2'>
                { discussionForums.map((forum, index) => {
                  return <Col md='4' sm='12' key={index}>
                    <Card className='border' role='button' onClick={() => gotoDetail(forum.X10CFORUMID_0)}>
                      <CardHeader className='p-1'>
                        <h4>{forum.X10CTITLE_0}</h4>
                        <UncontrolledDropdown className='chart-dropdown'>
                          <DropdownToggle color='light' className='bg-transparent btn-sm border-0 p-50' onClick={(e) => e.stopPropagation()}>
                            <MoreVertical size={18} className='cursor-pointer' />
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem className='w-100' onClick={() => onEditForum(forum)}>Edit</DropdownItem>
                            <DropdownItem className='w-100' onClick={() => onDelete(forum.X10CFORUMID_0)}>Delete</DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                        <h6 className='text-medium'>{moment(forum.CREDATTIM_0).format('MM/DD/YYYY hh:mm A')}</h6>
                      </CardHeader>
                      <h6 className='mb-1 px-1 text-dark'>{forum.X10CTITDES_0}</h6>
                    </Card>
                  </Col>
                })}
              </Row>
            </CardBody> */}
          </Card>
        </Col>
      </Row>
      <Modal isOpen={basicModal} toggle={() => setBasicModal(!basicModal)}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader toggle={() => setBasicModal(!basicModal)}>Add New Discussion Forum</ModalHeader>
          <ModalBody>
            <Row>
              {/* <Col sm='12'>
                <FormGroup>
                  <Label for='x3user'>Business Partner <span className='text-danger'>*</span></Label>
                  <Select
                    id='x3user'
                    theme={selectThemeColors}
                    classNamePrefix='select'
                    name='x3user'
                    placeholder='Select Business Partner'
                    options={businessPartnerOptions}
                    isDisabled={discussionForum.id}
                    isClearable
                    value={businessPartnerOptions.filter(b => b.value === discussionForum.x3user)}
                    onChange={setX3User}
                    className={classnames('react-select', { 'is-invalid': isSubmitted && discussionForum.x3user === '' })}
                    innerRef={register({ required: true, validate: value => value !== '' })}
                  />
                </FormGroup>
              </Col> */}
              <Col sm='12'>
                <FormGroup>
                  <Label for='title'>Title <span className='text-danger'>*</span></Label>
                  <Input
                    name='title'
                    id='title'
                    value={discussionForum.title}
                    onChange={handleInputChange}
                    className={classnames({ 'is-invalid': errors['title'] })}
                    innerRef={register({ required: true, validate: value => value !== '' })}
                  />
                </FormGroup>
              </Col>
              <Col sm='12'>
                <FormGroup>
                  <Label for='fname'>Description <span className='text-danger'>*</span></Label>
                  <Input
                    type='textarea'
                    name='description'
                    rows='3'
                    id='description'
                    value={discussionForum.description}
                    onChange={handleInputChange}
                    className={classnames({ 'is-invalid': errors['description'] })}
                    innerRef={register({ required: true, validate: value => value !== '' })}
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button type='submit' color='primary' onClick={() => setSubmitted(true)}>
              {discussionForum.id ? 'Update' : 'Create'}
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  )
}

export default DiscussionForumComponent
