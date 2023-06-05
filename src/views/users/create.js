// ** React Imports// ** Third Party Components
import React, { useState, useEffect, Fragment } from "react"
import classnames from 'classnames'
import Select from 'react-select'
import { Row, Col, Label, Card, Input, CardTitle, Button, CardBody, Form, FormGroup, CustomInput, FormFeedback, CardHeader, UncontrolledTooltip } from 'reactstrap'
import { useDispatch, useSelector } from "react-redux"
import { createUser } from "../../redux/actions/user"
import { retrieveCustomers, retrieveCustomerConCode } from "../../redux/actions/customer"
import { retrieveSuppliers, retrieveSupplierConCode } from "../../redux/actions/supplier"
import { retrieveSites } from "../../redux/actions/site"
import { useForm } from 'react-hook-form'
import { toast, Slide } from 'react-toastify'
import Avatar from '@components/avatar'
import InputPasswordToggle from '@components/input-password-toggle'
import UserDataService from "../../services/UserService"

// ** Utils
import { selectThemeColors, isObjEmpty } from '@utils'
import { Link, useHistory } from 'react-router-dom'
import { Check, Info } from "react-feather"

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from "axios"

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

const CreateUserComponent = (props) => {
  const customers = useSelector(state => state.customers)
  const customerConCodes = useSelector(state => state.customerConCodes)
  const suppliers = useSelector(state => state.suppliers)
  const supplierConCodes = useSelector(state => state.supplierConCodes)
  const sites = useSelector(state => state.sites)
  const roleOptions = [
    {value: 2, label: 'Customer'},
    {value: 3, label: 'Supplier'},
    {value: 4, label: 'Admin'}
  ]
  const supplierOptions = suppliers.map(s => {
    return {value: s.BPSNUM_0, label: `${s.BPSNUM_0} (${s.BPSNAM_0})`}
  })
  let supplierConCodeOptions = supplierConCodes.map(s => {
    if (s.CCNCRM_0) {
      return {value: s.CCNCRM_0, label: `${s.CCNCRM_0} - ${s.CNTLNA_0}`}
    }
  })
  supplierConCodeOptions = supplierConCodeOptions.length > 0 ? supplierConCodeOptions : []
  const customerOptions = customers.map(c => {
    return {value: c.BPCNUM_0, label: `${c.BPCNUM_0} (${c.BPCNAM_0})`}
  })
  let customerConCodeOptions = customerConCodes.map(c => {
    if (c.CCNCRM_0) {
      return {value: c.CCNCRM_0, label: `${c.CCNCRM_0} - ${c.CNTLNA_0}`}
    }
  })
  customerConCodeOptions = customerConCodeOptions.length > 0 ? customerConCodeOptions : []
  const siteOptions = sites.map(c => {
    return {value: c.FCY_0, label: `${c.FCY_0} (${c.FCYNAM_0})`}
  })
  const dispatch = useDispatch()
  const history = useHistory()

  const initialUserState = {
    id: '',
    role: '',
    x3user: '',
    concode: '',
    xlogin: '',
    site: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    seq: '',
    status: 2,
    salesOrder: 0,
    salesDelivery: 0,
    serviceRequest : 0,
    salesInvoice: 0,
    purchaseOrder: 0,
    purchaseReceipt: 0,
    purchaseInvoice: 0
  }
  const [user, setUser] = useState(initialUserState)

  const getUserDetail = id => {
    UserDataService.get(id)
      .then(response => {
        setUser({
          id: response.data.XLOGIN_0,
          name: response.data.XNAME_0,
          email: response.data.XMAIL_0,
          password: response.data.XPSWD_0,
          phone: response.data.XPHONE_0,
          role: response.data.X3ROLE_0,
          site: response.data.X3SITE_0,
          x3user: response.data.X3USER_0,
          concode: response.data.XCONCODE_0,
          xlogin: response.data.XLOGIN_0,
          seq: response.data.X3CONTSEQ_0,
          status: response.data.XACT_0,
          salesOrder: response.data.XSOH_0,
          serviceRequest : response.data.XSERVREQ_0,
          salesDelivery: response.data.XSDH_0,
          salesInvoice: response.data.XSIH_0,
          purchaseOrder: response.data.XPOH_0,
          purchaseReceipt: response.data.XPTH_0,
          purchaseInvoice: response.data.XPIH_0
        })
        if (response.data.X3ROLE_0 === 2) {
          dispatch(retrieveCustomerConCode(response.data.X3USER_0))
        } else if (response.data.X3ROLE_0 === 3) {
          dispatch(retrieveSupplierConCode(response.data.X3USER_0))
        }
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    const userId = props.match.params.id
    if (userId) {
      getUserDetail(userId)
    }
    dispatch(retrieveCustomers())
    dispatch(retrieveSuppliers())
    dispatch(retrieveSites())
  }, [])

  const { register, errors, handleSubmit, control } = useForm({
    defaultValues: initialUserState
  })

  const [isSubmitted, setSubmitted] = useState(false)

  const handleInputChange = event => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  const handleCheckboxChange = event => {
    const { name, checked } = event.target
    setUser({ ...user, [name]: checked ? 2 : 1 })
  }

  const setRole = event => {
    if (event && event.value === 4) {
      axios.get(`${process.env.REACT_APP_API_BASE_URL}/getAdminSeq`).then(res => {
        const loginId = `ADMIN${Math.floor(1000 + (Math.random() * 9000))}`
        setUser({...user, ['role']: event ? event.value : '', ['x3user']: 'Admin', ['concode']: 'Admin', ['xlogin']: loginId, ['seq']: res.data.SEQ, ['site']: 'Admin' })
      }).catch(err => {
        console.log(err)
      })
    } else {
      setUser({ ...user, ['role']: event ? event.value : '', ['x3user']: '', ['concode']: '', ['xlogin']: '', ['seq']: '' })
    }
  }

  const setConCode = event => {
    if (event && event.value) {
      let loginId = ''
      let selecedCode = {}
      if (user.role === 2) {
        selecedCode = customerConCodes.find(c => c.CCNCRM_0 === event.value)
      } else {
        selecedCode = supplierConCodes.find(s => s.CCNCRM_0 === event.value)
      }

      let seq = selecedCode.SEQ
      if (!selecedCode.SEQ) {
        loginId = `${event.value}01`
        seq = 1
      } else if (selecedCode.SEQ && selecedCode.SEQ < 10) {
        loginId = `${event.value}0${selecedCode.SEQ}`
      } else {
        loginId = `${event.value}${selecedCode.SEQ}`
      }

      setUser({ ...user, ['concode']: event ? event.value : '', ['xlogin']: loginId,  ['seq']: seq, ['email']: selecedCode.WEB_0, ['phone']: selecedCode.MOB_0, ['name']: `${selecedCode.CNTFNA_0} ${selecedCode.CNTLNA_0}`})
    } else {
      setUser({ ...user, ['concode']: '', ['xlogin']: '', ['seq']: '', ['email']: '', ['phone']: '', ['name']: '' })
    }
  }

  const setX3User = event => {
    if (event && event.value) {
      if (user.role === 2) {
        dispatch(retrieveCustomerConCode(event.value))
      } else if (user.role === 3) {
        dispatch(retrieveSupplierConCode(event.value))
      }
    }
    setUser({ ...user, ['x3user']: event ? event.value : '', ['concode']: '', ['xlogin']: ''  })
  }

  const setSite = event => {
      setUser({ ...user, ['site']: event ? event.value : '' })
    }


  const onSubmit = () => {
    setSubmitted(true)
    if (isObjEmpty(errors) && user.role && user.concode && user.x3user && user.site) {
      if (user.id) {
        return mySwal.fire({
          title: 'Are you sure?',
          text: "You won't to update this user!",
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
            dispatch(createUser(user))
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
        dispatch(createUser(user))
        .then(data => {
          if (data && data.success) {
            history.push('/admin/users')
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
      <CardTitle tag='h4'>{user.id ? 'UPDATE USER' : 'CREATE NEW USER'}</CardTitle>
      <Row>
        <Col sm='12'>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardBody className="pt-1">
                <Row>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='role'>Role <span className='text-danger'>*</span></Label>
                      <Select
                        id='role'
                        theme={selectThemeColors}
                        classNamePrefix='select'
                        name='role'
                        placeholder='Select Role'
                        options={roleOptions}
                        isDisabled={user.id}
                        isClearable
                        value={roleOptions.filter((role) => role.value === user.role)}
                        onChange={setRole}
                        className={classnames('react-select', { 'is-invalid': isSubmitted && user.role === '' })}
                        innerRef={register({ required: true, validate: value => value !== '' })}
                      />
                    </FormGroup>
                  </Col>
                  { user.role !== 4 ? (
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='x3user'>{user.role === 2 ? 'Customer' : 'Supplier'} <span className='text-danger'>*</span></Label>
                      <Select
                        id='x3user'
                        theme={selectThemeColors}
                        classNamePrefix='select'
                        name='x3user'
                        placeholder='Select User'
                        options={user.role === 2 ? customerOptions : supplierOptions}
                        isDisabled={user.id}
                        isClearable
                        value={user.role === 2 ? customerOptions.filter((customer) => customer.value === user.x3user) : supplierOptions.filter((supplier) => supplier.value === user.x3user)}
                        onChange={setX3User}
                        className={classnames('react-select', { 'is-invalid': isSubmitted && user.x3user === '' })}
                        innerRef={register({ required: true, validate: value => value !== '' })}
                      />
                    </FormGroup>
                  </Col>
                  ) : ''}
                  { user.role !== 4 ? (
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='contact'>Contact Code<span className='text-danger'>*</span></Label>
                      <Select
                        id='contact'
                        theme={selectThemeColors}
                        classNamePrefix='select'
                        name='contact'
                        placeholder='Select Contact Code'
                        options={user.role === 2 ? customerConCodeOptions : supplierConCodeOptions}
                        isDisabled={user.id}
                        isClearable
                        value={user.role === 2 ? customerConCodeOptions.filter((customer) => customer && customer.value === user.concode) : supplierConCodeOptions.filter((supplier) => supplier && supplier.value === user.concode)}
                        onChange={setConCode}
                        className={classnames('react-select', { 'is-invalid': isSubmitted && user.concode === '' })}
                        innerRef={register({ required: true, validate: value => value !== '' })}
                      />
                    </FormGroup>
                  </Col>
                  ) : ''}
                  { user.id ? (
                  <Col md='4' sm='12' className="mt-2">
                    <FormGroup className="d-flex align-items-center">
                      <Label for='status' className="mb-0 mr-1">Status</Label>
                      <CustomInput
                        className='custom-control-success'
                        type='switch'
                        id='status'
                        name='status'
                        inline
                        defaultChecked={ user.status === 2 }
                        onChange={handleCheckboxChange}
                      />
                    </FormGroup>
                  </Col>
                  ) : ''}
                </Row>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="pt-1">
                <Row>
                { user.role !== 4 ? (
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='site'>Site <span className='text-danger'>*</span></Label>
                      <Select
                        id='site'
                        theme={selectThemeColors}
                        classNamePrefix='select'
                        name='site'
                        placeholder='Select Site'
                        options={siteOptions}
                        isClearable
                        value={siteOptions.filter((site) => site.value === user.site)}
                        isDisabled={user.id}
                        onChange={setSite}
                        className={classnames('react-select', { 'is-invalid': isSubmitted && user.site === '' })}
                        innerRef={register({ required: true, validate: value => value !== '' })}
                      />
                    </FormGroup>
                  </Col>
                  ) : ''}
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='xlogin'>Login ID <span className='text-danger'></span></Label>
                      <Input
                        name='xlogin'
                        id='xlogin'
                        value={user.xlogin}
                        disabled={true}
                      />
                    </FormGroup>
                  </Col>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='password'>Password <span className='text-danger pr-1'>*</span>
                        <Info size={16} id='infoIcon' />
                        <UncontrolledTooltip placement="top" target="infoIcon">
                        Minimum eight characters, at least one letter, one number and one special character
                        </UncontrolledTooltip>
                      </Label>
                      <InputPasswordToggle
                        value={user.password}
                        name='password'
                        id='password'
                        onChange={handleInputChange}
                        className={classnames('input-group-merge', { 'is-invalid': errors['password'] })}
                        innerRef={register({ 
                          required: true,
                          pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                            message: "Minimum eight characters, at least one letter, one number and one special character"
                          },
                          validate: value => value !== '' })}
                      />
                      {/* <Input
                        type='password'
                        name='password'
                        id='password'
                        value={user.password}
                        onChange={handleInputChange}
                        className={classnames({ 'is-invalid': errors['password'] })}
                        innerRef={register({ 
                          required: true,
                          pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                            message: "Minimum eight characters, at least one letter, one number and one special character"
                          },
                          validate: value => value !== '' })}
                      /> */}
                      {errors && errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
                    </FormGroup>
                  </Col>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='name'>Full Name <span className='text-danger'>*</span></Label>
                      <Input
                        name='name'
                        id='name'
                        value={user.name}
                        onChange={handleInputChange}
                        className={classnames({ 'is-invalid': errors['name'] })}
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
                        value={user.email}
                        onChange={handleInputChange}
                        className={classnames({ 'is-invalid': errors['email'] })}
                        innerRef={register({ required: true, validate: value => value !== '' })}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            { user.role && user.role !== '' ? (
              <Card>
                <CardBody className="pt-1">
                  <h5 className="text-medium mb-2">Allow Access</h5>
                  <Row>
                    { user.role === 2 ? (
                      <Col sm='12'>
                        <FormGroup>
                                                  <CustomInput
                                                    inline
                                                    type='checkbox'
                                                    id='serviceRequest'
                                                    name="serviceRequest"
                                                    label='Service Request'
                                                    checked={user.serviceRequest === 2}
                                                    innerRef={register}
                                                    onChange={handleCheckboxChange}
                                                  />
                                                </FormGroup>
                        <FormGroup>
                          <CustomInput
                            inline
                            type='checkbox'
                            id='salesOrder'
                            name="salesOrder"
                            label='Sales Order'
                            checked={user.salesOrder === 2}
                            innerRef={register}
                            onChange={handleCheckboxChange}
                          />
                        </FormGroup>
                        <FormGroup>
                          <CustomInput
                            inline
                            type='checkbox'
                            id='salesDelivery'
                            name="salesDelivery"
                            label='Sales Delivery'
                            checked={user.salesDelivery === 2}
                            innerRef={register}
                            onChange={handleCheckboxChange}
                          />
                        </FormGroup>
                        <FormGroup>
                          <CustomInput
                            inline
                            type='checkbox'
                            id='salesInvoice'
                            name="salesInvoice"
                            label='Sales Invoice'
                            checked={user.salesInvoice === 2}
                            innerRef={register}
                            onChange={handleCheckboxChange}
                          />
                        </FormGroup>
                      </Col>
                    ) : '' }
                    { user.role === 3 ? (
                      <Col sm='12'>
                        <FormGroup>
                          <CustomInput
                            inline
                            type='checkbox'
                            id='purchaseOrder'
                            name="purchaseOrder"
                            label='Purchase Order'
                            checked={user.purchaseOrder === 2}
                            innerRef={register}
                            onChange={handleCheckboxChange}
                          />
                        </FormGroup>
                        <FormGroup>
                          <CustomInput
                            inline
                            type='checkbox'
                            id='purchaseReceipt'
                            name="purchaseReceipt"
                            label='Purchase Receipt'
                            checked={user.purchaseReceipt === 2}
                            innerRef={register}
                            onChange={handleCheckboxChange}
                          />
                        </FormGroup>
                        <FormGroup>
                          <CustomInput
                            inline
                            type='checkbox'
                            id='purchaseInvoice'
                            name="purchaseInvoice"
                            label='Purchase Invoice'
                            checked={user.purchaseInvoice === 2}
                            innerRef={register}
                            onChange={handleCheckboxChange}
                          />
                        </FormGroup>
                      </Col>
                    ) : '' }
                  </Row>
                </CardBody>
              </Card>
            ) : '' }
            <Button type='submit' onClick={() => setSubmitted(true)} className='mr-1' color='primary'>
              {user.id ? 'Update' : 'Create'}
            </Button>
            {/* <Button type='reset' color='secondary' className='mr-1' outline tag={Link} to='/users'>Cancel</Button> */}
            <Button type='button' color='danger' outline tag={Link} to='/admin/users'>Back</Button>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default CreateUserComponent
