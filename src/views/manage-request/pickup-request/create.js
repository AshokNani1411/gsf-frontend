// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import Repeater from '@components/repeater'
import { Check, Plus, Trash2 } from 'react-feather'
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'

import { useDispatch, useSelector } from "react-redux"
import { retrieveProducts } from "../../../redux/actions/product"
import { createPickupRequest } from "../../../redux/actions/pickup-request"
import { retrieveAddresses, retrieveCarriers, retrieveDeliveryModes } from "../../../redux/actions/common"

// ** Third Party Components
import Select from 'react-select'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { Row, Col, Label, Card, Input, CardHeader, CardTitle, Button, CardBody, Form, FormGroup, TabContent, TabPane, Nav, NavItem, NavLink, CustomInput, Alert } from 'reactstrap'

import Avatar from '@components/avatar'

import { useForm, Controller } from 'react-hook-form'

// ** Utils
import { selectThemeColors, isObjEmpty } from '@utils'
import { Link, useHistory } from 'react-router-dom'

import PickupRequestDataService from "../../../services/PickupRequestService"
import classnames from 'classnames'
import moment from 'moment'
import { toast, Slide } from 'react-toastify'

const ToastContent = ({header, message, color}) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color={color} icon={<Check size={12} />} />
        <h6 className='toast-title font-weight-bold'>{header}!</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>{message}</span>
    </div>
  </Fragment>
)

const CreatePickupRequestComponent = (props) => {
  const products = useSelector(state => state.products)
  const productOptions = products.map(p => {
    return {value: p.ITMREF_0, label: `${p.ITMREF_0} (${p.ITMDES1_0})`}
  })

  const addresses = useSelector(state => state.addresses)
  const addressOptions = addresses?.map(a => {
    return {value: a.BPAADD_0, label: `${a.BPAADD_0} (${a.BPADES_0})`}
  })

  const carriers = useSelector(state => state.carriers)
  const carrierOptions = carriers?.map(c => {
    return {value: c.BPTNUM_0, label: `${c.BPTNUM_0} (${c.BPTNAM_0})`}
  })

  const deliveryModes = useSelector(state => state.deliveryModes)
  const deliveryModeOptions = deliveryModes?.map(d => {
    return {value: d.MDL_0, label: `${d.MDL_0} (${d.TEXTE_0})`}
  })

  // ** State
  const [count, setCount] = useState(1)
  const [attachmentcount, setAttachmentCount] = useState(1)
  const [active, setActive] = useState('1')
  const [isAccepted, setIsAccepted] = useState(false)
  const user = JSON.parse(localStorage.getItem('userData'))
  const dispatch = useDispatch()
  const history = useHistory()

  const emptyProduct = {
    id: '',
    product_code: '',
    description: '',
    sau: '',
    price: '',
    quantity: '',
    line_amount: ''
  }

  const initialState = {
    id: '',
    site: `${user.X3SITE_0} (${user.FCYNAM_0})`,
    date: new Date(),
    reference: '',
    customer: `${user.X3USER_0} (${user.XNAME_0})`,
    currency: user.CUR_0,
    status: 'Open',
    pickup_type: 'Purchase Receipt',
    comment: '',
    exchange: 1,
    address: '',
    carrier: '',
    delivery_mode: '',
    products: [emptyProduct]
  }

  const [pickupRequest, setPickupRequest] = useState(initialState)

  const increaseCount = () => {
    setCount(count + 1)
    pickupRequest.products.push(emptyProduct)
  }

  const { register, errors, handleSubmit, control, setValue } = useForm({
    defaultValues: initialState
  })

  const getPickupRequestDetail = id => {
    PickupRequestDataService.get(id)
      .then(response => {
        setPickupRequest({
          id: response.data.XPICKID_0,
          site: `${user.X3SITE_0} (${user.FCYNAM_0})`,
          date: new Date(response.data.ORDDAT_0),
          reference: response.data.ORDREF_0,
          customer: `${user.X3USER_0} (${user.XNAME_0})`,
          currency: response.data.CUR_0,
          status: 'Open',
          pickup_type: 'Purchase Receipt',
          comment: response.data.XCOMMENT_0,
          exchange: response.data.XEXCHNG_0,
          address: response.data.XADDCOD_0,
          carrier: response.data.XBPTNUM_0,
          delivery_mode: response.data.XMDL_0,
          products: response.data.products
        })
        setValue('date', new Date(response.data.ORDDAT_0))
        setValue('products[0].product_code', response.data.products[0].product_code)
        setCount(response.data.products.length)
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    dispatch(retrieveProducts(user.X3SITE_0))
    const pickupReqId = props.match.params.id
    if (pickupReqId) {
      getPickupRequestDetail(pickupReqId)
    }
    dispatch(retrieveAddresses(user.X3USER_0, 'supplier'))
    dispatch(retrieveCarriers())
    dispatch(retrieveDeliveryModes())
  }, [])

  const [isSubmitted, setSubmitted] = useState(false)

  const increaseAttachmentCount = () => {
    setAttachmentCount(attachmentcount + 1)
  }

  const handleInputChange = event => {
    const { name, value } = event.target
    setPickupRequest({ ...pickupRequest, [name]: value })
  }
  
  const handleCheckboxChange = event => {
    const { name, checked } = event.target
    setPickupRequest({ ...pickupRequest, [name]: checked ? 2 : 1 })
  }

  const toggle = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  const setAddress = event => {
    setPickupRequest({ ...pickupRequest, ['address']: event ? event.value : '' })
  }

  const setCarrier = event => {
    setPickupRequest({ ...pickupRequest, ['carrier']: event ? event.value : '' })
  }

  const setDeliveryMode = event => {
    setPickupRequest({ ...pickupRequest, ['delivery_mode']: event ? event.value : '' })
  }

  const updateProduct = index => (event) => {
    const selectedProduct = products.find(p => p.ITMREF_0 === event.value)
    const tempProducts = pickupRequest.products.map((product, pIndex) => {
      if (pIndex === index) {
        return {...product, product_code: event.value, description: selectedProduct.ITMDES1_0, sau: selectedProduct.SAU_0}
      }
      return product
    })
    setPickupRequest({...pickupRequest, products: tempProducts})
  }

  const onPriceChange = index => event => {
    const tempProducts = pickupRequest.products.map((product, pIndex) => {
      if (pIndex === index) {
        return {...product, price: event.target.value, line_amount: product.quantity > 0 ? event.target.value * product.quantity : 0}
      }
      return product
    })
    setPickupRequest({...pickupRequest, products: tempProducts})
  }

  const onQtyChange = index => event => {
    const tempProducts = pickupRequest.products.map((product, pIndex) => {
      if (pIndex === index) {
        return {...product, quantity: event.target.value, line_amount: product.price > 0 ? event.target.value * product.price : 0}
      }
      return product
    })
    setPickupRequest({...pickupRequest, products: tempProducts})
  }

  const deleteForm = index => (e) => {
    e.preventDefault()
    const tempProducts =  pickupRequest.products.filter((p, pIndex) => pIndex !== index)
    setPickupRequest({...pickupRequest, products: tempProducts})
    setCount(count - 1)
  }

  const onAcceptTerms = (isAccept) => {
    setIsAccepted(isAccept)
  }

  const onSubmit = () => {
    setSubmitted(true)
    if (!isAccepted) {
      toast.warning(
        <ToastContent header='Warning' message='Please accept Terms & Conditions' color='warning' />,
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )
    }
    if (isObjEmpty(errors) && isAccepted && pickupRequest.address && pickupRequest.carrier && pickupRequest.delivery_mode) {
      let totalAmt = 0
      let totalQty = 0
      pickupRequest.products.map(p => {
        totalAmt += p.line_amount
        totalQty += Number(p.quantity)
      })
      const params = {...pickupRequest, total_amt: totalAmt, total_qty: totalQty}
      dispatch(createPickupRequest(params))
        .then(data => {
          history.push('/supplier/manage-request/pickup-request')
          toast.success(
            <ToastContent header='Success' message={data.message} color='success' />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
          )
        })
        .catch(e => {
          console.log(e)
        })
    }
  }

  return (
    <div className="w-100">
      <Row>
        <Col sm='12'>
          <Card>
            <CardHeader className='border-bottom'>
              <CardTitle tag='h4'>CREATE PICKUP REQUEST</CardTitle>
            </CardHeader>
            <CardBody className="pt-1">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='site'>Site</Label>
                      <Input
                        name='site'
                        id='site'
                        value={pickupRequest.site}
                        readOnly
                        innerRef={register}
                      />
                    </FormGroup>
                  </Col>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='date'>Date <span className='text-danger'>*</span></Label>
                      <Controller
                        id='date'
                        control={control}
                        name='date'
                        defaultValue={pickupRequest.date}
                        render={({value, name, ref}) => (
                          <Flatpickr
                            value={value}
                            onChange={(date) => setPickupRequest({...pickupRequest, ['date']: moment(new Date(date)).format('YYYY-MM-DD') })}
                            options={{
                              dateFormat: 'm-d-Y',
                              minDate: 'today'
                            }}
                            className={classnames('form-control', {
                              'is-invalid': !pickupRequest.date
                            })}
                          />
                        )}
                      />
                    </FormGroup>
                  </Col>
                  <Col md='4' sm='12'>
                  <FormGroup>
                      <Label for='reference'>Reference</Label>
                      <Input
                        name='reference'
                        id='reference'
                        value={pickupRequest && pickupRequest.reference}
                        onChange={handleInputChange}
                        className={classnames({ 'is-invalid': errors['reference'] })}
                        innerRef={register({ required: true, validate: value => value !== '' })}
                      />
                    </FormGroup>
                  </Col>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='supplier'>Supplier</Label>
                      <Input
                        name='customer'
                        id='customer'
                        value={pickupRequest.user}
                        readOnly
                        innerRef={register}
                      />
                    </FormGroup>
                  </Col>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='status'>Status</Label>
                      <Input
                        name='status'
                        id='status'
                        value={pickupRequest.status}
                        readOnly
                        innerRef={register}
                      />
                    </FormGroup>
                  </Col>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='type'>Pickup Type</Label>
                      <Input
                        name='type'
                        id='type'
                        value={pickupRequest.pickup_type}
                        readOnly
                        innerRef={register}
                      />
                    </FormGroup>
                  </Col>
                  {/* <Col md='4' sm='12'>
                    <FormGroup>
                      <CustomInput
                        inline
                        type='checkbox'
                        id='exchange'
                        name="exchange"
                        label='Exchange'
                        checked={pickupRequest.exchange === 2}
                        innerRef={register}
                        onChange={handleCheckboxChange}
                      />
                    </FormGroup>
                  </Col> */}
                </Row>
                <hr className='mt-0' />
                <h4>Ship To</h4>
                <Row>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='address'>Address <span className='text-danger'>*</span></Label>
                      <Select
                        id='address'
                        theme={selectThemeColors}
                        classNamePrefix='select'
                        name='address'
                        placeholder='Select Address'
                        options={addressOptions}
                        isClearable
                        value={addressOptions.filter((a) => a.value === pickupRequest.address)}
                        onChange={setAddress}
                        className={classnames('react-select', { 'is-invalid': isSubmitted && pickupRequest.address === '' })}
                        innerRef={register({ required: true, validate: value => value !== '' })}
                      />
                    </FormGroup>
                  </Col>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='carrier'>Carrier <span className='text-danger'>*</span></Label>
                      <Select
                        id='carrier'
                        theme={selectThemeColors}
                        classNamePrefix='select'
                        name='carrier'
                        placeholder='Select Carrier'
                        options={carrierOptions}
                        isClearable
                        value={carrierOptions.filter((c) => c.value === pickupRequest.carrier)}
                        onChange={setCarrier}
                        className={classnames('react-select', { 'is-invalid': isSubmitted && pickupRequest.carrier === '' })}
                        innerRef={register({ required: true, validate: value => value !== '' })}
                      />
                    </FormGroup>
                  </Col>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='deliverymode'>Delivery Method <span className='text-danger'>*</span></Label>
                      <Select
                        id='deliverymode'
                        theme={selectThemeColors}
                        classNamePrefix='select'
                        name='delivery_mode'
                        placeholder='Select Delivery Method'
                        options={deliveryModeOptions}
                        isClearable
                        value={deliveryModeOptions.filter((d) => d.value === pickupRequest.delivery_mode)}
                        onChange={setDeliveryMode}
                        className={classnames('react-select', { 'is-invalid': isSubmitted && pickupRequest.delivery_mode === '' })}
                        innerRef={register({ required: true, validate: value => value !== '' })}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <hr className='mt-0' />
                <div className='d-flex justify-content-between align-items-center'>
                  <h4 className='mb-0'>Products</h4>
                  <Button.Ripple className='btn-icon' color='primary' onClick={increaseCount}>
                    <Plus size={14} />
                    <span className='align-middle ml-25'>Add New</span>
                  </Button.Ripple>
                </div>
                <hr />
                <Repeater count={count}>
                  {i => {
                    const Tag = i === 0 ? 'div' : SlideDown
                    const fieldName = `products[${i}]`
                    return (
                      <div id={`product-${i}`} key={i}>
                        <fieldset name={fieldName} key={fieldName}>
                          <Tag key={i}>
                            <Row className='justify-content-between align-items-center'>
                              <Col md={3}>
                                <FormGroup>
                                  <Label for={`animation-product-code-${i}`}>Product Code</Label>
                                  <Controller
                                    id={`animation-product-code-${i}`}
                                    control={control}
                                    defaultValue={pickupRequest.products[i] ? pickupRequest.products[i].product_code : ''}
                                    name={`${fieldName}.product_code`}
                                    render={({value, name, ref}) => (
                                      <Select
                                        inputRef={ref}
                                        isClearable
                                        options={productOptions}
                                        onChange={updateProduct(i)}
                                        value={productOptions.find(c => c.value === value)}
                                        placeholder='Choose Product'
                                        className={classnames('react-select', { 'is-invalid': errors['products'] && errors['products'][i].product_code })}
                                        classNamePrefix='select'
                                        theme={selectThemeColors}
                                      />
                                    )}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md={3}>
                                <FormGroup>
                                  <Label for={`animation-description-${i}`}>Description</Label>
                                  <Input
                                    type='text' 
                                    id={`animation-description-${i}`}
                                    name={`${fieldName}.description`}
                                    value={pickupRequest.products[i] ? pickupRequest.products[i].description : ''}
                                    readOnly
                                    innerRef={register}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md={1}>
                                <FormGroup>
                                  <Label for={`animation-uom-${i}`}>UOM</Label>
                                  <Input
                                    id={`animation-uom-${i}`}
                                    name={`${fieldName}.sau`}
                                    value={pickupRequest.products[i] ? pickupRequest.products[i].sau : ''}
                                    innerRef={register}
                                    readOnly
                                  />
                                </FormGroup>
                              </Col>
                              <Col md={1}>
                                <FormGroup>
                                  <Label for={`animation-price-${i}`}>Price</Label>
                                  <Input 
                                    type='number'
                                    id={`animation-price-${i}`}
                                    placeholder='0.00'
                                    value={pickupRequest.products[i] ? pickupRequest.products[i].price : ''}
                                    name={`${fieldName}.price`}
                                    innerRef={register({ required: true, validate: value => value !== '' })}
                                    className={classnames({ 'is-invalid': errors['products'] && errors['products'][i].price })}
                                    onChange={onPriceChange(i)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md={1}>
                                <FormGroup>
                                  <Label for={`animation-quantity-${i}`}>Quantity</Label>
                                  <Input
                                    type='number'
                                    id={`animation-quantity-${i}`}
                                    placeholder='1'
                                    name={`${fieldName}.quantity`}
                                    value={pickupRequest.products[i] ? pickupRequest.products[i].quantity : ''}
                                    className={classnames({ 'is-invalid': errors['products'] && errors['products'][i].quantity })}
                                    innerRef={register({ required: true, validate: value => value !== '' })}
                                    onChange={onQtyChange(i)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md={1}>
                                <FormGroup>
                                  <Label for={`animation-price-${i}`}>Line Amount</Label>
                                  <Input
                                    type='number'
                                    id={`animation-price-${i}`}
                                    placeholder='0.00'
                                    value={pickupRequest.products[i] ? pickupRequest.products[i].line_amount : ''}
                                    readOnly
                                  />
                                </FormGroup>
                              </Col>
                              <Col md={1}>
                                <Button.Ripple className='btn-icon rounded-circle' color='flat-danger' onClick={deleteForm(i)}>
                                  <Trash2 size={16} />
                                </Button.Ripple>
                              </Col>
                              <Col sm={12}>
                                <hr />
                              </Col>
                            </Row>
                          </Tag>
                        </fieldset>
                      </div>
                    )
                  }}
                </Repeater>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for='comment'>Comment</Label>
                      <Input
                        type='textarea'
                        name='comment'
                        rows='3'
                        id='comment'
                        value={pickupRequest.comment}
                        onChange={handleInputChange}
                        innerRef={register}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <Alert color='secondary'>
                      <h4 className='alert-heading'>Terms & Conditions</h4>
                      <div className='alert-body'>
                        <ul className="m-0 pl-1">
                          <li>Once Order confirmed, can't be modified</li>
                          <li>Please cross check products and quantity before Confirmation</li>
                          <li>Delivery Address is same as the Customer address shown in the User Info application.</li>
                        </ul>
                      </div>
                    </Alert>
                    <FormGroup>
                      <CustomInput inline 
                        type='checkbox' 
                        id='exampleCustomCheckbox2' 
                        label='I accept the above Terms & Conditions' 
                        onChange={(e) => onAcceptTerms(e.target.checked)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <hr />
                <Button type='submit' onClick={() => setSubmitted(true)} className='mr-1' color='primary'>
                  Submit
                </Button>
                <Button type='reset' color='secondary' outline tag={Link} to='/supplier/manage-request/pickup-request'>
                  Cancel
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default CreatePickupRequestComponent
