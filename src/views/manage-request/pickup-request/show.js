// ** React Imports
import { useState, useEffect } from 'react'
import Repeater from '@components/repeater'
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'

import { useDispatch, useSelector } from "react-redux"
import { retrieveProducts } from "../../../redux/actions/product"
import { retrieveAddresses, retrieveCarriers, retrieveDeliveryModes } from "../../../redux/actions/common"

// ** Third Party Components
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { Row, Col, Label, Card, Input, CardHeader, CardTitle, Button, CardBody, Form, FormGroup } from 'reactstrap'

import { useForm } from 'react-hook-form'

// ** Utils
import { Link } from 'react-router-dom'

import PickupRequestDataService from "../../../services/PickupRequestService"
import moment from 'moment'

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
  const user = JSON.parse(localStorage.getItem('userData'))
  const dispatch = useDispatch()

  const status = {
    0: 'Confirmed',
    1: 'To Confirm',
    2: 'Order Generated',
    3: 'Open',
    3: 'Cancelled'
  }

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
    site: user.X3SITE_0,
    date: new Date(),
    reference: '',
    customer: user.X3USER_0,
    currency: user.CUR_0,
    status: 'Open',
    pickup_type: 'Purchase Receipt',
    comment: '',
    address: '',
    carrier: '',
    delivery_mode: '',
    exchange: 1,
    products: [emptyProduct]
  }

  const [pickupRequest, setPickupRequest] = useState(initialState)

  const { setValue } = useForm({
    defaultValues: initialState
  })

  const getPickupRequestDetail = id => {
    PickupRequestDataService.get(id)
      .then(response => {
        setPickupRequest({
          id: response.data.XPICKID_0,
          site: `${response.data.POHFCY_0} (${response.data.FCYNAM_0})`,
          date: new Date(response.data.ORDDAT_0),
          reference: response.data.ORDREF_0,
          customer: `${response.data.BPSNUM_0} (${response.data.BPRNAM_0})`,
          currency: response.data.CUR_0,
          status: `${status[response.data.XPOHFLG_0]}`,
          pickup_type: 'Purchase Receipt',
          comment: response.data.XCOMMENT_0,
          address: response.data.XADDCOD_0,
          carrier: response.data.XBPTNUM_0,
          delivery_mode: response.data.XMDL_0,
          exchange: response.data.XEXCHNG_0,
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

  const toggle = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  const getProduct = (code) => {
    const product = productOptions.find(p => p.value === code)
    return product ? product.label : ''
  }

  const getAddress = (code) => {
    const address = addressOptions.find(p => p.value === code)
    return address ? address.label : ''
  }

  const getCarrier = (code) => {
    const carrier = carrierOptions.find(p => p.value === code)
    return carrier ? carrier.label : ''
  }

  const getMode = (code) => {
    const mode = deliveryModeOptions.find(p => p.value === code)
    return mode ? mode.label : ''
  }

  return (
    <div className="w-100">
      <Row>
        <Col sm='12'>
          <Card>
            <CardHeader className='border-bottom'>
              <CardTitle tag='h4'>PICKUP REQUEST</CardTitle>
            </CardHeader>
            <CardBody className="pt-1">
              <Form>
                <Row>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='site'>Site</Label>
                      <Input
                        name='site'
                        id='site'
                        value={pickupRequest.site}
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='date'>Date</Label>
                      <Input
                        name='date'
                        id='date'
                        value={moment(pickupRequest.date).format('MM/DD/YYYY')}
                        disabled
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
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='supplier'>Supplier</Label>
                      <Input
                        name='customer'
                        id='customer'
                        value={pickupRequest.customer}
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
                      />
                    </FormGroup>
                  </Col> */}
                </Row>
                <hr className='mt-0' />
                <div className='d-flex justify-content-between align-items-center'>
                  <h4 className='mb-0'>Ship To</h4>
                </div>
                <hr />
                <Row>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='address'>Address</Label>
                      <Input
                        name='address'
                        id='address'
                        value={getAddress(pickupRequest.address)}
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='carrier'>Carrier</Label>
                      <Input
                        name='carrier'
                        id='carrier'
                        value={getCarrier(pickupRequest.carrier)}
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='deliveryMode'>Delivery Method</Label>
                      <Input
                        name='delivery_mode'
                        id='deliveryMode'
                        value={getMode(pickupRequest.delivery_mode)}
                        disabled
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <hr />
                <div className='d-flex justify-content-between align-items-center'>
                  <h4 className='mb-0'>Products</h4>
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
                                  <Input
                                    type='text' 
                                    id={`animation-product-code-${i}`}
                                    name={`${fieldName}.product_code`}
                                    value={pickupRequest.products[i] ? getProduct(pickupRequest.products[i].product_code) : ''}
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
                                  />
                                </FormGroup>
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
                        disabled
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <hr />
                <Button type='button' color='secondary' outline tag={Link} to='/supplier/manage-request/pickup-request'>
                  Back
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
