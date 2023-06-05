// ** React Imports
import { useState, useEffect, Fragment, useRef } from 'react'
import Repeater from '@components/repeater'
import { Check, Plus, Trash2 } from 'react-feather'
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'

import { useDispatch, useSelector } from "react-redux"
import { retrieveProducts } from "../../../redux/actions/product"
import { createDropRequest } from "../../../redux/actions/drop-request"
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

import DropRequestDataService from "../../../services/DropRequestService"
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

const CreateDropRequestComponent = (props) => {
  const products = useSelector(state => state.products)
  const productOptions = products.map(p => {
    return {value: p.ITMREF_0, label: `${p.ITMREF_0} (${p.ITMDES1_0})`, category : p.TCLCOD_0}
  })
const prevAddress = useRef()
const prevDeliveryModes = useRef()
const prevCarrier = useRef()

const isMounted = useRef(false)
  const ProductCategOptions = products.map(p => {
     return {value: p.TCLCOD_0, label: p.TCLCOD_0}
  })

  const uniqueProductCategOptions = ProductCategOptions.filter((value, index, self) => {
       return self.findIndex(v => v.value === value.value) === index
   })


  const addresses = useSelector(state => state.addresses)

  const addressOptions = addresses?.map(a => {
     console.log("Tzzz inside addressOptions")
    return {value: a.BPAADD_0, label: `${a.BPAADD_0} (${a.BPADES_0})`, flg: a.BPAADDFLG_0, defCarrier: a.BPTNUM_0, defMdl: a.MDL_0}
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
   const [selectAddress, setSelectAddress] = useState(null)
   const [selectCarrier, setSelectCarrier] = useState(null)
   const [filteredProductData, setFilteredProductData] = useState([])
   const [selectProductCateg, setSelectProductCateg] = useState(null)
   const [selectDeliveryMode, setSelectDeliveryMode] = useState(null)
  const [active, setActive] = useState('1')
  const [totPrice, setTotPrice] = useState(0)
  const [totQty, setTotQty] = useState(0)
  const [totPriceUN, setTotPriceUN] = useState('')
    const [totQtyUN, setTotQtyUN] = useState('')
  const [isAccepted, setIsAccepted] = useState(false)
   const [iscategselected, setiscategselected] = useState(false)
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
    status: 'To Confirm',
    drop_type: 'Sales',
    comment: '',
    address: '',
    carrier: '',
    delivery_mode: '',
    products: [emptyProduct]
  }

  const [dropRequest, setDropRequest] = useState(initialState)

  const increaseCount = () => {

    const tempProductsList = dropRequest.products
    let qtyflag = true
    tempProductsList.map((product, pIndex) => {
                   if (qtyflag)  {
                   console.log("T111 insdie prdocut ", product)
                    console.log("T111 insdie pIndex ", pIndex)
                    if (product.quantity > 0) {
                      qtyflag = true
                    } else {
                      qtyflag = false
                    }
                   }
                   })
     if (qtyflag) {
      setCount(count + 1)
          console.log("on Add New click", dropRequest.products)
          dropRequest.products.push(emptyProduct)
     }  else {

        toast.warning(
               <ToastContent header='Error' message='Quantity cant be zero' color='danger' />,
               { transition: Slide, hideProgressBar: true, autoClose: 2000 }
             )
     }

  }

  const { register, errors, handleSubmit, control, setValue } = useForm({
    defaultValues: initialState
  })

  const getDropRequestDetail = id => {
    DropRequestDataService.get(id)
      .then(response => {
        setDropRequest({
          id: response.data.XDROPID_0,
          site: `${user.X3SITE_0} (${user.FCYNAM_0})`,
          date: new Date(response.data.ORDDAT_0),
          reference: response.data.CUSORDREF_0,
          customer: `${user.X3USER_0} (${user.XNAME_0})`,
          currency: response.data.CUR_0,
          status: 'To Confirm',
          drop_type: 'Sales',
          comment: response.data.XCOMMENT_0,
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

  const addressOptionsafter = () => {
               const defaultdetails = addressOptions.filter((a) => a.flg === 2)
                   console.log("default details are", defaultdetails)
                   let a, c, m
                   if (defaultdetails.length > 0) {
                         a = defaultdetails
                         c = carrierOptions.filter((a) => a.value === defaultdetails[0].defCarrier)
                         m = deliveryModeOptions.filter((a) => a.value === defaultdetails[0].defMdl)
                   }
        setDropRequest({ ...dropRequest, ['address']: a && a.length > 0 ? a[0].value : '', ['carrier']: c && c.length > 0 ? c[0].value : '', ['delivery_mode']: m && m.length > 0 ? m[0].value : '' })
                  console.log("a =", a)
                  console.log("c =", c)
                  console.log("m =", m)
                   setSelectAddress(a)
                   setSelectCarrier(c)
                   setSelectDeliveryMode(m)
          }


 useEffect(() => {
        if (addresses !== prevAddress.current ||
            deliveryModes !== prevDeliveryModes.current || carriers !== prevCarrier.current) {
              prevAddress.current = addresses
              prevDeliveryModes.current = deliveryModes
              prevCarrier.current = carriers
             addressOptionsafter()

         }

   }, [addresses, deliveryModes, carriers])


useEffect(() => {

  dispatch(retrieveProducts(user.X3SITE_0))
    const dropReqId = props.match.params.id
    if (dropReqId) {
      getDropRequestDetail(dropReqId)
    }
    dispatch(retrieveAddresses(user.X3USER_0, 'customer'))
    dispatch(retrieveCarriers())
    dispatch(retrieveDeliveryModes())

    isMounted.current = true
    return () => { isMounted.current = false }
}, [])


  const [isSubmitted, setSubmitted] = useState(false)

  const increaseAttachmentCount = () => {
    setAttachmentCount(attachmentcount + 1)
  }

  const handleInputChange = event => {
    const { name, value } = event.target
    setDropRequest({ ...dropRequest, [name]: value })
  }

  const toggle = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

    const CalculateQtyandPrice = (index, data, from) =>  {
        console.log("T111 insdie cal event", data)
        let tempqty = 0, tempprice = 0, tempqtyun
         console.log("T111 insdie drop request", index)
         console.log("T111 insdie drop request index", dropRequest)
          console.log("T111 insdie drop request from", from)
           const tempProducts = dropRequest.products.map((product, pIndex) => {
               console.log("T111 insdie prdocut ", product)
                console.log("T111 insdie pIndex ", pIndex)
               tempqtyun = product.quantity > 0 ? product.sau : ''
               if (pIndex === index) {
                   if (from === 'qty') {
                      console.log("T111 insdie 1 ")
                       tempqty  = tempqty + Number(event.target.value)
                       tempprice = tempprice + (Number(product.price) * Number(event.target.value))
                   } else if (from === 'price') {
                       console.log("T111 insdie 2")
                        console.log("T111 insdie 2prd qty", product.quantity)
                        if (product.quantity === "") {
                          tempqty  = tempqty + 1
                          tempprice = tempprice + (Number(event.target.value) * 1)
                        } else {
                           tempqty  = tempqty + Number(product.quantity)
                           tempprice = tempprice + (Number(event.target.value) * Number(product.quantity))
                        }
                        } else if (from === 'delete') {
                      console.log("T111 insdie 3")
                       tempqty  = tempqty
                       tempprice = tempprice
                   } else {
                     console.log("T111 insdie 4")
                     }
               } else {
                  console.log("T111 insdie 5")
                  tempqty =  tempqty + Number(product.quantity)
                  tempprice = tempprice + (Number(product.price) * Number(product.quantity))
               }
           })
           setTotPrice(tempprice)
           setTotQty(tempqty)
           setTotQtyUN(tempqtyun)
    }

  const setAddress = event => {

    setSelectAddress(event)
    setDropRequest({ ...dropRequest, ['address']: event ? event.value : '' })
  }

  const setCarrier = event => {
   setSelectCarrier(event)
    setDropRequest({ ...dropRequest, ['carrier']: event ? event.value : '' })
  }

  const setDeliveryMode = event => {
    setSelectDeliveryMode(event)
    setDropRequest({ ...dropRequest, ['delivery_mode']: event ? event.value : '' })
  }

const setprodCategory = event => {

   setiscategselected(true)
        let updatedData = []
       setSelectProductCateg(event)
       console.log("TT e value", event)
       console.log("TT product optons", productOptions)
       updatedData = productOptions && productOptions.filter(
       (product) => {
          return product.category === event.value
          })
          setFilteredProductData(updatedData)

   // setDropRequest({ ...dropRequest, ['delivery_mode']: event ? event.value : '' })
  }

  const updateProduct = index => (event) => {
      const selectedProduct = products.find(p => p.ITMREF_0 === event.value)
      const tempProducts = dropRequest.products.map((product, pIndex) => {
        if (pIndex === index) {
          return {...product, product_code: event.value, description: selectedProduct.ITMDES1_0, price : selectedProduct.BASPRI_0,  sau: selectedProduct.SAU_0}
        }
        return product
      })
      setDropRequest({...dropRequest, products: tempProducts})
    }

  const updateProductCateg = index => (event) => {
    const tempProducts = dropRequest.products.map((product, pIndex) => {
      if (pIndex === index) {
        return {...product, product_categ: event.value}
      }
      return product
    })
    setDropRequest({...dropRequest, products: tempProducts})

     setiscategselected(true)
            let updatedData = []
           setSelectProductCateg(event)
           console.log("TT e value", event)
           console.log("TT product optons", productOptions)
           updatedData = productOptions && productOptions.filter(
           (product) => {
              return product.category === event.value
              })
              setFilteredProductData(updatedData)
  }

  const onPriceChange = index => event => {

    const tempProducts = dropRequest.products.map((product, pIndex) => {
     console.log("T11 price change")
      if (pIndex === index) {
        console.log("T11 price change i", pIndex)
       CalculateQtyandPrice(index, event, 'price')
        return {...product, price: event.target.value, line_amount: product.quantity > 0 ? event.target.value * product.quantity : 0}
      }
      return product
    })
    setDropRequest({...dropRequest, products: tempProducts})
  }


  const onQtyChange = index => event => {
     console.log("T11 Qty change")
    const tempProducts = dropRequest.products.map((product, pIndex) => {

      if (pIndex === index) {
        console.log("T11 price change i", pIndex)
        CalculateQtyandPrice(index, event, 'qty')
        return {...product, quantity: event.target.value, line_amount: product.price > 0 ? event.target.value * product.price : 0}
      }
      return product
    })
    setDropRequest({...dropRequest, products: tempProducts})
  }

  const deleteForm = index => (e) => {
    e.preventDefault()
    const tempProducts =  dropRequest.products.filter((p, pIndex) => pIndex !== index)
    setDropRequest({...dropRequest, products: tempProducts})
    setCount(count - 1)
    CalculateQtyandPrice(index, e, 'delete')
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
    if (isObjEmpty(errors) && isAccepted && dropRequest.address && dropRequest.carrier && dropRequest.delivery_mode) {
      let totalAmt = 0
      let totalQty = 0
      dropRequest.products.map(p => {
        totalAmt += p.line_amount
        totalQty += Number(p.quantity)
      })
      const params = {...dropRequest, total_amt: totalAmt, total_qty: totalQty}
      dispatch(createDropRequest(params))
        .then(data => {
          history.push('/customer/manage-request/drop-request')
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
              <CardTitle tag='h4'>CREATE SALES ORDER REQUEST</CardTitle>
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
                        value={dropRequest.site}
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
                        defaultValue={dropRequest.date}
                        render={({value, name, ref}) => (
                          <Flatpickr
                            value={value}
                            onChange={(date) => setDropRequest({...dropRequest, ['date']:moment(new Date(date)).format('YYYY-MM-DD') })}
                            options={{
                              dateFormat: 'm-d-Y',
                              minDate: 'today'
                            }}
                            className={classnames('form-control', {
                              'is-invalid': !dropRequest.date
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
                        value={dropRequest && dropRequest.reference}
                        onChange={handleInputChange}
                        className={classnames({ 'is-invalid': errors['reference'] })}
                        innerRef={register({ required: true, validate: value => value !== '' })}
                      />
                    </FormGroup>
                  </Col>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='customer'>Customer</Label>
                      <Input
                        name='customer'
                        id='customer'
                        value={dropRequest.user}
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
                        value={dropRequest.status}
                        readOnly
                        innerRef={register}
                      />
                    </FormGroup>
                  </Col>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='type'>Drop Type</Label>
                      <Input
                        name='type'
                        id='type'
                        value={dropRequest.drop_type}
                        readOnly
                        innerRef={register}
                      />
                    </FormGroup>
                  </Col>
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
                        value={selectAddress}
                        onChange={setAddress}
                        className={classnames('react-select', { 'is-invalid': isSubmitted && dropRequest.address === '' })}
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
                        name='carrier'
                        isOptionDisabled = {true}
                        value={selectCarrier}
                        className={classnames('react-select', { 'is-invalid': isSubmitted && dropRequest.carrier === '' })}
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
                        name='delivery_mode'
                        disabled={true}
                        value={selectDeliveryMode}
                        className={classnames('react-select', { 'is-invalid': isSubmitted && dropRequest.delivery_mode === '' })}
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
                               <Col md='2' sm='12'>
                                                                <FormGroup>
                                                                    <Label for={`animation-product-categ-${i}`}>Product Category</Label>
                                                                   <Controller
                                                                                                      id={`animation-product-categ-${i}`}
                                                                                                      control={control}
                                                                                                      defaultValue={dropRequest.products[i] ? dropRequest.products[i].product_categ : ''}
                                                                                                      name={`${fieldName}.product_categ`}
                                                                                                      render={({value, name, ref}) => (
                                                                                                        <Select
                                                                                                          inputRef={ref}
                                                                                                          isClearable
                                                                                                          options={uniqueProductCategOptions}
                                                                                                          onChange={updateProductCateg(i)}
                                                                                                          value={productOptions.find(c => c.category === value)}
                                                                                                          placeholder='Select Product Category'
                                                                                                          className={classnames('react-select', { 'is-invalid': errors['products'] && errors['products'][i].product_categ })}
                                                                                                          classNamePrefix='select'
                                                                                                          theme={selectThemeColors}
                                                                                                        />
                                                                                                      )}
                                                                                                    />
                                                                </FormGroup>
                               </Col>
                              <Col md={2}>
                                <FormGroup>
                                  <Label for={`animation-product-code-${i}`}>Product Code</Label>
                                  <Controller
                                    id={`animation-product-code-${i}`}
                                    control={control}
                                    defaultValue={dropRequest.products[i] ? dropRequest.products[i].product_code : ''}
                                    name={`${fieldName}.product_code`}
                                    render={({value, name, ref}) => (
                                      <Select
                                        inputRef={ref}
                                        isClearable
                                        options={  iscategselected ? filteredProductData : productOptions}
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
                              <Col md={2}>
                                <FormGroup>
                                  <Label for={`animation-description-${i}`}>Description</Label>
                                  <Input
                                    type='text' 
                                    id={`animation-description-${i}`}
                                    name={`${fieldName}.description`}
                                    value={dropRequest.products[i] ? dropRequest.products[i].description : ''}
                                    readOnly
                                    innerRef={register}
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
                                    value={dropRequest.products[i] ? dropRequest.products[i].price : ''}
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
                                    placeholder='0'
                                    name={`${fieldName}.quantity`}
                                    value={dropRequest.products[i] ? dropRequest.products[i].quantity : ''}
                                    className={classnames({ 'is-invalid': errors['products'] && errors['products'][i].quantity })}
                                    innerRef={register({ required: true, validate: value => value !== '' })}
                                    onChange={onQtyChange(i)}
                                  />
                                </FormGroup>
                              </Col>
                               <Col md={1}>
                                                              <FormGroup>
                                                                <Label for={`animation-uom-${i}`}>UOM</Label>
                                                                <Input
                                                                  id={`animation-uom-${i}`}
                                                                  name={`${fieldName}.sau`}
                                                                  value={dropRequest.products[i] ? dropRequest.products[i].sau : ''}
                                                                  innerRef={register}
                                                                  readOnly
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
                                    value={dropRequest.products[i] ? dropRequest.products[i].line_amount  : ''}
                                    readOnly
                                  />
                                </FormGroup>
                              </Col>
                               <Col>
                                {user.CUR_0}
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
                                    </Col>
                  <Col md={6}>
                                      <div style={{display : "flex"}}>
                                        <h4 style={{paddingLeft : "100px"}}  className='mb-0'>Total Quantity : <b>  {totQty} {totQtyUN} </b></h4>
                                                         <h4 style={{paddingLeft : "140px"}} className='mb-0'>Total Amount :  {totPrice} {user.CUR_0}</h4>

                                      </div>
                                    </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for='comment'>Comment</Label>
                      <Input
                        type='textarea'
                        name='comment'
                        rows='3'
                        id='comment'
                        value={dropRequest.comment}
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
                <Button type='reset' color='secondary' outline tag={Link} to='/customer/manage-request/drop-request'>
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

export default CreateDropRequestComponent
