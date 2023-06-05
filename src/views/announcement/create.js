// ** React Imports// ** Third Party Components
import React, { useState, useEffect, Fragment } from "react"
import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { Row, Col, Label, Card, Input, CardTitle, Button, CardBody, Form, FormGroup } from 'reactstrap'
import { useDispatch } from "react-redux"
import { createAnnouncement } from "../../redux/actions/announcement"
import AnnouncementService from "../../services/AnnouncementService"
import { Controller, useForm } from 'react-hook-form'
import { toast, Slide } from 'react-toastify'
import Avatar from '@components/avatar'
import qs from "qs"
import moment from 'moment'
// ** Utils
import { isObjEmpty } from '@utils'
import { Link, useHistory } from 'react-router-dom'
import { Check } from "react-feather"

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Editor } from "react-draft-wysiwyg"
import { ContentState, convertFromHTML, convertToRaw, EditorState } from 'draft-js'
import '@styles/react/libs/editor/editor.scss'
import draftToHtml from "draftjs-to-html"

const mySwal = withReactContent(Swal)

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

const CreateAnnouncementComponent = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const userData = JSON.parse(localStorage.getItem('userData'))
  const initialAnnouncementState = {
    id: '',
    user: userData.X3USER_0,
    title: '',
    validity : new Date(),
    description: ''
  }
  const [announcement, setAnnouncement] = useState(initialAnnouncementState)

  const getAnnouncementDetail = (id) => {
    AnnouncementService.get(id)
      .then(response => {
        setAnnouncement({
          id: response.data.ROWID,
          user: response.data.CREUSR_0,
          title: response.data.X10CSUBJECT_0,
          validity : response.data.X10CEXPDAT_0,
          description: response.data.X10CSUBDES_0
        })
        setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(response.data.X10CSUBDES_0))))
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    const queryPramas = qs.parse(props.location.search, { ignoreQueryPrefix: true })
    const announcementId = props.match.params.id
    if (announcementId) {
      getAnnouncementDetail(announcementId, queryPramas.customer)
    }
  }, [])

  const { register, errors, handleSubmit, control } = useForm({
    defaultValues: initialAnnouncementState
  })

  const [isSubmitted, setSubmitted] = useState(false)

  const handleInputChange = event => {
    const { name, value } = event.target
    setAnnouncement({ ...announcement, [name]: value })
  }


  const onEditorStateChange = editorState => {
    setEditorState(editorState)
    setAnnouncement({ ...announcement, ['description']: draftToHtml(convertToRaw(editorState.getCurrentContent())) })
  }

  const onSubmit = () => {
    setSubmitted(true)
    if (isObjEmpty(errors) && announcement.description) {
      if (announcement.id) {
        return mySwal.fire({
          title: 'Are you sure?',
          text: "You won't to update this announcement!",
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
            dispatch(createAnnouncement(announcement))
              .then(data => {
                if (data && data.success) {
                  // history.push('/users')
                  toast.success(
                    <ToastContent header='Success' message={data.message} color='success' />,
                    { transition: Slide, hideProgressBar: true, autoClose: 2000 }
                  )
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
        dispatch(createAnnouncement(announcement))
        .then(data => {
          if (data && data.success) {
            history.push('/admin/announcement')
            toast.success(
              <ToastContent header='Success' message={data.message} color='success' />,
              { transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )
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

  return (
    <div className="w-100">
      <CardTitle tag='h4'>{announcement.id ? 'UPDATE ANNOUNCEMENT' : 'CREATE ANNOUNCEMENT'}</CardTitle>
      <Row>
        <Col sm='12'>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardBody className="pt-1">
                <Row>
                  <Col sm='8'>
                    <FormGroup>
                      <Label for='title'>Title <span className='text-danger'>*</span></Label>
                      <Input
                        name='title'
                        id='title'
                        value={announcement.title}
                        onChange={handleInputChange}
                        className={classnames({ 'is-invalid': errors['title'] })}
                        innerRef={register({ required: true, validate: value => value !== '' })}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm='4'>
                                <FormGroup>
                                        <Label for='title'>Validity Upto <span className='text-danger'>*</span></Label><br />
                                        <Flatpickr
                                          style = {{height : "40px", border : "1px solid lightgrey"}}
                                         value={announcement.validity}
                                         onChange={(date) => setAnnouncement({...announcement, ['validity']:moment(new Date(date)).format('YYYY-MM-DD') })}

                                          />
                                      </FormGroup>
                                    </Col>
                  <Col sm='12'>
                    <FormGroup>
                      <Label for='fname'>Description <span className='text-danger'>*</span></Label>
                      <Controller
                        control={control}
                        name={"description"}
                        render={() => {
                        return <Editor
                                editorState={editorState}
                                onEditorStateChange={onEditorStateChange}
                                />
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Button type='submit' onClick={() => setSubmitted(true)} className='mr-1' color='primary'>
              {announcement.id ? 'Update' : 'Create'}
            </Button>
            {/* <Button type='reset' color='secondary' className='mr-1' outline tag={Link} to='/users'>Cancel</Button> */}
            <Button type='button' color='danger' outline tag={Link} to='/admin/announcement'>Back</Button>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default CreateAnnouncementComponent
