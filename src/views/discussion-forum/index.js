// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import classnames from 'classnames'
import { toast, Slide } from 'react-toastify'
import { useDispatch, useSelector } from "react-redux"
import { retrieveDiscussionForums, createDiscussionForum, updateDiscussionForum } from "../../redux/actions/discussion-forum"
import { retrieveBusinessPartners } from "../../redux/actions/business-partner"
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'
import { isObjEmpty } from '@utils'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Check, MessageCircle } from 'react-feather'
const mySwal = withReactContent(Swal)
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import './dissforum.css'
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle
} from "mdb-react-ui-kit"
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
  const [searchValue, setSearchValue] = useState('')
  const [basicModal, setBasicModal] = useState(false)
  const userData = JSON.parse(localStorage.getItem('userData'))
  const initialDiscussionForumState = {
    id: '',
    x3user: '',
    user: userData.X3USER_0,
    title: '',
    description: ''
  }
  const [discussionForum, setDiscussionForum] = useState(initialDiscussionForumState)
  const discussionForums = useSelector(state => state.discussionForums)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(retrieveBusinessPartners())
    dispatch(retrieveDiscussionForums())
  }, [])

  const { register, errors, handleSubmit } = useForm({
    defaultValues: initialDiscussionForumState
  })

  const handleInputChange = event => {
    const { name, value } = event.target
    setDiscussionForum({ ...discussionForum, [name]: value })
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

  const stringToColor = (string, n) => {
    let color = ''
      if (n === 0) {
        color = "#f08080"
      } else if (n === 1) {
        color = "#3b75a9"
      } else if (n === 2) {
          color = "#facade"
      } else if (n === 3) {
          color = "#3fb59e"
      }  else {
        color = "#133337"
      }
    return color
  }

  const stringAvatar = (string, n) => {
    if (string !== 'undefined') {
      return {
        sx: {
          bgcolor: stringToColor(name, n)
        },
        children: `${string[0]}${string[1]}`
      }
    } else {
      return ''
    }
  }

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

  const GroupAvatars = (prd) => {
    let myArray = []
    if (prd.USERSLIST && prd.USERSLIST.length > 0)  {
      myArray = (prd.USERSLIST).split(",")
    }
    if (myArray.length > 1) {
      return (
        <AvatarGroup max={4} style={{float : "left"}}>
          { myArray && myArray.length > 0 && myArray.map((avatar, i) => {
              return <Avatar key={i} {...stringAvatar(avatar, i)} />
            }
          )}
        </AvatarGroup>
      )
    } else {
      return ''
    }
  }

  return (
    <div className="w-100">
      <Row className="dissforum">
        <Col sm='12'>
          <Card>
            <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
              <CardTitle tag='h4'>Discussion Forums</CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
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
              <Row>
              { discussionForums && discussionForums.length > 0 ? discussionForums.map((prd, i) => (
                <Col sm='12' key={i}>
                  <Card className="mb-2">
                    <CardBody>
                      <Row>
                        <Col sm='12' md='8'>
                          <CardTitle className="text-primary mb-0" tag='h4'>
                          <a href={`/discussion-forum/${prd.X10CFORUMID_0}`} className="text-reset mt-2">
                          {prd.X10CTITLE_0}
                          </a>
                          </CardTitle>
                        </Col>
                        <Col sm='12' md='4'>
                          <div className='text-right'>
                            <span className='pr-1'><MessageCircle size={18} /></span>
                            {prd.NOOFREPLIES} Comments
                          </div>
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col sm='12' md='4'>
                          Created On : <strong> { moment(prd.CREDATTIM_0).format("YYYY-MM-DD") === '1900-01-01' ? '' : moment(prd.CREDATTIM_0).format("YYYY-MM-DD")} </strong> <br />
                          Created By : <strong>  {prd.CREUSR_0} </strong>
                        </Col>
                        <Col sm='12' md='8'>
                          <div className='d-flex justify-content-end'>
                            {GroupAvatars(prd)}
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              )) : (
                <Col sm='12'>
                  <Card className="mb-2">
                    <CardBody>
                      <CardTitle className="text-primary text-center my-2" tag='h4'>
                        No forums to display.
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
