// ** React Imports// ** Third Party Components
import React, { useState, useEffect, Fragment } from "react"
import classnames from 'classnames'
import Select from 'react-select'
import { Row, Col, Label, Card, Input, CardTitle, Button, CardBody, Form, FormGroup } from 'reactstrap'
import { useDispatch, useSelector } from "react-redux"
import { createContact } from "../../redux/actions/contact"
import { retrieveBusinessPartners } from "../../redux/actions/business-partner"
import { retrieveLanguages } from "../../redux/actions/language"
import { retrieveDesignations } from "../../redux/actions/designation"
import { Controller, useForm } from 'react-hook-form'
import { toast, Slide } from 'react-toastify'
import Avatar from '@components/avatar'
import ContactService from "../../services/ContactService"
import qs from "qs"
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Utils
import { selectThemeColors, isObjEmpty } from '@utils'
import { Link, useHistory } from 'react-router-dom'
import { Check } from "react-feather"

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import moment from "moment"

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

const CreateContactComponent = (props) => {
  const businessPartners = useSelector(state => state.businessPartners)
  const businessPartnerOptions = businessPartners.map(b => {
    return {value: b.BPRNUM_0, label: `${b.BPRNUM_0} (${b.BPRNAM_0})`}
  })

  const languages = useSelector(state => state.languages)
  const languageOptions = languages.map(b => {
    return {value: b.LAN_0, label: `${b.LAN_0} (${b.TEXTE_0})`}
  })

  const designations = useSelector(state => state.designations)
  const designationOptions = designations.map(b => {
    return {value: b.LANNUM_0, label: b.LANMES_0}
  })

  const dispatch = useDispatch()
  const history = useHistory()

  const initialContactState = {
    id: '',
    x3user: '',
    concode: '',
    fname: '',
    lname: '',
    email: '',
    telephone: '',
    fax: '',
    mobile: '',
    language: '',
    designation: '',
    dob: null
  }
  const [contact, setContact] = useState(initialContactState)
  const [code, setCode] = useState(Math.floor((Math.random() * (999 - 100 + 1)) + 100))

  const { register, errors, handleSubmit, control, setValue } = useForm({
    defaultValues: initialContactState
  })

  const getContactDetail = (id, cust) => {
    ContactService.get(id, cust)
      .then(response => {
        setContact({
          id: response.data.ROWID,
          x3user: response.data.BPANUM_0,
          concode: response.data.CCNCRM_0,
          fname: response.data.CNTFNA_0,
          lname: response.data.CNTLNA_0,
          email: response.data.WEB_0,
          telephone: response.data.TEL_0,
          mobile: response.data.MOB_0,
          fax: response.data.FAX_0,
          language: response.data.CNTLAN_0,
          designation: response.data.CNTFNC_0,
          dob: new Date(response.data.CNTBIR_0)
        })
        setValue('dob', new Date(response.data.CNTBIR_0))
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    const queryPramas = qs.parse(props.location.search, { ignoreQueryPrefix: true })
    const contactId = props.match.params.id
    if (contactId) {
      getContactDetail(contactId, queryPramas.customer)
    }
    dispatch(retrieveBusinessPartners())
    dispatch(retrieveLanguages())
    dispatch(retrieveDesignations())
  }, [])

  const [isSubmitted, setSubmitted] = useState(false)

  const handleInputChange = event => {
    const { name, value } = event.target
    if (!contact.id && name === 'lname') {
      const concode = `${contact.x3user.substring(0, 5)}${value.toUpperCase().substring(0, 4)}${code}`
      setContact({ ...contact, [name]: value, concode})
    } else {
      setContact({ ...contact, [name]: value })
    }
  }

  const setX3User = event => {
    if (event.value) {
      if (contact.lname) {
        const concode = `${event.value.substring(0, 5)}${contact.lname.toUpperCase().substring(0, 4)}${code}`
        setContact({ ...contact, ['x3user']: event.value, concode})
      } else {
        setContact({ ...contact, ['x3user']: event.value })
      }
    } else {
      setContact({ ...contact, ['x3user']: '' })
    }
  }

  const setLanguage = event => {
    setContact({ ...contact, ['language']: event ? event.value : '' })
  }

  const setDesignation = event => {
    setContact({ ...contact, ['designation']: event ? event.value : '' })
  }

  const onSubmit = () => {
    setSubmitted(true)
    if (isObjEmpty(errors) && contact.concode) {
      if (contact.id) {
        return mySwal.fire({
          title: 'Are you sure?',
          text: "You won't to update this contact!",
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
            dispatch(createContact(contact))
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
        dispatch(createContact(contact))
        .then(data => {
          if (data && data.success) {
            history.push('/admin/contact')
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
      <CardTitle tag='h4'>{contact.id ? 'UPDATE CONTACT' : 'CREATE CONTACT'}</CardTitle>
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
                        placeholder='Select User'
                        options={businessPartnerOptions}
                        isDisabled={contact.id}
                        isClearable
                        value={businessPartnerOptions.filter(b => b.value === contact.x3user)}
                        onChange={setX3User}
                        className={classnames('react-select', { 'is-invalid': isSubmitted && contact.x3user === '' })}
                        innerRef={register({ required: true, validate: value => value !== '' })}
                      />
                    </FormGroup>
                  </Col>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='fname'>First Name <span className='text-danger'>*</span></Label>
                      <Input
                        name='fname'
                        id='fname'
                        value={contact.fname}
                        onChange={handleInputChange}
                        className={classnames({ 'is-invalid': errors['fname'] })}
                        innerRef={register({ required: true, validate: value => value !== '' })}
                      />
                    </FormGroup>
                  </Col>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='lname'>Last Name <span className='text-danger'>*</span></Label>
                      <Input
                        name='lname'
                        id='lname'
                        value={contact.lname}
                        onChange={handleInputChange}
                        className={classnames({ 'is-invalid': errors['lname'] })}
                        innerRef={register({ required: true, validate: value => value !== '' })}
                      />
                    </FormGroup>
                  </Col>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='email'>Email <span className='text-danger'>*</span></Label>
                      <Input
                        name='email'
                        id='email'
                        value={contact.email}
                        onChange={handleInputChange}
                        className={classnames({ 'is-invalid': errors['email'] })}
                        innerRef={register({ required: true, validate: value => value !== '' })}
                      />
                    </FormGroup>
                  </Col>
                  {/* <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='telephone'>Telephone <span className='text-danger'>*</span></Label>
                      <Input
                        type='number'
                        name='telephone'
                        id='telephone'
                        maxLength='15'
                        value={contact.telephone}
                        onChange={handleInputChange}
                        className={classnames({ 'is-invalid': errors['telephone'] })}
                        innerRef={register({ required: true, maxLength: 15, validate: value => value !== '' })}
                      />
                    </FormGroup>
                  </Col>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='fax'>FAX <span className='text-danger'>*</span></Label>
                      <Input
                        type='number'
                        name='fax'
                        id='fax'
                        maxLength='15'
                        value={contact.fax}
                        onChange={handleInputChange}
                        className={classnames({ 'is-invalid': errors['fax'] })}
                        innerRef={register({ required: true, maxLength: 15, validate: value => value !== '' })}
                      />
                    </FormGroup>
                  </Col>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='mobile'>Mobile <span className='text-danger'>*</span></Label>
                      <Input
                        type='number'
                        name='mobile'
                        id='mobile'
                        maxLength='15'
                        value={contact.mobile}
                        onChange={handleInputChange}
                        className={classnames({ 'is-invalid': errors['mobile'] })}
                        innerRef={register({ required: true, maxLength: 15, validate: value => value !== '' })}
                      />
                    </FormGroup>
                  </Col>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='dob'>DOB <span className='text-danger'>*</span></Label>
                      <Controller
                        id='dob'
                        control={control}
                        name='dob'
                        defaultValue={contact.dob}
                        render={({value, name, ref}) => (
                          <Flatpickr
                            value={value}
                            onChange={(dob) => setContact({...contact, ['dob']:moment(new Date(dob)).format('YYYY-MM-DD') })}
                            options={{
                              dateFormat: 'm-d-Y',
                              maxDate: 'today'
                            }}
                            className={classnames('form-control', {
                              'is-invalid': isSubmitted && !contact.dob
                            })}
                          />
                        )}
                      />
                    </FormGroup>
                  </Col> */}
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='concode'>Contact Code <span className='text-danger'>*</span></Label>
                      <Input
                        name='concode'
                        id='concode'
                        value={contact.concode}
                        onChange={handleInputChange}
                        readOnly={true}
                        className={classnames({ 'is-invalid': errors['concode'] })}
                        innerRef={register({ required: true, validate: value => value !== '' })}
                      />
                    </FormGroup>
                  </Col>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='language'>Language <span className='text-danger'>*</span></Label>
                      <Select
                        id='language'
                        theme={selectThemeColors}
                        classNamePrefix='select'
                        name='language'
                        placeholder='Select Language'
                        options={languageOptions}
                        isClearable
                        value={languageOptions.filter(b => b.value === contact.language)}
                        onChange={setLanguage}
                        className={classnames('react-select', { 'is-invalid': isSubmitted && contact.language === '' })}
                        innerRef={register({ required: true, validate: value => value !== '' })}
                      />
                    </FormGroup>
                  </Col>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='designation'>Designation <span className='text-danger'>*</span></Label>
                      <Select
                        id='designation'
                        theme={selectThemeColors}
                        classNamePrefix='select'
                        name='designation'
                        placeholder='Select Designation'
                        options={designationOptions}
                        isClearable
                        value={designationOptions.filter(b => b.value === contact.designation)}
                        onChange={setDesignation}
                        className={classnames('react-select', { 'is-invalid': isSubmitted && contact.designation === '' })}
                        innerRef={register({ required: true, validate: value => value !== '' })}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Button type='submit' onClick={() => setSubmitted(true)} className='mr-1' color='primary'>
              {contact.id ? 'Update' : 'Create'}
            </Button>
            {/* <Button type='reset' color='secondary' className='mr-1' outline tag={Link} to='/users'>Cancel</Button> */}
            <Button type='button' color='danger' outline tag={Link} to='/admin/contact'>Back</Button>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default CreateContactComponent
