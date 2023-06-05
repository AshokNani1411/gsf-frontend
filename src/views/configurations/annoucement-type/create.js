// ** React Imports// ** Third Party Components
import React, { useState, useEffect, Fragment } from "react"
import classnames from 'classnames'
import { Row, Col, Label, Card, Input, CardTitle, Button, CardBody, Form, FormGroup, CustomInput } from 'reactstrap'
import { useDispatch, useSelector } from "react-redux"
import { createDocument } from "../../redux/actions/document"
import DocumentService from "../../services/DocumentService"
import { retrieveBusinessPartners } from "../../redux/actions/business-partner"
import { useForm } from 'react-hook-form'
import { toast, Slide } from 'react-toastify'
import Avatar from '@components/avatar'
import qs from "qs"
import Select from 'react-select'
// ** Utils
import { isObjEmpty, selectThemeColors } from '@utils'
import { Link, useHistory } from 'react-router-dom'
import { Check } from "react-feather"

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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

const CreateDocumentComponent = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const userData = JSON.parse(localStorage.getItem('userData'))
  const initialDocumentState = {
    id: '',
    x3user: '',
    user: userData.X3USER_0,
    type: '',
    description: '',
    document: '',
    file: null
  }
  const [document, setDocument] = useState(initialDocumentState)
  const businessPartners = useSelector(state => state.businessPartners)
  const businessPartnerOptions = [{value: 'All', label: 'ALL (All Business Partners)'}]
  businessPartners.forEach(b => {
    businessPartnerOptions.push({value: b.BPRNUM_0, label: `${b.BPRNUM_0} (${b.BPRNAM_0})`})
  })

  const getDocumentDetail = (id) => {
    DocumentService.get(id)
      .then(response => {
        setDocument({
          id: response.data.ROWID,
          x3user: response.data.ROWID,
          user: response.data.CREUSR_0,
          type: response.data.X10CSUBJECT_0,
          description: response.data.X10CSUBDES_0,
          document: '',
          file: null
        })
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    const queryPramas = qs.parse(props.location.search, { ignoreQueryPrefix: true })
    const documentId = props.match.params.id
    if (documentId) {
      getDocumentDetail(documentId, queryPramas.customer)
    }
    dispatch(retrieveBusinessPartners())
  }, [])

  const { register, errors, handleSubmit } = useForm({
    defaultValues: initialDocumentState
  })

  const [isSubmitted, setSubmitted] = useState(false)

  const handleInputChange = event => {
    const { name, value } = event.target
    setDocument({ ...document, [name]: value })
  }

  const setX3User = event => {
    setDocument({ ...document, ['x3user']: event ? event.value : '' })
  }

  const onSubmit = async (data) => {
    setSubmitted(true)
    if (isObjEmpty(errors) && document.description) {
      const formData = new FormData()
      formData.append("file", data.file[0])
      formData.append("type", data.type)
      formData.append("description", data.description)
      formData.append("x3user", document.x3user)
      formData.append("user", document.user)
      if (document.id) {
        formData.append("id", document.id)
      }
      
      if (document.id) {
        return mySwal.fire({
          title: 'Are you sure?',
          text: "You won't to update this document!",
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
            dispatch(createDocument(formData))
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
        dispatch(createDocument(formData))
        .then(data => {
          if (data && data.success) {
            history.push('/admin/document')
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
      <CardTitle tag='h4'>{document.id ? 'UPDATE DOCUMENT' : 'CREATE DOCUMENT'}</CardTitle>
      <Row>
        <Col sm='12'>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardBody className="pt-1">
                <Row>
                <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='x3user'>Business Partner <span className='text-danger'>*</span></Label>
                      <Select
                        id='x3user'
                        theme={selectThemeColors}
                        classNamePrefix='select'
                        name='x3user'
                        placeholder='Select Business Partner'
                        options={businessPartnerOptions}
                        isClearable
                        value={businessPartnerOptions.filter(b => b.value === document.x3user)}
                        onChange={setX3User}
                        className={classnames('react-select', { 'is-invalid': isSubmitted && document.x3user === '' })}
                        innerRef={register({ required: true, validate: value => value !== '' })}
                      />
                    </FormGroup>
                  </Col>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='type'>Document Type <span className='text-danger'>*</span></Label>
                      <Input
                        name='type'
                        id='type'
                        value={document.type}
                        onChange={handleInputChange}
                        className={classnames({ 'is-invalid': errors['type'] })}
                        innerRef={register({ required: true, validate: value => value !== '' })}
                      />
                    </FormGroup>
                  </Col>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='description'>Description <span className='text-danger'>*</span></Label>
                      <Input
                        name='description'
                        id='description'
                        value={document.description}
                        onChange={handleInputChange}
                        className={classnames({ 'is-invalid': errors['description'] })}
                        innerRef={register({ required: true, validate: value => value !== '' })}
                      />
                    </FormGroup>
                  </Col>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='file'>Document</Label>
                      <CustomInput 
                      type='file' 
                      id='file' 
                      name='file'
                      innerRef={register({ required: true, validate: value => value !== '' })}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Button type='submit' onClick={() => setSubmitted(true)} className='mr-1' color='primary'>
              {document.id ? 'Update' : 'Create'}
            </Button>
            {/* <Button type='reset' color='secondary' className='mr-1' outline tag={Link} to='/users'>Cancel</Button> */}
            <Button type='button' color='danger' outline tag={Link} to='/admin/document'>Back</Button>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default CreateDocumentComponent
